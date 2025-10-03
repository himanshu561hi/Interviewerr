
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// FIX: Changed import path from alias (@/services/Constants) to relative path
import { InterviewType } from "@/services/Constants"; 
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";


function FormContainer({ onHandleInputChange, onGenerateQuestionsClick, formData, loading }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    // Synchronize selected types with parent form data
    onHandleInputChange('type', selectedTypes);
  }, [selectedTypes, onHandleInputChange]);

  const onSelectType = (type) => {
    // Toggle selection status
    if (selectedTypes.includes(type.title)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type.title));
    } else {
      setSelectedTypes([...selectedTypes, type.title]);
    }
  };

  // Validation check for button enablement
  const isFormComplete = formData.jobPosition && 
                           formData.jobDescription && 
                           formData.duration && 
                           formData.type && 
                           formData.type.length > 0;

  return (
    // Responsive container: uses less margin and padding on mobile (p-4, m-3) 
    // and standard spacing on larger screens (sm:p-5, sm:m-5).
    // It takes full width but has a max-w to center nicely on desktop.
    <div className="sm:p-5 p-3 bg-white rounded-2xl m-3 sm:m-5 max-w-5xl shadow-lg">
      <h1 className="text-xl font-bold mb-6 text-gray-800">Create Interview</h1>
      
      {/* Job Position Input */}
      <div className="mb-5">
        <h2 className="font-medium text-sm text-gray-700 mb-2">Job Position</h2>
        <Input
          className="w-full"
          placeholder="e.g. Full Stack Developer"
          onChange={(event) => onHandleInputChange("jobPosition", event.target.value)}
        />
      </div>
      
      {/* Job Description Textarea */}
      <div className="mb-5">
        <h2 className="font-medium text-sm text-gray-700 mb-2">Job Description</h2>
        <Textarea
          className="w-full h-[150px] sm:h-[200px] resize-none"
          placeholder="Enter detailed job description, including required skills and experience..."
          onChange={(event) => onHandleInputChange("jobDescription", event.target.value)}
        />
      </div>
      
      {/* Interview Duration Select */}
      <div className="mb-5">
        <h2 className="font-medium text-sm text-gray-700 mb-2">Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange("duration", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min (Quick Warm-up)</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min (Standard)</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min (In-depth)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      {/* Interview Type Selection */}
      <div className="mb-7">
        <h2 className="font-medium text-sm text-gray-700 mb-2">Interview Type (Select one or more)</h2>
        <div className="flex gap-3 flex-wrap">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`
                flex items-center gap-2 cursor-pointer p-2 px-3 border rounded-full text-sm transition-all duration-200
                ${selectedTypes.includes(type.title) 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                  : 'bg-gray-50 text-gray-700 border-gray-300 hover:bg-blue-50 hover:border-blue-400'
                }
              `}
              onClick={() => onSelectType(type)}
            >
              <type.icon className="w-4 h-4" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
     
      {/* Generate Questions Button */}
      <div className="mt-7 flex justify-end">
        <Button 
          onClick={onGenerateQuestionsClick} 
          disabled={!isFormComplete || loading}
          className="w-full sm:w-auto px-6 py-3 text-base"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2 h-5 w-5" /> Generating...
            </>
          ) : (
            <>
              Generate Questions <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
  
}

export default FormContainer;
