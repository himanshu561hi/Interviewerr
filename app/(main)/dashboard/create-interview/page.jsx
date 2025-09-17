
"use client"
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useCallback, useEffect } from 'react'; // useEffect को import करें
import { Progress } from "@/components/ui/progress"
import FormContainer from "./_components/FormContainer"

export default function CreateInterview() {
    const Router = useRouter();
    const [step, setStep]= useState(1);
    const [formData,setFormData]= useState({});
    
    const onHandleInputChange = useCallback((field,value) => {
        setFormData(prev=>({
            ...prev,
            [field]:value
        }))
        console.log("FormData",formData)
    }, [setFormData]);

    useEffect(()=>{
        console.log("FormData", formData);
    }, [formData]); 

    return (
        <div className="mt-5 px-10 md:px-24 lg:px-44 xl:px-56">
            <div className="flex items-center gap-5 ">
                <ArrowLeft onClick={() => Router.back()} className="cursor-pointer" />
                <h2 className="text-2xl font-bold">Create New Interview</h2>
                
            </div>
            <Progress value={step * 33.33} className="my-5"/>
            <FormContainer onHandleInputChange={onHandleInputChange}/>
        </div>
    )
}