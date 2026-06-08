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
    const { message, history, senderName } = body;
    const finalSenderName = senderName || "User";

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Insert user's message into DB (for multiplayer)
    const { data: userMsgData, error: userInsertError } = await supabase.from("trip_messages").insert({
      trip_id: tripId,
      sender_name: finalSenderName,
      role: "user",
      content: message
    }).select().single();

    if (userInsertError) {
      console.error("Failed to insert user message:", userInsertError);
      return NextResponse.json({ error: userInsertError.message || "Failed to save user message to database" }, { status: 500 });
    }

    const fallbackUserMsg = userMsgData || {
      id: crypto.randomUUID(),
      trip_id: tripId,
      sender_name: finalSenderName,
      role: "user",
      content: message,
      created_at: new Date().toISOString()
    };

    const hasAiMention = message.toLowerCase().includes("@ai");

    if (!hasAiMention) {
      return NextResponse.json({
        success: true,
        userMessage: fallbackUserMsg,
        reply: null
      });
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

      ${trip.ai_recommendation && trip.ai_recommendation.recommendations && trip.ai_recommendation.recommendations.length > 0 ? `
      You have previously generated the following Top 5 recommendations. The #1 recommendation is:
      Title: ${trip.ai_recommendation.recommendations[0].title}
      Destination: ${trip.ai_recommendation.recommendations[0].destinationCity}
      Description: ${trip.ai_recommendation.recommendations[0].description}
      Cost: ${trip.ai_recommendation.recommendations[0].costBreakdown.total}
      ` : "You have not yet generated a final recommendation as you are still waiting on votes."}

      Respond to the user's message concisely and helpfully, in the persona of a proactive travel agent. Keep responses under 3 paragraphs.
    `;

    // Convert history format if needed
    // Assuming history is an array of { role: "user" | "model", parts: [{ text: string }] }
    const formattedHistory = history ? history.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    })) : [];

    const promptContext = formattedHistory.map((m: any) => `${m.role}: ${m.parts[0].text}`).join('\n');
    const fullPrompt = `${promptContext ? `Previous Conversation:\n${promptContext}\n\n` : ''}User: ${message}`;

    let reply = "";
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          systemInstruction: systemInstruction,
        }
      });
      reply = response.text || "";

      // Log to system_logs for developer monitoring on success
      await supabase.from("system_logs").insert({
        trip_id: tripId,
        type: "ai_chat",
        payload: {
          prompt: fullPrompt,
          systemInstruction,
          response: reply
        }
      });
    } catch (geminiError: any) {
      console.error("Gemini generation failed:", geminiError);
      reply = "⚠️ I am currently experiencing high demand. Please try again later.";

      // Log error to system_logs
      await supabase.from("system_logs").insert({
        trip_id: tripId,
        type: "system",
        payload: {
          error: geminiError.message || String(geminiError),
          prompt: fullPrompt,
          systemInstruction
        }
      });
    }

    // Insert AI's reply into DB (for multiplayer)
    const { data: aiMsgData, error: aiInsertError } = await supabase.from("trip_messages").insert({
      trip_id: tripId,
      sender_name: "Trippin",
      role: "assistant",
      content: reply
    }).select().single();

    if (aiInsertError) {
      console.error("Failed to insert AI reply:", aiInsertError);
      return NextResponse.json({ error: aiInsertError.message || "Failed to save AI reply to database" }, { status: 500 });
    }

    const fallbackAiMsg = aiMsgData || {
      id: crypto.randomUUID(),
      trip_id: tripId,
      sender_name: "Trippin",
      role: "assistant",
      content: reply,
      created_at: new Date().toISOString()
    };

    return NextResponse.json({ 
      success: true, 
      userMessage: fallbackUserMsg,
      aiMessage: fallbackAiMsg,
      reply: reply 
    });

  } catch (error: any) {
    console.error("Chat error:", error);
    return NextResponse.json({ error: error.message || "Failed to get chat response" }, { status: 500 });
  }
}
