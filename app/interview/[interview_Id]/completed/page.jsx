
"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const InterviewComplete = () => {
  const [secondsLeft, setSecondsLeft] = useState(10);
  const router = useRouter();

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const intervalId = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, router]); // Dependency array

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
      color: '#333'
    }}>
      {/* Header with Checkmark */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px'
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#4CAF50',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '40px',
          color: 'white'
        }}>
          ✓
        </div>
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#4a4a4a',
          margin: '0 0 10px'
        }}>
          Interview Complete!
        </h1>
        <p style={{
          fontSize: '16px',
          color: '#888',
          margin: '0'
        }}>
          Thank you for participating in the AI-driven interview with Alcruiter
        </p>
      </div>
          <p style={{ marginTop: '20px', color: '#777', fontSize: '14px' }}>
        Wait for {secondsLeft} seconds...
      </p>
      {/* Illustration */}
      <div style={{
        width: '100%',
        maxWidth: '500px',
        height: '250px',
        marginBottom: '40px',
        marginTop: '10px'
      }}>
        <img src="/interviewComplete copy.png" alt="Interview Complete Illustration" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      </div>

      {/* What's Next Section */}
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#2196F3',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: '20px',
          color: 'white'
        }}>
          ✈️
        </div>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#4a4a4a',
          margin: '0 0 15px'
        }}>
          What's Next?
        </h2>
        <p style={{
          fontSize: '16px',
          color: '#666',
          margin: '0 0 10px',
          lineHeight: '1.5'
        }}>
          The recruiter will review your interview responses and will contact you soon regarding the next steps.
        </p>
        <p style={{
          fontSize: '14px',
          color: '#999',
          margin: '0',
          fontStyle: 'italic'
        }}>
          (c) Response within 2-3 business days
        </p>
      </div>

      {/* 3. Display the timer to the user */}
      
    </div>
  );
};

export default InterviewComplete;