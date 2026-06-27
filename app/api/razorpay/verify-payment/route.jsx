import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const BASIC_CREDITS = 20; // Credits added on Basic plan purchase

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// ─────────────────────────────────────────────────────────────────
// POST /api/razorpay/verify-payment
//
// Verifies Razorpay payment signature (HMAC-SHA256) and
// adds 20 credits to the user's account in Supabase.
//
// Body: {
//   razorpay_order_id,
//   razorpay_payment_id,
//   razorpay_signature,
//   userEmail
// }
// Returns: { success, creditsLeft, totalCredits, plan }
// ─────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      userEmail,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !userEmail) {
      return NextResponse.json(
        { error: "Missing payment verification fields" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // ── 1. Verify signature (HMAC-SHA256) ─────────────────────────────────
    // Razorpay signature = HMAC_SHA256(order_id + "|" + payment_id, key_secret)
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("Payment signature mismatch!");
      return NextResponse.json(
        { error: "Payment verification failed. Invalid signature." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // ── 2. Fetch current user from Supabase ────────────────────────────────
    const { data: user, error: fetchError } = await supabaseAdmin
      .from("Users")
      .select("credits, totalCredits, plan")
      .eq("email", userEmail)
      .maybeSingle();

    if (fetchError || !user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404, headers: CORS_HEADERS }
      );
    }

    // ── 3. Add 20 credits (preserve existing free credits) ─────────────────
    const newCredits      = (user.credits      ?? 0) + BASIC_CREDITS;
    const newTotalCredits = (user.totalCredits  ?? 0) + BASIC_CREDITS;

    const { error: updateError } = await supabaseAdmin
      .from("Users")
      .update({
        credits:      newCredits,
        totalCredits: newTotalCredits,
        plan:         "basic",
      })
      .eq("email", userEmail);

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return NextResponse.json(
        { error: "Credits update failed" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    console.log(`✅ Payment verified for ${userEmail}. Credits: ${user.credits} → ${newCredits}`);

    return NextResponse.json(
      {
        success:      true,
        creditsLeft:  newCredits,
        totalCredits: newTotalCredits,
        plan:         "basic",
        paymentId:    razorpay_payment_id,
      },
      { status: 200, headers: CORS_HEADERS }
    );

  } catch (err) {
    console.error("Verify Payment Error:", err);
    return NextResponse.json(
      { error: "Payment verification server error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
