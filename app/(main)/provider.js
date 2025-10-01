
// "use client"
// import React, { useEffect, useState, createContext, useContext } from 'react';
// import { supabase } from '@/services/supabaseClient';

// export const DashboardContext = createContext(null);

// export default function DashboardProvider({ children }) {
//     const [userDetails, setUserDetails] = useState(null);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const { data: { subscription } } = supabase.auth.onAuthStateChange(
//             (event, session) => {
//                 if (event === 'SIGNED_IN' && session) {
//                     checkAndCreateUser(session.user);
//                 } else if (event === 'SIGNED_OUT') {
//                     setUserDetails(null);
//                     setLoading(false);
//                 }
//             }
//         );
//         return () => subscription.unsubscribe();
//     }, []);

//     const checkAndCreateUser = async (user) => {
//         const { data: Users, error: selectError } = await supabase
//             .from("Users")
//             .select("*")
//             .eq("email", user.email);

//         if (selectError) {
//             console.error('Error fetching user:', selectError);
//             setLoading(false);
//             return;
//         }

//         if (Users.length === 0) {
//             const { data, error: insertError } = await supabase
//                 .from('Users')
//                 .insert([
//                     {
//                         name: user.user_metadata.full_name,
//                         email: user.email,
//                         profile_image: user.user_metadata.avatar_url
//                     }
//                 ]);
//             if (insertError) {
//                 console.error('Error creating new user:', insertError);
//             } else {
//                 console.log('New user created successfully.');
//             }
//             setUserDetails({
//                 name: user.user_metadata.full_name,
//                 profile_image: user.user_metadata.avatar_url,
//             });
//         } else {
//             setUserDetails(Users[0]);
//             console.log('User data loaded into context:', Users[0]);
//         }
//         setLoading(false);
//     };

//     return (
//         <DashboardContext.Provider value={{ userDetails, loading }}>
//             {children}
//         </DashboardContext.Provider>
//     );
// }



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
            .single(); // .single() is better for fetching one record

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
                name: user.user_metadata?.full_name,
                email: user.email,
                profile_image: user.user_metadata?.avatar_url,
                id: user.id // Also store the auth user id
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