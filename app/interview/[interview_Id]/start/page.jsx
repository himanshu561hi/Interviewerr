
"use client";
import React, { useContext, useState, useEffect, useRef } from "react";
import { InterviewDataContext } from "@/context/InterviewDataContext"; // Adjust path
import { Timer, Mic, Phone } from "lucide-react";
import Image from "next/image";
import Vapi from "@vapi-ai/web";

function StartInterview() {
    const { interviewInfo, setInterviewInfo } = useContext(InterviewDataContext) || {
        interviewInfo: { userName: 'Guest', interviewData: { questionList: [{ question: 'What is your experience?' }, { question: 'Why do you want this job?' }] } },
        setInterviewInfo: () => {},
    };
    const vapiRef = useRef(null);
    const [isCallActive, setIsCallActive] = useState(false);
    const [time, setTime] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const timerIntervalRef = useRef(null);

    // Initialize Vapi only on client side
    useEffect(() => {
        if (typeof window === "undefined") return; // Prevent SSR execution
        console.log("Initializing Vapi...");
        try {
            vapiRef.current = new Vapi("22f6b4e0-22ba-49f1-b184-fd9ff244d1e2"); // Verify this key
            console.log("Vapi initialized successfully:", vapiRef.current);
        } catch (error) {
            console.error("Failed to initialize Vapi:", error.message);
            return;
        }

        vapiRef.current.on("call-start", () => {
            console.log("Call started event triggered");
            setIsCallActive(true);
            startTimer();
        });

        vapiRef.current.on("call-end", () => {
            console.log("Call ended event triggered");
            setIsCallActive(false);
            stopTimer();
            setInterviewInfo((prev) => ({
                ...prev,
                isInterviewActive: false,
            }));
        });

        vapiRef.current.on("message", (message) => {
            console.log("Message event:", message);
            if (message.type === "transcript") {
                console.log(`${message.role}: ${message.transcript}`);
            }
        });

        vapiRef.current.on("error", (error) => {
            console.error("Vapi error event:", JSON.stringify(error, null, 2));
            if (error.code === "start-method-error") {
                console.error("Start method failed. Possible causes: invalid assistant ID, API key, or serverMessage configuration.");
                if (error.message) console.error("Error message:", error.message);
            }
        });
    }, [setInterviewInfo]);

    // Start call when interviewInfo is available and on client
    useEffect(() => {
        if (typeof window === "undefined" || !vapiRef.current) return; // Prevent SSR and ensure Vapi is ready
        console.log("Checking interviewInfo in useEffect:", interviewInfo);
        if (interviewInfo && !isCallActive) {
            console.log("Starting call with interviewInfo:", interviewInfo);
            startCall();
        } else if (!interviewInfo) {
            console.warn("interviewInfo is undefined, using fallback");
            startCall(); // Attempt with fallback
        }
    }, [interviewInfo, isCallActive]);

    const startTimer = () => {
        if (timerIntervalRef.current) return;
        timerIntervalRef.current = setInterval(() => {
            setTime((prev) => prev + 1);
        }, 1000);
    };

    const stopTimer = () => {
        if (timerIntervalRef.current) {
            clearInterval(timerIntervalRef.current);
            timerIntervalRef.current = null;
        }
    };

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    const startCall = () => {
        if (typeof window === "undefined" || !vapiRef.current) {
            console.error("Vapi instance is not initialized or not on client");
            return;
        }
        
        // 1. Build dynamic prompt content
        let questionList = "";
        if (interviewInfo?.interviewData?.questionList && Array.isArray(interviewInfo?.interviewData?.questionList)) {
            questionList = interviewInfo?.interviewData?.questionList
                .filter(item => item?.question)
                .map(item => item.question)
                .join(", ");
        } else {
            console.warn("No valid interviewData.questionList found, using fallback");
            questionList = "What is your experience?, Why do you want this job?";
        }
        console.log("Constructed questionList:", questionList);

        const dynamicSystemPrompt = `
            You are an AI voice assistant conducting interviews.
            Your job is to ask candidates provided interview questions, assess their responses.
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
            "Hey there! Welcome to your ${interviewInfo?.interviewData?.jobPosition} interview. Let’s get started with a few questions!"

            Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
            Questions: ${questionList}

            Keep the conversation natural and engaging–use casual phrases like "Alright, next up…" or "Let’s tackle a tricky one!"
            After 5–7 questions, wrap up the interview smoothly by summarizing their performance. Example:
            "That was great! You handled some tough questions well. Keep sharpening your skills!"

            End on a positive note:
            "Thanks for chatting! Hope to see you crushing projects soon!"

            Key Guidelines:
            ✅ Be friendly, engaging, and witty
            ✅ Keep responses short and natural, like a real conversation
            ✅ Adapt based on the candidate’s confidence level
            ✅ Ensure the interview remains focused on React
        `.trim();

        // 2. Define the inline assistant object
        const dynamicAssistant = {
            name: "AI Recruiter",
            model: {
                provider: "openai",
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: dynamicSystemPrompt,
                    },
                ],
            },
            voice: {
                provider: "playht",
                voiceId: "jennifer",
            },
            transcriber: {
                provider: "deepgram",
                model: "nova-2",
                language: "en-US",
            },
            firstMessage: `Hi ${interviewInfo?.userName}, how are you? Ready for your interview on ${interviewInfo?.interviewData?.jobPosition}?`,
        };

        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(() => {
                console.log("Microphone access granted");
                try {
                    vapiRef.current.start(dynamicAssistant); 
                    console.log("Call start attempted with dynamic assistant");
                } catch (error) {
                    console.error("Error starting call:", error.message);
                }
            })
            .catch((err) => {
                console.error("Microphone access denied or error:", err);
                alert("Please allow microphone access to start the interview.");
            });
    };

    const endCall = () => {
        if (vapiRef.current && isCallActive) {
            console.log("Ending call...");
            vapiRef.current.stop();
            setIsCallActive(false); 
            stopTimer();
            setTime(0);
            setInterviewInfo((prev) => ({
                ...prev,
                isInterviewActive: false,
            }));
            console.log("Call ended, timer reset, and state updated");
        }
    };

    const toggleMic = () => {
        setIsMuted((prev) => !prev);
        console.log("Mic toggled:", !isMuted);
    };

    const userInitial = interviewInfo?.userName ? interviewInfo.userName[0].toUpperCase() : "U";

    return (
        <div className="p-20 lg:px-48 xl:px-56">
            <h2 className="font-semibold text-sm">({interviewInfo?.interviewData?.jobPosition || 'Loading...'})</h2>
            <h2 className="font-bold text-xl flex items-center justify-between">
                AI - Interview Session 
                <span className="flex gap-2 items-center">
                    <Timer />
                    {formatTime(time)}
                </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5">
                <div className="bg-white h-[300px] rounded-lg border flex flex-col justify-center items-center">
                    <Image
                        src="/ai.jpeg"
                        alt="AI"
                        width={100}
                        height={100}
                        className="w-[60px] h-[60px] rounded-full object-cover"
                    />
                    <h2 className="text-sm font-semibold mt-2">AI Interviewer</h2>
                </div>
                <div className="bg-white h-[300px] rounded-lg border flex flex-col justify-center items-center">
                    <h2 className="text-2xl bg-primary text-white p-3 rounded-full px-6">{userInitial}</h2>
                    <h2 className="text-sm mt-2 font-semibold">{interviewInfo?.userName || "Guest"}</h2>
                </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-7">
                <Mic
                    className={`w-12 h-12 rounded-full text-white p-3 cursor-pointer transition-colors ${
                        isMuted ? "bg-gray-500" : "bg-green-500"
                    }`}
                    onClick={toggleMic}
                />
                <Phone
                    className="w-12 h-12 rounded-full bg-red-500 text-white p-3 cursor-pointer"
                    onClick={endCall}
                />
            </div>
            <h2 className="text-center text-sm text-gray-500 mt-4">
                {isCallActive ? "Interview in progress..." : "Starting interview..."}
            </h2>
        </div>
    );
}

export default StartInterview;