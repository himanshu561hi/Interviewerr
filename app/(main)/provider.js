
"use client"
import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/services/supabaseClient';

export const DashboardContext = createContext(null);

export default function DashboardProvider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    checkAndCreateUser(session.user);
                } else if (event === 'SIGNED_OUT') {
                    setUserDetails(null);
                    setLoading(false);
                }
            }
        );
        return () => subscription.unsubscribe();
    }, []);

    const checkAndCreateUser = async (user) => {
        const { data: Users, error: selectError } = await supabase
            .from("Users")
            .select("*")
            .eq("email", user.email);

        if (selectError) {
            console.error('Error fetching user:', selectError);
            setLoading(false);
            return;
        }

        if (Users.length === 0) {
            const { data, error: insertError } = await supabase
                .from('Users')
                .insert([
                    {
                        name: user.user_metadata.full_name,
                        email: user.email,
                        profile_image: user.user_metadata.avatar_url
                    }
                ]);
            if (insertError) {
                console.error('Error creating new user:', insertError);
            } else {
                console.log('New user created successfully.');
            }
            setUserDetails({
                name: user.user_metadata.full_name,
                profile_image: user.user_metadata.avatar_url,
            });
        } else {
            setUserDetails(Users[0]);
            console.log('User data loaded into context:', Users[0]);
        }
        setLoading(false);
    };

    return (
        <DashboardContext.Provider value={{ userDetails, loading }}>
            {children}
        </DashboardContext.Provider>
    );
}