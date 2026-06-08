import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id: tripId } = await params;

    // 1. Verify the trip exists
    const { data: trip, error: tripError } = await supabase
      .from("trips")
      .select("id")
      .eq("id", tripId)
      .single();

    if (tripError || !trip) {
      return NextResponse.json({ error: "Trip not found" }, { status: 404 });
    }

    const body = await request.json();
    const { name, email, maxBudget, vibes, availability } = body;

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    // 2. Create Participant Record
    const { data: participant, error: participantError } = await supabase
      .from("participants")
      .insert({
        trip_id: tripId,
        name,
        email,
        role: "member"
      })
      .select()
      .single();

    if (participantError) {
      console.error("Error creating participant:", participantError);
      return NextResponse.json({ error: "Failed to join trip" }, { status: 500 });
    }

    // 3. Create Preferences Record
    // Parse budget string to extract max numeric value
    // Handles: "Under ₹2000" -> 2000, "₹2000 - ₹5000" -> 5000, "₹5000 - ₹10000" -> 10000, "No strict limit" -> null
    let numericBudget = null;
    if (maxBudget) {
      const numbers = maxBudget.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        // Take the last (highest) number for "max budget" semantics
        numericBudget = parseInt(numbers[numbers.length - 1], 10);
      }
    }

    const { error: prefsError } = await supabase
      .from("preferences")
      .insert({
        participant_id: participant.id,
        trip_id: tripId,
        max_budget: numericBudget,
        preferred_vibes: vibes || [],
        availability: availability || ""
      });

    if (prefsError) {
      console.error("Error saving preferences:", prefsError);
      return NextResponse.json({ error: "Failed to save preferences" }, { status: 500 });
    }

    return NextResponse.json({ success: true, participantId: participant.id });

  } catch (error) {
    console.error("Internal API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
