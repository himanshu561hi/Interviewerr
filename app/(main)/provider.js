

"use client";
import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '@/services/supabaseClient';

export const DashboardContext = createContext(null);

export default function DashboardProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAndCreateUser = async (user) => {
        if (!user) {
            setUserDetails(null);
            setLoading(false);
            return;
        }

        const { data: existingUser, error } = await supabase
            .from("Users")
            .select("*")
            .eq("email", user.email)
            .limit(1)
            .maybeSingle(); // Returns null if no rows, avoids errors
            if (error) {
    console.error('Error fetching user:', error.message, error.details, error.hint);
}

        if (error && error.code !== 'PGRST116') { // Ignore error for no rows found
            console.error('Error fetching user:', error);
            setLoading(false);
            return;
        }

        if (existingUser) {
            // If user exists, set their details
            setUserDetails(existingUser);
            console.log('Existing user data loaded into context:', existingUser);
        } else {
            // If user does not exist, create a new one
            const newUser = {
               id: user.id, // Now works since id is uuid in the table
               name: user.user_metadata?.full_name || 'Unknown', // Fallback for missing metadata
               email: user.email,
               profile_image: user.user_metadata?.avatar_url || null,
               credits: 3 // Add default credits to avoid not-null violation
            };
            const { error: insertError } = await supabase.from('Users').insert(newUser);

            if (insertError) {
                console.error('Error creating new user:', insertError);
            } else {
                setUserDetails(newUser);
                console.log('New user created and loaded into context.');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        // Immediately check for an active session on load
        const getActiveSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            await checkAndCreateUser(session?.user ?? null);
        };
        
        getActiveSession();

        // Listen for future auth changes (login/logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                checkAndCreateUser(session?.user ?? null);
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    const value = { userDetails, loading };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}