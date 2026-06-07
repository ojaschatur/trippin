"use server";

import { createClient } from "@/utils/supabase/server";

export async function loginWithOtp(prevState: any, formData: FormData) {
  const email = formData.get("email");

  if (!email || typeof email !== "string") {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();

  // Get the origin for the redirect URL. We'll default to localhost if not found (useful for dev)
  const origin = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      // Supabase will redirect the user here after they click the magic link
      emailRedirectTo: `${origin}/auth/confirm`,
    },
  });

  if (error) {
    console.error("Supabase Auth Error:", error);
    return { error: "Could not send login link. Please try again." };
  }

  return { success: true, message: "Check your email for the login link!" };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
