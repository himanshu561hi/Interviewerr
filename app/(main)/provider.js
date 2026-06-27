

"use client";
import React, { useEffect, useState, createContext } from 'react';
import { supabase } from '@/services/supabaseClient';

export const DashboardContext = createContext(null);

export default function DashboardProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentUserEmail, setCurrentUserEmail] = useState(null);

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

        let finalUser = null;
        if (existingUser) {
            finalUser = existingUser;
            console.log('Existing user data loaded into context:', existingUser);
        } else {
            const newUser = {
               id: user.id,
               name: user.user_metadata?.full_name || 'Unknown',
               email: user.email,
               profile_image: user.user_metadata?.avatar_url || null,
               credits: 5,       // Free credits
               totalCredits: 5,  // For displaying X/5 or X/20+
               plan: 'free',     // 'free' | 'basic'
            };
            const { error: insertError } = await supabase.from('Users').insert(newUser);

            if (insertError) {
                console.error('Error creating new user:', insertError);
            } else {
                finalUser = newUser;
                console.log('New user created and loaded into context.');
            }
        }

        // Add isAdmin flag
        if (finalUser) {
            const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
            const isAdmin = adminEmails.split(',').map(e => e.trim().toLowerCase()).includes(finalUser.email.toLowerCase());
            finalUser.isAdmin = isAdmin;
            setUserDetails(finalUser);
        } else {
            setUserDetails(null);
        }

        setCurrentUserEmail(user?.email || null);
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

    // Refresh user details from DB (call this after credit deduction)
    const refreshUser = async () => {
        if (!currentUserEmail) return;
        const { data } = await supabase
            .from('Users')
            .select('*')
            .eq('email', currentUserEmail)
            .maybeSingle();
        if (data) {
            const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS || '';
            data.isAdmin = adminEmails.split(',').map(e => e.trim().toLowerCase()).includes(data.email.toLowerCase());
            setUserDetails(data);
        }
    };

    const value = { userDetails, loading, refreshUser };

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}