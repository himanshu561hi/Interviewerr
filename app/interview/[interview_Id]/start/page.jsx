"use client";
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext";
import { Timer, Mic, MicOff, PhoneOff, AlertTriangle } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useRouter } from "next/navigation";
import axios from "axios";
import { supabase } from "@/services/supabaseClient";
import { useParams } from "next/navigation";
import AiAvatar from "@/app/interview/_components/AiAvatar";
import { useFaceTracking } from "@/hooks/useFaceTracking";
import { toast } from "sonner";

/* ════════════════════════════════════════════════════════════
   StartInterview — Full Google-Meet–style interview session
   ════════════════════════════════════════════════════════════ */
function StartInterview() {
  /* ── Context ──────────────────────────────────────────── */
  const { interviewInfo, setInterviewInfo } = useContext(
    InterviewDataContext
  ) || { interviewInfo: null, setInterviewInfo: () => {} };

  const { interview_Id } = useParams();
  const router = useRouter();

  /* ── Vapi / call state ────────────────────────────────── */
  const vapiRef               = useRef(null);
  const isInitializing        = useRef(false);
  const conversationRef       = useRef([]);
  const [isCallActive, setIsCallActive]       = useState(false);
  const [isMuted, setIsMuted]                 = useState(false);
  const [isAiSpeaking, setIsAiSpeaking]       = useState(false);
  const [isUserSpeaking, setIsUserSpeaking]   = useState(false);
  const [vapiError, setVapiError]             = useState(null);
  const [hasAttemptedStart, setHasAttemptedStart] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [fatalError, setFatalError]           = useState("");

  /* ── Timer ────────────────────────────────────────────── */
  const [time, setTime]           = useState(0);
  const timerIntervalRef          = useRef(null);
  const aiSpeechTimeoutRef        = useRef(null);
  const userSpeechTimeoutRef      = useRef(null);

  /* ── Candidate camera ─────────────────────────────────── */
  const candidateVideoRef     = useRef(null);
  const candidateStreamRef    = useRef(null);
  const [cameraError, setCameraError] = useState("");
  const [cameraActive, setCameraActive] = useState(false);

  /* ── Face tracking ─────────────────────────────────────── */
  const {
    faceDetected,
    gazeDirection,
    warningCount,
    warningMessage,
    attentionStats,
    isTrackerReady,
    getAttentionReport,
  } = useFaceTracking({ videoRef: candidateVideoRef, isActive: cameraActive });

  /* ════════════════════════════════════════════════════════
     CAMERA SETUP (separate from Vapi audio)
  ════════════════════════════════════════════════════════ */
  useEffect(() => {
    let stream = null;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 640, height: 480, facingMode: "user" },
          audio: false,
        });
        candidateStreamRef.current = stream;
        if (candidateVideoRef.current) {
          candidateVideoRef.current.srcObject = stream;
          await candidateVideoRef.current.play();
        }
        setCameraActive(true);
        setCameraError("");
      } catch (err) {
        console.error("Camera init error:", err);
        if (err.name === "NotAllowedError") {
          setCameraError("Camera permission denied. Face tracking disabled.");
        } else {
          setCameraError("Camera unavailable. " + err.message);
        }
      }
    };
    startCamera();
    return () => {
      stream?.getTracks().forEach((t) => t.stop());
      candidateStreamRef.current = null;
    };
  }, []);

  /* ════════════════════════════════════════════════════════
     TAB VISIBILITY CHECK
  ════════════════════════════════════════════════════════ */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && isCallActive) {
        setFatalError("Tab switch detected. Interview terminated to ensure fairness.");
        toast.error("Tab switch detected. Interview ended.");
        setTimeout(() => endCall(), 2000);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isCallActive]);


  /* ════════════════════════════════════════════════════════
     VAPI SETUP
  ════════════════════════════════════════════════════════ */
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const key = process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY;
      vapiRef.current = new Vapi(key);
    } catch (e) {
      console.error("Vapi init failed:", e.message);
      return;
    }

    /* call-start */
    vapiRef.current.on("call-start", () => {
      isInitializing.current = false;
      setIsCallActive(true);
      startTimer();
      conversationRef.current = [];
    });

    /* call-end */
    vapiRef.current.on("call-end", async () => {
      isInitializing.current = false;
      setIsCallActive(false);
      stopTimer();
      setInterviewInfo((p) => ({ ...p, isInterviewActive: false }));
      setIsAiSpeaking(false);
      setIsUserSpeaking(false);
      cleanupMedia();
      await GenerateFeedback(conversationRef.current);
    });

    /* transcript messages */
    vapiRef.current.on("message", (msg) => {
      if (msg.type === "transcript") {
        conversationRef.current.push({ role: msg.role, transcript: msg.transcript });

        if (msg.role === "assistant") {
          // Update displayed question
          if (msg.transcript?.trim()) setCurrentQuestion(msg.transcript);
          setIsAiSpeaking(true);
          clearTimeout(aiSpeechTimeoutRef.current);
          aiSpeechTimeoutRef.current = setTimeout(() => setIsAiSpeaking(false), 2000);
        } else {
          setIsUserSpeaking(true);
          clearTimeout(userSpeechTimeoutRef.current);
          userSpeechTimeoutRef.current = setTimeout(() => setIsUserSpeaking(false), 2000);
        }
      }
    });

    /* errors */
    vapiRef.current.on("error", (err) => {
      console.error("Vapi error:", JSON.stringify(err));
      isInitializing.current = false;
      setVapiError(err.msg || err.message || "An unexpected error occurred.");
    });

    return () => {
      // cleanup Vapi listeners (vapiRef will be nulled on unmount via startCall cleanup)
    };
  }, [setInterviewInfo]);

  /* Auto-start call once interviewInfo is ready */
  useEffect(() => {
    if (!vapiRef.current || hasAttemptedStart) return;
    if (interviewInfo && !isCallActive) {
      setHasAttemptedStart(true);
      startCall();
    } else if (!interviewInfo) {
      setHasAttemptedStart(true);
      startCall();
    }
  }, [interviewInfo, isCallActive, hasAttemptedStart]);

  /* ════════════════════════════════════════════════════════
     TIMER HELPERS
  ════════════════════════════════════════════════════════ */
  const startTimer = () => {
    if (timerIntervalRef.current) return;
    timerIntervalRef.current = setInterval(() => setTime((p) => p + 1), 1000);
  };
  const stopTimer = () => {
    clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = null;
  };
  const formatTime = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  /* ════════════════════════════════════════════════════════
     FEEDBACK GENERATION
  ════════════════════════════════════════════════════════ */
  const GenerateFeedback = async (conversation) => {
    // Collect attention metrics before we navigate away
    const attentionReport = getAttentionReport();

    if (!conversation?.length) {
      router.replace("/interview/" + interview_Id + "/completed");
      return;
    }

    let feedbackData = {};
    try {
      const result = await axios.post("/api/ai-feedback", {
        conversation,
        attentionMetrics: attentionReport,
      });
      const content = result?.data?.content;
      const cleaned = content.replace(/^```json/, "").replace(/```$/, "").trim();

      setInterviewInfo((p) => ({ ...p, feedback: cleaned }));

      try {
        feedbackData = JSON.parse(cleaned);
      } catch {
        feedbackData = { rawFeedback: cleaned };
      }

      // Merge attention report into feedback object for Supabase storage
      feedbackData.attentionMetrics = attentionReport;

      await supabase.from("interview-feedback").insert([
        {
          userName:    interviewInfo?.userName,
          userEmail:   interviewInfo?.userEmail,
          interview_Id,
          feedback:    feedbackData,
          recommended: false,
        },
      ]);
    } catch (err) {
      console.error("Feedback generation error:", err);
    } finally {
      router.replace("/interview/" + interview_Id + "/completed");
    }
  };

  /* ════════════════════════════════════════════════════════
     VAPI CALL CONTROL
  ════════════════════════════════════════════════════════ */
  const startCall = () => {
    if (!vapiRef.current) { console.error("Vapi not initialised"); return; }
    if (!process.env.NEXT_PUBLIC_VAPI_PUBLIC_API_KEY) {
      setVapiError("Vapi configuration is incomplete (missing public API key).");
      return;
    }
    if (isInitializing.current || isCallActive) return;
    isInitializing.current = true;
    setVapiError(null);

    const questionList =
      interviewInfo?.interviewData?.questionList
        ?.filter((q) => q?.question)
        .map((q) => q.question)
        .join(", ") ||
      "What is your experience?, Why do you want this job?";

    const systemPrompt = `
You are an AI voice assistant conducting interviews.
Your job is to ask candidates provided interview questions, assess their responses.
Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
"Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition || "role"} interview. Let's get started with a few questions!"

Ask one question at a time and wait for the candidate's response before proceeding.
Questions: ${questionList}

Keep the conversation natural and engaging – use casual phrases like "Alright, next up…" or "Let's tackle a tricky one!"
After all questions, wrap up the interview smoothly.
End on a positive note: "Thanks for chatting! Hope to see you crushing projects soon!"

Key Guidelines:
✅ Be friendly, engaging, and witty
✅ Keep responses short and natural, like a real conversation
✅ Adapt based on the candidate's confidence level`.trim();

    const isFemaleInterviewer = interviewInfo?.userGender === "male";
    const voiceId = isFemaleInterviewer ? "nova" : "echo"; // OpenAI voices

    const assistant = {
      name: "AI Interviewer",
      model: {
        provider: "openai",
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: systemPrompt }],
      },
      voice: {
        provider: "openai",
        voiceId: voiceId
      },
      firstMessage: `Hi ${interviewInfo?.userName || "there"}, ready for your interview on ${
        interviewInfo?.interviewData?.jobPosition || "this role"
      }?`,
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        try {
          vapiRef.current.start(assistant);
        } catch (e) {
          console.error("Vapi start error:", e.message);
          isInitializing.current = false;
          setVapiError("Failed to start the interview call.");
        }
      })
      .catch((err) => {
        console.error("Mic access denied:", err);
        isInitializing.current = false;
        setVapiError("Microphone access is required to start the interview.");
      });
  };

  const endCall = useCallback(() => {
    if (vapiRef.current && isCallActive) {
      vapiRef.current.mute?.(true);
      vapiRef.current.stop();
      vapiRef.current = null;
      setIsCallActive(false);
      stopTimer();
      setTime(0);
      setInterviewInfo((p) => ({ ...p, isInterviewActive: false }));
      setIsAiSpeaking(false);
      setIsUserSpeaking(false);
      cleanupMedia();
      setTimeout(() => {
        router.push("/interview/" + interview_Id + "/completed");
      }, 500);
    }
  }, [isCallActive, interview_Id, router, setInterviewInfo]);

  const toggleMic = () => {
    if (vapiRef.current?.mute) {
      vapiRef.current.mute(!isMuted);
      setIsMuted((p) => !p);
    }
  };

  const cleanupMedia = () => {
    candidateStreamRef.current?.getTracks().forEach((t) => t.stop());
  };

  /* ── Derived ─────────────────────────────────────────── */
  const userInitial = interviewInfo?.userName?.[0]?.toUpperCase() || "U";
  const jobPosition = interviewInfo?.interviewData?.jobPosition || "Interview";

  /* ════════════════════════════════════════════════════════
     RENDER — Light Theme Layout
  ════════════════════════════════════════════════════════ */
  return (
    <div
      className="min-h-screen flex flex-col text-gray-800 overflow-hidden bg-gray-50 font-sans"
    >

      {/* ── TOP BAR ───────────────────────────────────── */}
      <header
        className="flex items-center justify-between px-6 py-4 border-b shrink-0 bg-white shadow-sm"
      >
        {/* Left: job info */}
        <div className="min-w-0">
          <p className="text-xs text-blue-600 font-semibold uppercase tracking-widest">AI Interview Session</p>
          <h1 className="font-bold text-lg text-gray-800 truncate max-w-[200px] md:max-w-md">{jobPosition}</h1>
        </div>

        {/* Center: timer */}
        <div
          className="flex items-center gap-2 px-5 py-2 rounded-full font-mono text-sm font-bold bg-gray-100 border border-gray-200 text-gray-700 shadow-inner"
        >
          <Timer className="w-5 h-5 text-gray-500" />
          <span>{formatTime(time)}</span>
        </div>

        {/* Right: status pill */}
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm ${
            isCallActive
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-amber-50 text-amber-700 border border-amber-200"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${isCallActive ? "bg-green-500 animate-pulse" : "bg-amber-500"}`}
          />
          {isCallActive ? "Live" : "Connecting…"}
        </div>
      </header>

      {/* ── SPLIT VIDEO PANELS ────────────────────────── */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 p-6 min-h-0 max-w-7xl mx-auto w-full">

        {/* LEFT — AI Interviewer ─────────────────────── */}
        <div
          className="relative rounded-3xl overflow-hidden flex flex-col bg-white border border-gray-200 shadow-md transition-shadow hover:shadow-lg"
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md shadow-sm border border-gray-100 text-gray-700"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            AI Interviewer
          </div>

          {/* Avatar (Webcam simulation) */}
          <div className="flex-1 relative bg-gray-900 min-h-[250px] md:min-h-0">
            <div className={`absolute inset-0 transition-all duration-300 ${
              isAiSpeaking ? "ring-4 ring-inset ring-blue-500 shadow-inner" : ""
            }`}>
              <AiAvatar
                gender={interviewInfo?.userGender}
                isSpeaking={isAiSpeaking}
                isListening={isCallActive && !isAiSpeaking}
              />
            </div>
            
            {/* Live Indicator */}
            {isCallActive && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 px-2 py-1 rounded-md bg-red-600/90 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE
              </div>
            )}
          </div>

          {/* Speaking bar */}
          {isAiSpeaking && (
            <div
              className="absolute bottom-6 inset-x-0 flex justify-center"
            >
              <div
                className="flex items-end gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-blue-700 bg-white/90 backdrop-blur-md shadow-lg border border-blue-100"
              >
                {[0, 1, 2, 3, 2].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-blue-500 audio-bar"
                    style={{ height: `${10 + h * 5}px`, animationDelay: `${i * 0.1}s` }}
                  />
                ))}
                <span className="ml-2">Speaking</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — Candidate Video ───────────────────── */}
        <div
          className="relative rounded-3xl overflow-hidden flex flex-col bg-white border border-gray-200 shadow-md"
        >
          {/* Panel label */}
          <div
            className="absolute top-4 left-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md shadow-sm border border-gray-100 text-gray-700"
          >
            <span
              className={`w-2.5 h-2.5 rounded-full ${
                isUserSpeaking ? "bg-emerald-500 animate-pulse" : "bg-gray-400"
              }`}
            />
            {interviewInfo?.userName || "Candidate"}
          </div>

          {/* Gaze / warning badge */}
          {cameraActive && faceDetected && gazeDirection !== "center" && (
            <div
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-xs font-bold text-amber-700 bg-amber-100 border border-amber-300 shadow-sm"
            >
              👁{" "}
              {gazeDirection === "left"
                ? "← Looking left"
                : gazeDirection === "right"
                ? "Looking right →"
                : "↓ Looking down"}
            </div>
          )}

          {/* Video element */}
          <div className="flex-1 relative min-h-[250px] md:min-h-0 bg-gray-900">
            <video
              ref={candidateVideoRef}
              autoPlay
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />

            {/* Camera error overlay */}
            {(cameraError || !cameraActive) && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-800/90"
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-3xl text-white font-bold bg-blue-500/30"
                >
                  {userInitial}
                </div>
                <p className="text-sm font-medium text-gray-300 text-center px-6">
                  {cameraError || "Starting camera…"}
                </p>
              </div>
            )}

            {/* Face not detected overlay */}
            {cameraActive && !faceDetected && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-red-900/60 backdrop-blur-sm"
              >
                <div className="text-center p-6 bg-red-800/80 rounded-2xl shadow-xl">
                  <p className="text-lg font-bold text-white">Face not detected</p>
                  <p className="text-sm text-red-200 mt-2">Please return to the camera</p>
                </div>
              </div>
            )}
          </div>

          {/* Speaking bar */}
          {isUserSpeaking && (
            <div className="absolute bottom-6 inset-x-0 flex justify-center">
              <div
                className="flex items-end gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold text-emerald-700 bg-white/90 backdrop-blur-md shadow-lg border border-emerald-100"
              >
                {[1, 2, 3, 2, 1].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-full bg-emerald-500 audio-bar"
                    style={{ height: `${8 + h * 5}px`, animationDelay: `${i * 0.08}s` }}
                  />
                ))}
                <span className="ml-2">🎤 Speaking</span>
              </div>
            </div>
          )}

          {/* Attention stats mini HUD */}
          {isTrackerReady && (
            <div
              className="absolute bottom-4 right-4 text-[11px] font-medium text-gray-700 space-y-1 bg-white/90 backdrop-blur-md p-3 rounded-xl shadow-sm border border-gray-100"
            >
              <p>Eye contact: <span className="text-blue-600 font-bold ml-1">{attentionStats.eyeContactScore}%</span></p>
              <p>Warnings: <span className={`font-bold ml-1 ${warningCount > 0 ? "text-amber-600" : "text-green-600"}`}>{warningCount}/3</span></p>
            </div>
          )}
        </div>
      </main>

      {/* ── CURRENT QUESTION STRIP ───────────────────── */}
      {currentQuestion && (
        <div
          className="px-6 py-4 shrink-0 bg-blue-50 border-y border-blue-100 shadow-inner"
        >
          <div className="flex items-start gap-4 max-w-5xl mx-auto">
            <span className="bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md shrink-0 mt-0.5">
              AI ASKED
            </span>
            <p className="text-base text-blue-900 font-medium leading-relaxed">
              {currentQuestion}
            </p>
          </div>
        </div>
      )}

      {/* ── WARNING BANNER ───────────────────────────── */}
      {(warningMessage || fatalError) && (
        <div className="px-6 py-3 shrink-0 warning-enter bg-white">
          <div
            className={`flex items-center gap-3 px-5 py-4 rounded-2xl max-w-5xl mx-auto shadow-sm border ${fatalError ? 'bg-red-50 border-red-300' : 'bg-amber-50 border-amber-300'}`}
          >
            <AlertTriangle className={`w-6 h-6 shrink-0 ${fatalError ? 'text-red-500' : 'text-amber-500'}`} />
            <p className={`text-base font-semibold flex-1 ${fatalError ? 'text-red-800' : 'text-amber-800'}`}>
              {fatalError || warningMessage}
            </p>
            {!fatalError && (
              <span
                className="text-sm font-black px-3 py-1 rounded-full shrink-0 bg-amber-200 text-amber-800"
              >
                {warningCount} / 3
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── VAPI ERROR ───────────────────────────────── */}
      {vapiError && (
        <div className="px-6 py-3 shrink-0 bg-white">
          <div
            className="px-5 py-4 rounded-2xl max-w-5xl mx-auto text-sm font-medium text-red-700 bg-red-50 border border-red-200 shadow-sm"
          >
            {vapiError}
          </div>
        </div>
      )}

      {/* ── BOTTOM CONTROLS ──────────────────────────── */}
      <footer
        className="px-6 py-5 shrink-0 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]"
      >
        <div className="flex items-center justify-center gap-8 max-w-5xl mx-auto relative">
          
          <div className="absolute left-0 text-sm font-medium text-gray-500 hidden md:block">
            {isTrackerReady
              ? "👁 Attention monitor: Active"
              : "⏳ Attention monitor: Loading…"}
          </div>

          {/* Mic toggle */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={toggleMic}
              title={isMuted ? "Unmute" : "Mute"}
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none border-2 shadow-md hover:scale-105 active:scale-95 ${
                isMuted 
                  ? "bg-red-50 border-red-500 text-red-500 hover:bg-red-100" 
                  : "bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100"
              }`}
            >
              {isMuted ? (
                <MicOff className="w-6 h-6" />
              ) : (
                <Mic className="w-6 h-6" />
              )}
            </button>
            <span className="text-xs font-semibold text-gray-500">{isMuted ? "Muted" : "Mic On"}</span>
          </div>

          {/* End call */}
          <div className="flex flex-col items-center gap-2">
            <button
              onClick={endCall}
              title="End Interview"
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none shadow-lg hover:scale-105 active:scale-95 bg-red-600 hover:bg-red-700 text-white"
            >
              <PhoneOff className="w-7 h-7" />
            </button>
            <span className="text-xs font-bold text-red-600">End Call</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

export default StartInterview;
