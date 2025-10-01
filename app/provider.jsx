
"use client"
import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/services/supabaseClient';

export const DashboardContext = createContext(null);

export default function DashboardProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkAndCreateUser = async (user) => {
        const { data: existingUser, error: selectError } = await supabase
            .from("Users")
            .select("*")
            .eq("email", user.email)
            .single(); // Use .single() for a cleaner check

        if (selectError && selectError.code !== 'PGRST116') { // Ignore 'no rows found' error
            console.error('Error fetching user:', selectError);
            setLoading(false);
            return;
        }

        if (!existingUser) {
            // User does not exist, create them
            const { data: newUser, error: insertError } = await supabase
                .from('Users')
                .insert([
                    {
                        name: user.user_metadata.full_name,
                        email: user.email,
                        profile_image: user.user_metadata.avatar_url,
                        id: user.id // Also save the auth user ID
                    }
                ])
                .select()
                .single();

            if (insertError) {
                console.error('Error creating new user:', insertError);
            } else {
                setUserDetails(newUser);
                console.log('New user created and loaded into context.');
            }
        } else {
            // User exists, load their data
            setUserDetails(existingUser);
            console.log('Existing user data loaded into context:', existingUser);
        }
        setLoading(false);
    };

    useEffect(() => {
        // 1. Function to check for an existing session on page load
        const getInitialSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                await checkAndCreateUser(session.user);
            } else {
                setLoading(false);
            }
        };

        // 2. Call the function on initial load
        getInitialSession();

        // 3. Listen for future auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    await checkAndCreateUser(session.user);
                } else if (event === 'SIGNED_OUT') {
                    setUserDetails(null);
                }
            }
        );

        return () => subscription.unsubscribe();
    }, []);

    return (
        <DashboardContext.Provider value={{ userDetails, loading }}>
            {children}
        </DashboardContext.Provider>
    );
}