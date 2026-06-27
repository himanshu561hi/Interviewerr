"use client";
import React, { useEffect, useRef, useState, useContext } from "react";
import Image from "next/image";
import {
  Clock,
  Info,
  Loader2Icon,
  Video,
  Camera,
  CameraOff,
  CheckCircle2,
  Briefcase,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import Footer from "@/app/(main)/footer/page";

function Interview() {
  const { interview_Id } = useParams();
  const [interviewData, setInterviewData] = useState(null);
  const [userName, setUserName]           = useState("");
  const [userEmail, setUserEmail]         = useState("");
  const [userGender, setUserGender]       = useState("");
  const [loading, setLoading]             = useState(false);

  /* Camera state */
  const [cameraGranted, setCameraGranted] = useState(false);
  const [cameraError, setCameraError]     = useState("");
  const [cameraLoading, setCameraLoading] = useState(false);
  const previewVideoRef  = useRef(null);
  const previewStreamRef = useRef(null);

  /* Attach stream to <video> after React renders it (cameraGranted flip) */
  useEffect(() => {
    if (cameraGranted && previewVideoRef.current && previewStreamRef.current) {
      previewVideoRef.current.srcObject = previewStreamRef.current;
      previewVideoRef.current.play().catch(() => {});
    }
  }, [cameraGranted]);

  const { setInterviewInfo } = useContext(InterviewDataContext);
  const router = useRouter();

  /* ── Fetch interview details ─────────────────────── */
  useEffect(() => {
    if (interview_Id) GetInterviewDetails();
    return () => {
      previewStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [interview_Id]);

  const GetInterviewDetails = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("Interview")
        .select("jobPosition,jobDescription,duration,type")
        .eq("interview_Id", interview_Id);
      setInterviewData(data?.[0] || null);
    } catch {
      toast.error("Incorrect Interview Link");
    } finally {
      setLoading(false);
    }
  };

  /* ── Camera ──────────────────────────────────────── */
  const requestCameraAccess = async () => {
    setCameraLoading(true);
    setCameraError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
        audio: false,
      });
      // Store stream in ref first; useEffect will attach it to <video> after render
      previewStreamRef.current = stream;
      setCameraGranted(true);
    } catch (err) {
      setCameraGranted(false);
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setCameraError("Camera permission denied. Allow camera access in browser settings and refresh.");
      } else if (err.name === "NotFoundError") {
        setCameraError("No camera found. Connect a webcam and try again.");
      } else {
        setCameraError("Camera error: " + err.message);
      }
    } finally {
      setCameraLoading(false);
    }
  };

  /* ── Join ────────────────────────────────────────── */
  const onJoinInterview = async () => {
    if (!cameraGranted) { toast.error("Please enable your camera first."); return; }
    setLoading(true);
    previewStreamRef.current?.getTracks().forEach((t) => t.stop());
    const { data: Interview } = await supabase
      .from("Interview")
      .select("*")
      .eq("interview_Id", interview_Id);
    setInterviewInfo({ userName, userEmail, userGender, interviewData: Interview?.[0] });
    router.push("/interview/" + interview_Id + "/start");
    setLoading(false);
  };

  const canJoin = !!userName && cameraGranted;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* ── Main area ─────────────────────────────── */}
      <div className="flex-1 flex items-start justify-center px-4 py-6 md:py-8">
        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl shadow-gray-200/60 overflow-hidden border border-gray-100">

          {/* ── 2-column grid ──────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* ── LEFT PANEL — branding + info ─────── */}
            <div
              className="flex flex-col items-center justify-center p-6 md:p-8 text-center border-b md:border-b-0 md:border-r border-gray-100"
              style={{ background: "linear-gradient(160deg,#f0f4ff 0%,#fafbff 100%)" }}
            >
              {/* Logo */}
              <Image src="/logo.png" alt="Logo" width={140} height={50} className="w-auto mb-1" />
              <p className="text-xs text-gray-400 font-medium mb-4">AI-Powered Interview Platform</p>

              {/* Hero image — smaller */}
              <Image
                src="/interview.png"
                alt="Interview"
                width={260}
                height={260}
                priority
                className="w-[150px] md:w-[180px] mb-4"
              />

              {/* Job card */}
              <div className="w-full bg-white rounded-xl border border-blue-100 p-3 shadow-sm text-left">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-blue-100 rounded-lg shrink-0">
                    <Briefcase className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Position</p>
                    <h2 className="font-bold text-gray-800 text-base leading-tight truncate">
                      {interviewData?.jobPosition || "Loading…"}
                    </h2>
                    <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
                      <Clock className="w-3 h-3 text-blue-400" />
                      <span>{interviewData?.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Before you begin */}
              <div className="w-full mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl flex gap-2 text-left">
                <Info className="text-blue-400 shrink-0 w-4 h-4 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-gray-700 mb-1">Before You Begin</p>
                  <ul className="space-y-0.5">
                    {[
                      "Test audio & video setup",
                      "Stable internet connection",
                      "Quiet, well-lit space",
                      "Face clearly visible",
                    ].map((tip) => (
                      <li key={tip} className="text-[11px] text-blue-700">— {tip}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* ── RIGHT PANEL — form ───────────────── */}
            <div className="flex flex-col p-6 md:p-8 gap-4">

              <div>
                <h2 className="text-xl font-extrabold text-gray-800">Join Interview</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in your details to get started</p>
              </div>

              {/* Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="e.g. John Smith"
                    className="h-9 text-sm"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
                  <Input
                    type="email"
                    placeholder="e.g. john@example.com"
                    className="h-9 text-sm"
                    onChange={(e) => setUserEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Gender */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  Your Gender{" "}
                  <span className="text-gray-400 font-normal">(sets AI interviewer gender)</span>
                </label>
                <div className="flex gap-2">
                  {[
                    { value: "male",   label: "Male",   emoji: "👨" },
                    { value: "female", label: "Female", emoji: "👩" },
                  ].map((g) => (
                    <label
                      key={g.value}
                      className={`flex items-center gap-1.5 cursor-pointer flex-1 justify-center px-3 py-2 rounded-lg border-2 text-sm font-semibold transition-all duration-200 ${
                        userGender === g.value
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g.value}
                        checked={userGender === g.value}
                        onChange={() => setUserGender(g.value)}
                        className="sr-only"
                      />
                      <span>{g.emoji}</span>
                      <span>{g.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Camera mandatory notice */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-xs font-bold text-amber-800">📹 Camera is Mandatory</p>
                <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
                  Camera must remain <strong>ON</strong> throughout. Looking away repeatedly may result in warnings.
                </p>
              </div>

              {/* Camera preview / enable */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Camera</label>
                {!cameraGranted ? (
                  <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden">
                    <div className="h-[120px] bg-gray-900 flex flex-col items-center justify-center gap-1.5">
                      <CameraOff className="w-7 h-7 text-gray-600" />
                      <p className="text-[11px] text-gray-500">Preview will appear here</p>
                    </div>
                    <div className="p-2.5">
                      <Button
                        onClick={requestCameraAccess}
                        disabled={cameraLoading}
                        variant="outline"
                        className="w-full h-8 text-xs border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        {cameraLoading ? (
                          <Loader2Icon className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Camera className="mr-1.5 h-3.5 w-3.5" />
                        )}
                        {cameraLoading ? "Requesting…" : "Enable Camera"}
                      </Button>
                      {cameraError && (
                        <p className="text-[11px] text-red-500 mt-2 leading-relaxed">{cameraError}</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-xl overflow-hidden border-2 border-green-400">
                    <video
                      ref={previewVideoRef}
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-[120px] object-cover"
                      style={{ transform: "scaleX(-1)" }}
                    />
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-semibold shadow">
                      <CheckCircle2 className="w-2.5 h-2.5 camera-ready-dot" />
                      Camera Ready
                    </div>
                  </div>
                )}
              </div>

              {/* Join button */}
              <Button
                className="w-full h-11 font-bold text-sm bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25 transition-all duration-300 mt-1"
                disabled={!canJoin || loading}
                onClick={onJoinInterview}
              >
                {loading ? (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Video className="mr-2 h-4 w-4" />
                )}
                {!cameraGranted
                  ? "Enable Camera to Join"
                  : !userName
                  ? "Enter Your Name to Join"
                  : "Join Interview"}
              </Button>

              {!canJoin && (
                <p className="text-[11px] text-gray-400 text-center -mt-2">
                  {!userName && !cameraGranted
                    ? "Enter your name and enable camera to proceed"
                    : !userName
                    ? "Please enter your name"
                    : "Please enable your camera"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Interview;