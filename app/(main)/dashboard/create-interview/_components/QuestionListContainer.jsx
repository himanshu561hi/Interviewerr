import React from 'react';

function QuestionListContainer({questions}) {
    return (
        <div>
            <h4 className="text-2xl font-semibold text-gray-800 mb-6">Generated Interview Questions:</h4>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6">
            {questions.map((q, index) => (
              <div key={index} className="bg-white border border-gray-200 p-6 rounded-lg  hover:shadow-xl transition-shadow duration-300 transform hover:scale-101">
                <div className="flex items-center mb-3">
                  <span className="text-sm font-semibold text-blue-500 bg-blue-100 px-3 py-1 rounded-full">
                    {q.type}
                  </span>
                </div>
                <h4 className="text-sm font-medium text-gray-900 leading-relaxed mb-4">
                  <span className="font-bold text-blue-600 mr-2">{index + 1}.</span>{q.question}
                </h4>
              </div>
            ))}
          </div>
        </div>
    )
}
export default QuestionListContainer;