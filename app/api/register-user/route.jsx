import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*", // production mein apna MERN domain
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// ─────────────────────────────────────────────────────────────────
// POST /api/register-user
//
// MERN project pehli baar call kare jab user interview practice
// karne ki koshish kare. Agar user pehle se hai to kuch nahi hoga,
// naye user ko 5 free credits milenge.
//
// Body: { email, name }
// Returns: { user: { email, credits, totalCredits, plan } }
// ─────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { email, name } = await req.json();

    if (!email) {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // Check karo user already hai ya nahi
    const { data: existingUser } = await supabaseAdmin
      .from("Users")
      .select("email, credits, totalCredits, plan")
      .eq("email", email)
      .maybeSingle();

    if (existingUser) {
      // Pehle se registered hai — sirf return karo
      return NextResponse.json(
        { user: existingUser, isNew: false },
        { status: 200, headers: CORS_HEADERS }
      );
    }

    // Naya user — 5 free credits ke saath create karo
    const newUser = {
      name:         name || email.split("@")[0],
      email:        email,
      credits:      5,
      totalCredits: 5,
      plan:         "free",
    };

    const { error: insertError } = await supabaseAdmin
      .from("Users")
      .insert([newUser]);

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to register user" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    return NextResponse.json(
      { user: newUser, isNew: true },
      { status: 201, headers: CORS_HEADERS }
    );

  } catch (err) {
    console.error("Register User API Error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
