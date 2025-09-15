
"use client"
import React, { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';

function Provider({ children }) {
    useEffect(() => {
     
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_IN' && session) {
                    console.log("User signed in:", session.user);
                    checkAndCreateUser(session.user);
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
        } else {
            console.log('User already exists in database.');
        }
    };

    return (
        <div>{children}</div>
    );
}
export default Provider;