
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
        <div className="p-5 mt-3 bg-white rounded-lg border shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">{interviewDetail.jobPosition}</h2>
            
            <div className="mt-4 flex items-center justify-between lg:pr-52">
                <div>
                    <h3 className="text-sm text-gray-500 flex items-center gap-1">Duration</h3>
                    <p className="font-bold mt-1 flex items-center gap-1"><Clock className="h-4 w-4"/> {interviewDetail.duration}</p>
                </div>
                <div>
                    <h3 className="text-sm text-gray-500 flex items-center gap-1"> Created On</h3>
                    <p className="font-bold mt-1 flex items-center gap-1"><Calendar className="h-4 w-4"/>{formattedDate}</p>
                </div>
                {interviewTypes.length > 0 && (
                    <div className="col-span-2 md:col-span-1">
                        <h3 className="text-sm text-gray-500 flex items-center gap-1">Type</h3>
                        {/* Displaying types with comma and space */}
                        <p className="font-bold mt-1 flex items-center gap-1"><Tag className="h-4 w-4"/> {interviewTypes.join(', ')}</p>
                    </div>
                )}
            </div>

            {interviewDetail.jobDescription && (
                <div className="mt-5">
                    <h3 className="font-bold text-gray-800">Job Description</h3>
                    <p className="text-sm mt-2 text-gray-600">{interviewDetail.jobDescription}</p>
                </div>
            )}
            
            <div className="mt-5">
                <h2 className="font-bold">Interview Questions</h2>
                <div className="grid grid-cols-2 mt-3 gap-3">
                    {interviewDetail.questionList.map((item, index) => (
    <div key={index} className="grid-cols-2 mt-3 gap-3">
        <h2 className="text-xs flex">{index+1}. {item?.question}</h2>
    </div>
))}
                </div>
            </div>
        </div>
    );
};

export default InterviewDetailContainer;

