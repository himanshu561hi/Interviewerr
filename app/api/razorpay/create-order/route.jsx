import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin":  "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const PLAN_AMOUNT = 29900; // ₹299 in paise

// ─────────────────────────────────────────────────────────────────
// POST /api/razorpay/create-order
//
// Creates a Razorpay order for the Basic plan (₹299).
// Body: { userEmail }
// Returns: { orderId, amount, currency, keyId }
// ─────────────────────────────────────────────────────────────────
export async function POST(req) {
  try {
    const { userEmail } = await req.json();

    if (!userEmail) {
      return NextResponse.json(
        { error: "userEmail is required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Razorpay keys not configured" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    const razorpay = new Razorpay({
      key_id:     process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount:   PLAN_AMOUNT,
      currency: "INR",
      // Razorpay receipt max 40 chars allowed
      receipt:  `rcpt_${Date.now().toString().slice(-10)}`,
      notes: {
        userEmail,
        plan:    "basic",
        credits: "20",
      },
    });

    return NextResponse.json(
      {
        orderId:  order.id,
        amount:   order.amount,
        currency: order.currency,
        keyId:    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      },
      { status: 200, headers: CORS_HEADERS }
    );
  } catch (err) {
    console.error("Create Order Error:", err);
    return NextResponse.json(
      { error: "Failed to create payment order" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
