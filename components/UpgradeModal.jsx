"use client";
import React, { useContext, useState } from "react";
import { X, Zap, CheckCircle2, Lock, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DashboardContext } from "@/app/(main)/provider";
import { toast } from "sonner";

const BASIC_CREDITS = 20;
const AMOUNT_PAISE  = 29900; // ₹299

const FREE_FEATURES = [
  "5 AI interviews total",
  "Basic question types",
  "Interview link sharing",
];

const BASIC_FEATURES = [
  "20 AI Interview Credits",
  "All question types (Technical, HR, Behavioral)",
  "AI feedback & scoring",
  "Face tracking & attention score",
  "Your remaining free credits are preserved",
  "Priority support",
];

// Dynamically load Razorpay checkout script
function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (document.getElementById("razorpay-script")) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.id  = "razorpay-script";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function UpgradeModal({ onClose }) {
  const { userDetails, refreshUser } = useContext(DashboardContext);
  const [paying, setPaying] = useState(false);

  const currentCredits = userDetails?.credits ?? 0;
  const currentPlan    = userDetails?.plan    ?? "free";
  const newTotal       = currentCredits + BASIC_CREDITS;

  const handleBuyCredits = async () => {
    setPaying(true);

    try {
      // ── 1. Load Razorpay script ──────────────────────────────────────────
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        toast.error("Failed to load payment gateway. Check internet connection.");
        setPaying(false);
        return;
      }

      // ── 2. Create Razorpay order on server ──────────────────────────────
      const orderRes = await fetch("/api/razorpay/create-order", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ userEmail: userDetails.email }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok) {
        toast.error(orderData.error || "Failed to create payment order.");
        setPaying(false);
        return;
      }

      // ── 3. Open Razorpay Checkout popup ─────────────────────────────────
      const options = {
        key:         orderData.keyId,
        amount:      orderData.amount,
        currency:    orderData.currency,
        name:        "Interviewerr",
        description: "Basic Plan — 20 Interview Credits",
        order_id:    orderData.orderId,
        prefill: {
          name:  userDetails.name  || "",
          email: userDetails.email || "",
        },
        theme: { color: "#6366f1" },

        handler: async (response) => {
          // ── 4. Verify payment on server (secure) ──────────────────────
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method:  "POST",
              headers: { "Content-Type": "application/json" },
              body:    JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
                userEmail:           userDetails.email,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyRes.ok && verifyData.success) {
              // ── 5. Refresh context & show success ──────────────────────
              await refreshUser();
              toast.success(
                `🎉 Payment successful! You now have ${verifyData.creditsLeft} credits.`
              );
              onClose();
            } else {
              toast.error("Payment verification failed. Contact support.");
            }
          } catch {
            toast.error("Verification error. Please contact support.");
          } finally {
            setPaying(false);
          }
        },

        modal: {
          ondismiss: () => {
            toast.info("Payment cancelled.");
            setPaying(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (resp) => {
        toast.error(`Payment failed: ${resp.error.description}`);
        setPaying(false);
      });
      rzp.open();

    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Something went wrong. Please try again.");
      setPaying(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Top gradient banner */}
        <div className="h-2 w-full" style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6,#ec4899)" }} />

        {/* Close */}
        <button
          onClick={onClose}
          disabled={paying}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition disabled:opacity-40"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="px-8 pt-7 pb-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-1">
            <div className="p-2 rounded-xl" style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <Lock className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-gray-900">Upgrade Your Plan</h2>
          </div>
          <p className="text-sm text-gray-500 mb-5 ml-[52px]">
            {currentPlan === "free"
              ? <>You've used all <span className="font-bold text-indigo-600">5 free interviews</span>. Get 20 more credits!</>
              : <>Get <span className="font-bold text-indigo-600">20 more credits</span> added to your account!</>
            }
          </p>

          {/* Free credits preservation notice */}
          {currentCredits > 0 && (
            <div className="mb-5 flex items-start gap-2 bg-green-50 border border-green-200 rounded-xl p-3">
              <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
              <p className="text-xs text-green-800">
                <span className="font-bold">
                  Your {currentCredits} remaining credit{currentCredits !== 1 ? "s" : ""} will be preserved!
                </span>{" "}
                You'll get {currentCredits} + {BASIC_CREDITS} ={" "}
                <span className="font-bold">{newTotal} total credits</span>.
              </p>
            </div>
          )}

          {/* Plan comparison */}
          <div className="grid grid-cols-2 gap-4 mb-7">
            {/* Free */}
            <div className="rounded-2xl border-2 border-gray-200 p-4 bg-gray-50">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Free</p>
              <p className="text-3xl font-extrabold text-gray-700 mb-3">₹0</p>
              <ul className="space-y-1.5">
                {FREE_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-gray-500">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gray-400 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Basic */}
            <div
              className="rounded-2xl border-2 border-indigo-500 p-4 relative overflow-hidden"
              style={{ background: "linear-gradient(145deg,#f5f3ff,#ede9fe)" }}
            >
              <div className="absolute top-3 right-3 flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                <Star className="w-2.5 h-2.5" /> Popular
              </div>
              <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-1">Basic</p>
              <div className="flex items-end gap-1 mb-3">
                <p className="text-3xl font-extrabold text-indigo-700">₹299</p>
                <p className="text-xs text-indigo-400 mb-1">/month</p>
              </div>
              <ul className="space-y-1.5">
                {BASIC_FEATURES.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs text-indigo-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <Button
            id="razorpay-pay-btn"
            className="w-full h-12 text-sm font-bold rounded-xl shadow-lg shadow-indigo-300/50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ background: "linear-gradient(90deg,#6366f1,#8b5cf6)" }}
            onClick={handleBuyCredits}
            disabled={paying}
          >
            {paying ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Opening Payment...</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" />Get {BASIC_CREDITS} Credits — ₹299</>
            )}
          </Button>

          <p className="text-center text-xs text-gray-400 mt-3">
            Secured by Razorpay · UPI / Card / NetBanking accepted
          </p>
        </div>
      </div>
    </div>
  );
}
