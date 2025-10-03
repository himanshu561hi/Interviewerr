"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { supabase } from '../../services/supabaseClient';


function Login() {
    const signInWithGoogle = async () => {
        const{error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
            // This line tells Supabase where to send the user after login
            redirectTo: `${window.location.origin}/dashboard`
        }
        });
        if(error)
            {
                 console.log('Error: ', error.message); 
            }
    };

    
    return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col items-center border p-8 rounded-2xl shadow-lg">
            <Image src="/logo.png" alt="Logo" 
            width={350} 
            height={200}
            className="w-[280px] mb-8" />
        
            <div className="flex flex-col items-center">
                <Image src="/Login.png" alt="Login" 
                priority={true}
                width={600} 
                height={400}
                className="w-[400px] h-[250px] rounded-2xl" />
                <h2 className="text-2xl font-bold text-center mt-5">Welcome to AI Interviewer</h2>
                <p className="text-gray-500 text-center">Sign In With Google to Authenticate
                </p>
             
                <Button className="mt-7 w-full" onClick={signInWithGoogle}>Login With Google
                </Button>
            
            </div>
        </div>
    </div>
    ); 
}
export default Login;
