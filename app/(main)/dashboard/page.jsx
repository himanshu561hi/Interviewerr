import React from 'react';

export default function Dashboard({ children }) {
    return (
        <div>
            <h1>Dashboard Page</h1>
            {children}
        </div>
    );
}