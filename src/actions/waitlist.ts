"use server";

import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export async function submitWaitlist(prevState: any, formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { error: "Please enter a valid email address." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  try {
    // 1. Insert into Supabase Waitlist Table
    const { error: dbError } = await supabase
      .from("waitlist")
      .insert([{ email }]);

    if (dbError) {
      if (dbError.code === "23505") { // PostgreSQL unique violation code
        return { success: true, message: "You are already on the waitlist!" };
      }
      console.error("Supabase Error:", dbError);
      return { error: "Something went wrong saving your email. Please try again." };
    }

    // 2. Send Welcome Email via Resend
    // (Using 'onboarding@resend.dev' for testing, replace with verified domain later)
    await resend.emails.send({
      from: "Trippin <onboarding@resend.dev>",
      to: email,
      subject: "You're on the list! ✈️",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to Trippin!</h2>
          <p>Hey there,</p>
          <p>Thanks for joining the Trippin waitlist. We are building the smartest way for groups to agree on travel, and we're thrilled to have you early on this journey.</p>
          <p>We will notify you as soon as early access is available!</p>
          <p>Cheers,<br>The Trippin Team</p>
        </div>
      `,
    });

    return { success: true, message: "Success! You're on the waitlist." };
  } catch (error) {
    console.error("Server Action Error:", error);
    return { error: "Something went wrong. Please try again later." };
  }
}
