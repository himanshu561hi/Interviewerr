
"use client"
import React from 'react';
import { Clock, Calendar, Tag } from 'lucide-react';
import { format } from 'date-fns';

const InterviewDetailContainer = ({ interviewDetail }) => {

    // Helper function to safely parse and format the interview types
    const getInterviewTypes = () => {
        if (!interviewDetail || !interviewDetail.type) {
            return []; // Return empty array if no data
        }
        try {
            const typeArray = JSON.parse(interviewDetail.type);
            if (Array.isArray(typeArray)) {
                // This logic splits concatenated words like "TechnicalBehavioral" into ["Technical", "Behavioral"]
                return typeArray.flatMap(type =>
                    typeof type === 'string'
                        ? type.split(/(?=[A-Z])/).map(part => part.trim()).filter(Boolean)
                        : [type]
                );
            }
            return [];
        } catch (error) {
            console.error("Failed to parse interview type:", error);
            return [];
        }
    };
    
    // Call the function to get the clean array of types
    const interviewTypes = getInterviewTypes();

    // Render a loading state or nothing if data is not yet available
    if (!interviewDetail) {
        return (
            <div className="p-5 mt-3 bg-white rounded-lg text-center">
                <p>Loading interview details...</p>
            </div>
        );
    }
    
    // Safely format the date
    const formattedDate = interviewDetail.created_at
        ? format(new Date(interviewDetail.created_at), 'PP') // Using 'PP' for a more readable format like 'Oct 2, 2025'
        : 'Not available';

    return (
        // Enhanced Container: Adjusted padding for small screens and added margin
        <div className="p-4 sm:p-5 mt-3 bg-white rounded-lg border shadow-sm">
            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 break-words">{interviewDetail.jobPosition}</h2>
            
            {/* Details Section: Changed to flex-wrap for mobile stacking */}
            <div className="mt-4 flex flex-wrap gap-4 justify-start sm:justify-between lg:pr-52">
                {/* Duration */}
                <div className="min-w-[100px]">
                    <h3 className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">Duration</h3>
                    <p className="font-bold mt-1 text-sm sm:text-base flex items-center gap-1">
                        <Clock className="h-4 w-4 text-primary"/> {interviewDetail.duration}
                    </p>
                </div>
                {/* Created On */}
                <div className="min-w-[100px]">
                    <h3 className="text-xs sm:text-sm text-gray-500 flex items-center gap-1"> Created On</h3>
                    <p className="font-bold mt-1 text-sm sm:text-base flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-primary"/>{formattedDate}
                    </p>
                </div>
                {/* Type */}
                {interviewTypes.length > 0 && (
                    <div className="min-w-[100px]">
                        <h3 className="text-xs sm:text-sm text-gray-500 flex items-center gap-1">Type</h3>
                        <p className="font-bold mt-1 text-sm sm:text-base flex items-center gap-1">
                            <Tag className="h-4 w-4 text-primary"/> {interviewTypes.join(', ')}
                        </p>
                    </div>
                )}
            </div>

            {/* Job Description */}
            {interviewDetail.jobDescription && (
                <div className="mt-5 border-t pt-5">
                    <h3 className="font-bold text-gray-800">Job Description</h3>
                    <p className="text-sm mt-2 text-gray-600 leading-relaxed">{interviewDetail.jobDescription}</p>
                </div>
            )}
            
            {/* Interview Questions Grid */}
            <div className="mt-5 border-t pt-5">
                <h2 className="font-bold">Interview Questions</h2>
                {/* Grid changed to 1 column on mobile, 2 columns on medium screens and up */}
                <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-y-4 gap-x-6">
                    {interviewDetail.questionList?.map((item, index) => (
                        // Removed unnecessary nested div and simplified structure
                        <div key={index}>
                            <h2 className="text-sm flex font-medium text-gray-700">
                                {index+1}. {item?.question}
                            </h2>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default InterviewDetailContainer;