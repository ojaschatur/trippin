import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, audience, origin, groupSize, budget, vibes, dates } = body;

    if (!type || !audience || !groupSize || !budget || !dates) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Create the Trip
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .insert({
        type,
        audience,
        origin,
        target_size: groupSize,
        budget,
        vibes,
        dates,
        status: "collecting_preferences"
      })
      .select()
      .single();

    if (tripError) {
      console.error("Error creating trip:", tripError);
      return NextResponse.json({ error: "Failed to create trip" }, { status: 500 });
    }

    // 2. Add the Coordinator as a Participant
    // We'll use their email as their name if they don't have a display name set up
    const name = user.user_metadata?.full_name || user.email?.split('@')[0] || "Coordinator";
    
    const { error: participantError } = await supabase
      .from("participants")
      .insert({
        trip_id: trip.id,
        name: name,
        email: user.email,
        role: "coordinator"
      });

    if (participantError) {
      console.error("Error creating participant:", participantError);
      // We don't fail the whole request here, but we log it. The trip was created.
    }

    return NextResponse.json({ tripId: trip.id });

  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
