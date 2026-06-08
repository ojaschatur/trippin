import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const RESPONSE_SCHEMA = {
  type: "object",
  properties: {
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          description: { type: "string" },
          destinationCity: { type: "string" },
          places: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string", description: "Must be one of: 'stay', 'restaurant', or 'activity'" },
                name: { type: "string" },
                description: { type: "string" },
                locationName: { type: "string", description: "The specific location name to geocode, e.g., 'Taj Mahal Palace, Mumbai'" },
                googleMapsQuery: { type: "string", description: "A highly specific search string for Google Maps, e.g., 'Taj+Mahal+Palace+Hotel,+Mumbai'" }
              },
              required: ["type", "name", "description", "locationName", "googleMapsQuery"]
            }
          },
          matchScore: { type: "number" },
          whyItFits: { type: "string" },
          costBreakdown: {
            type: "object",
            properties: {
              accommodation: { type: "string" },
              transport: { type: "string" },
              food: { type: "string" },
              total: { type: "string" },
              budgetJustification: { type: "string" }
            },
            required: ["accommodation", "transport", "food", "total", "budgetJustification"]
          }
        },
        required: ["title", "description", "destinationCity", "places", "matchScore", "whyItFits", "costBreakdown"]
      }
    },
    insights: {
      type: "object",
      properties: {
        vibe: { type: "string" },
        mood: { type: "string" },
        conflict: { type: "string" }
      },
      required: ["vibe", "mood", "conflict"]
    }
  },
  required: ["recommendations", "insights"]
};

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: tripId } = await params;
    
    const url = new URL(request.url);
    const force = url.searchParams.get("force") === "true";

    // 1. Fetch Trip Data
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // 2. Fetch Preferences Data (joined with Participants for names)
    const { data: preferences, error: prefError } = await supabase
      .from("preferences")
      .select(`
        *,
        participants ( name )
      `)
      .eq("trip_id", tripId);

    if (prefError) {
      return NextResponse.json({ error: "Failed to fetch preferences" }, { status: 500 });
    }

    // 3. Check if we already have a cached recommendation
    if (trip.ai_recommendation && !force) {
      return NextResponse.json({ 
        success: true, 
        cached: true,
        data: trip.ai_recommendation 
      });
    }

    // 4. Construct AI Prompt
    const systemInstruction = `
      You are the Trippin Coordinator, an expert travel planner AI.
      You are planning a ${trip.type} from ${trip.origin} for ${trip.target_size} people.
      The target dates are: ${trip.dates}.
      The target budget is: ${trip.budget} per person.
      The target vibes are: ${trip.vibes.join(", ")}.

      Here are the individual preferences collected from the group:
      ${JSON.stringify(preferences.map((p: any) => ({
        name: p.participants?.name || "Anonymous",
        maxBudget: p.max_budget,
        vibes: p.vibes,
        availability: p.availability
      })), null, 2)}

      Analyze these preferences to find the best consensus recommendations. 
      Identify overlapping vibes, calculate the lowest common denominator for the budget, and accommodate any date constraints.
      Generate EXACTLY 5 distinct, high-quality trip recommendations. Sort them from best match (index 0) to lowest match (index 4).
      Output ONLY valid JSON matching the exact schema provided.
    `;

    // 5. Call Gemini 2.5 Flash using the new SDK
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Generate EXACTLY 5 distinct trip recommendations based on the system instructions.",
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      }
    });

    const responseText = response.text;
    if (!responseText) {
      throw new Error("No response from AI");
    }

    const aiRecommendation = JSON.parse(responseText);
    aiRecommendation.generated_at = new Date().toISOString();

    // 6. Cache the result in Supabase
    await supabase
      .from("trips")
      .update({ ai_recommendation: aiRecommendation })
      .eq("id", tripId);

    // 7. Log to system_logs for developer monitoring
    await supabase.from("system_logs").insert({
      trip_id: tripId,
      type: "ai_consensus",
      payload: {
        prompt: systemInstruction,
        response: aiRecommendation
      }
    });

    return NextResponse.json({ 
      success: true, 
      cached: false,
      data: aiRecommendation 
    });

  } catch (error: any) {
    console.error("Consensus generation error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate consensus" }, { status: 500 });
  }
}
