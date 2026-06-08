import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: tripId } = await params;
    const body = await request.json();
    const { message, history } = body;

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Fetch Trip & AI Recommendation
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("*")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    // Build the system context
    const systemInstruction = `
      You are the Trippin Coordinator, an expert AI travel planner assistant.
      The user is planning a ${trip.type} from ${trip.origin} for ${trip.target_size} people.
      Target Budget: ${trip.budget} per person.
      Vibes: ${trip.vibes.join(", ")}.

      ${trip.ai_recommendation ? `
      You have previously generated the following recommendation:
      Title: ${trip.ai_recommendation.recommendation.title}
      Description: ${trip.ai_recommendation.recommendation.description}
      Cost: ${trip.ai_recommendation.costBreakdown.total}
      ` : "You have not yet generated a final recommendation as you are still waiting on votes."}

      Respond to the user's message concisely and helpfully, in the persona of a proactive travel agent. Keep responses under 3 paragraphs.
    `;

    // Convert history format if needed
    // Assuming history is an array of { role: "user" | "model", parts: [{ text: string }] }
    // We will append the new message
    const formattedHistory = history ? history.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    })) : [];

    // Note: To use history with generateContent we might need to manually construct the prompt 
    // or use a chat session if the SDK exposes it. For simplicity in this endpoint:
    const promptContext = formattedHistory.map((m: any) => `${m.role}: ${m.parts[0].text}`).join('\n');
    const fullPrompt = `${promptContext ? `Previous Conversation:\n${promptContext}\n\n` : ''}User: ${message}`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: fullPrompt,
      config: {
        systemInstruction: systemInstruction,
      }
    });

    const reply = response.text || "";

    // Insert user's message into DB (for multiplayer)
    await supabase.from("trip_messages").insert({
      trip_id: tripId,
      sender_name: "User", // Ideally fetched from session, but "User" for now
      role: "user",
      content: message
    });

    // Insert AI's reply into DB (for multiplayer)
    await supabase.from("trip_messages").insert({
      trip_id: tripId,
      sender_name: "Trippin",
      role: "assistant",
      content: reply
    });

    // Log to system_logs for developer monitoring
    await supabase.from("system_logs").insert({
      trip_id: tripId,
      type: "ai_chat",
      payload: {
        prompt: fullPrompt,
        systemInstruction,
        response: reply
      }
    });

    return NextResponse.json({ 
      success: true, 
      reply: reply 
    });

  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: error.message || "Failed to get chat response" }, { status: 500 });
  }
}
