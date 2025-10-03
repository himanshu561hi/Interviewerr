
"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Footer from "../../../footer/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { InterviewType } from "@/services/Constants";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

function FormContainer({ onHandleInputChange, onGenerateQuestionsClick, formData, loading }) {
  const [selectedTypes, setSelectedTypes] = useState([]);

  useEffect(() => {
    onHandleInputChange('type', selectedTypes);
  }, [selectedTypes, onHandleInputChange]);

  const onSelectType = (type) => {
    if (selectedTypes.includes(type.title)) {
      setSelectedTypes(selectedTypes.filter(item => item !== type.title));
    } else {
      setSelectedTypes([...selectedTypes, type.title]);
    }
  };

  const isFormComplete = formData.jobPosition && 
                           formData.jobDescription && 
                           formData.duration && 
                           formData.type && 
                           formData.type.length > 0;

  return (
    <div className="p-5 bg-white rounded-2xl m-5">
      <div>
        <h2 className="font-medium text-sm">Job Position</h2>
        <Input
          className="mt-2"
          placeholder="e.g. Full Stack Developer"
          onChange={(event) => onHandleInputChange("jobPosition", event.target.value)}
        />
      </div>
      <div className="mt-5">
        <h2 className="font-medium text-sm">Job Description</h2>
        <Textarea
          className="mt-2 h-[200px]"
          placeholder="Enter detailed job description..."
          onChange={(event) => onHandleInputChange("jobDescription", event.target.value)}
        />
      </div>
      <div className="mt-5">
        <h2 className="font-medium text-sm">Interview Duration</h2>
        <Select onValueChange={(value) => onHandleInputChange("duration", value)}>
          <SelectTrigger className="w-full mt-2">
            <SelectValue placeholder="Select Duration" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5 Min">5 Min</SelectItem>
            <SelectItem value="15 Min">15 Min</SelectItem>
            <SelectItem value="30 Min">30 Min</SelectItem>
            <SelectItem value="45 Min">45 Min</SelectItem>
            <SelectItem value="60 Min">60 Min</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-5">
        <h2 className="font-medium text-sm">Interview Type</h2>
        <div className="flex gap-3 flex-wrap mt-2">
          {InterviewType.map((type, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 hover:bg-secondary cursor-pointer p-1 px-2 border rounded-2xl ${selectedTypes.includes(type.title) ? 'bg-primary text-white border-primary' : 'bg-white border-gray-300'}`}
              onClick={() => onSelectType(type)}
            >
              <type.icon className="w-4 h-4" />
              <span>{type.title}</span>
            </div>
          ))}
        </div>
      </div>
     
      <div className="mt-7 flex justify-end">
        <Button onClick={onGenerateQuestionsClick} disabled={!isFormComplete || loading}>
          {loading ? (
            <>
              <Loader2 className="animate-spin mr-2" /> Generating...
            </>
          ) : (
            <>
              Generate Questions <ArrowRight className="ml-2" />
              
            </>
            
          )}
        </Button>
      </div>
    </div>
  );
  
}

export default FormContainer;
