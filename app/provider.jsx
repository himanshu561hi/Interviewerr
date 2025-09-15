"use client"
import React, { useEffect, useState, createContext, useContext } from 'react';
import { supabase } from '@/services/supabaseClient';

export const UserDetailContext = createContext(null);

function Provider({ children }) {
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    // console.log("User signed in:", session.user);
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
            // अगर user database में नहीं है, तो उसे insert करें
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
        } else {
            console.log('User already exists in database.');
        }

        setUserDetails(user); 
        setLoading(false);
    };

    return (
        <UserDetailContext.Provider value={{ userDetails, loading }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    );
}

export default Provider;


export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
};