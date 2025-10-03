
"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { supabase } from '../../services/supabaseClient'; 

// Google Icon Component (Same as before)
const GoogleIcon = () => (
    <svg 
        className="w-5 h-5 mr-3" 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.26H12v4.26h5.88c-.26 1.37-1.04 2.56-2.26 3.33v2.77h3.58c2.09-1.92 3.31-4.7 3.31-8.1z" fill="#4285F4"/>
        <path d="M12 23c3.04 0 5.57-1.01 7.42-2.77l-3.58-2.77c-.96.65-2.2 1.03-3.84 1.03-2.95 0-5.46-1.99-6.38-4.75H2.43v2.85c1.86 3.69 5.86 6.04 9.57 6.04z" fill="#34A853"/>
        <path d="M5.62 13.99c-.19-.57-.31-1.18-.31-1.84s.12-1.27.31-1.84V9.28H2.43c-.69 1.38-1.07 2.92-1.07 4.56s.38 3.18 1.07 4.56L5.62 13.99z" fill="#FBBC05"/>
        <path d="M12 5.37c1.62 0 3.08.56 4.25 1.63l3.18-3.18C17.5 1.74 14.97.75 12 .75 8.3 1.01 4.3 3.36 2.43 7.05l3.19 2.48c.92-2.76 3.43-4.75 6.38-4.75z" fill="#EA4335"/>
    </svg>
);


function Login() {
    const signInWithGoogle = async () => {
        const{error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
            redirectTo: `${window.location.origin}/dashboard`
        }
        });
        if(error)
            {
                 console.error('Login Error: ', error.message); 
            }
    };

    
    return (
    // 1. Main container: Very light, subtle blue/gray background for a clean look
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        
        {/* Optional: Add a subtle background pattern or slight gradient for texture */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-white"></div>

        {/* 2. Login Card: Bright white background, pronounced shadow, and standard border */}
        <div className="
            relative z-10 
            flex flex-col items-center 
            bg-white border border-gray-100 
            p-6 sm:p-10 lg:p-12 
            rounded-3xl 
            shadow-2xl shadow-gray-300/60
            w-full max-w-sm sm:max-w-md 
            text-gray-800
            transition-all duration-300 ease-in-out
        ">
            
            {/* LOGO SECTION - Logo is now on the card background, which should be white. 
                We remove the extra white circle wrapper for a cleaner light theme look. 
            */}
            <Image 
                src="/logo.png" 
                alt="Logo" 
                width={350} 
                height={200}
                // Responsive size, object-contain if the logo is tall/wide
                className="w-40 sm:w-52 h-auto mb-8 object-contain" 
            />
            
            <div className="flex flex-col items-center w-full">
                
                {/* Illustrative Image */}
                <div className="w-full h-40 sm:h-56 mb-8 overflow-hidden rounded-xl shadow-md border border-gray-200 transform hover:scale-[1.01] transition duration-300">
                    <Image 
                        src="/Login.png" 
                        alt="Login Illustration" 
                        priority={true}
                        width={600} 
                        height={400}
                        className="w-full h-full object-cover" 
                    />
                </div>
                
                {/* Text Content */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 text-center mt-3 mb-1">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">AI Interviewer</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-500 text-center mb-10">
                    Sign in with Google to start your practice.
                </p>
             
                {/* Login Button: Bold color for contrast against the light background */}
                <Button 
                    className="
                        w-full py-3 h-auto text-lg font-bold 
                        text-white
                        bg-gradient-to-r from-blue-600 to-indigo-700 
                        hover:from-blue-700 hover:to-indigo-800 
                        transition duration-200 ease-in-out 
                        shadow-lg hover:shadow-xl shadow-blue-400/50 
                        flex items-center justify-center
                    " 
                    onClick={signInWithGoogle}
                >
                    <GoogleIcon />
                    Login With Google
                </Button>
            
            </div>
        </div>
    </div>
    ); 
}

export default Login;