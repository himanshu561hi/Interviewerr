import { supabase } from "@/services/supabaseClient";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const { email, credits } = await req.json();

    if (!email || typeof credits !== "number") {
      return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
    }

    // Update user credits
    const { data, error } = await supabase
      .from("Users")
      .update({ credits })
      .eq("email", email)
      .select();

    if (error) {
      console.error("Error updating credits:", error);
      return NextResponse.json({ error: "Failed to update credits" }, { status: 500 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Admin API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
