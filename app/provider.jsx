// "use client"
// import React, { useState } from 'react';
// import { supabase } from '@/services/supabaseClient';

// function Provider({ children }) {

//     useEffect(() => {
//         createNewUser();
//     }, [])

//     const createNewUser = () => {
//         supabase.auth.getUser.then(async({data: {user}}) => {
//         // check if user data exists in local storage
//         let { data: Users, error } = await supabase
//             .from("Users")
//             .select("*")
//             .eq("email", user?.email);
//         console.log(Users); 
        

//         //if not, create a new user object
//         if(user?.length == 0){
//             const { data, error } = await supabase.from("Users")
//             .insert([
//                 {
//                     name:user?.user_metadata?.full_name,
//                     email:user?.email,
//                     avatar:user?.user_metadata?.avatar_url
//                 }
//             ])
//             console.log(data);
//         }
        
//     };
//     return (
//         <div>{children}</div>
        
//     )
// }
// };

"use client";
import React, { useEffect } from 'react';
import { supabase } from '@/services/supabaseClient';

function Provider({ children }) {
    useEffect(() => {
        const createNewUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            
            if (user) {
                // Check if user data exists in the 'Users' table
                const { data: users, error } = await supabase
                    .from("Users")
                    .select("*")
                    .eq("email", user.email);
    
                if (error) {
                    console.error("Error fetching user data:", error);
                    return;
                }
    
                console.log("Existing users with this email:", users); 
    
                // If no user found, create a new one
                if (!users || users.length === 0) {
                    const { data, error: insertError } = await supabase.from("Users")
                        .insert([
                            {
                                name: user.user_metadata?.full_name,
                                email: user.email,
                                avatar: user.user_metadata?.avatar_url
                            }
                        ])
                        .select(); // Use .select() to return the newly created data
    
                    if (insertError) {
                        console.error("Error creating new user:", insertError);
                    } else {
                        console.log("New user created:", data);
                    }
                }
            }
        };

        createNewUser();
    }, []);

    return (
        <div>{children}</div>
    );
}

export default Provider;