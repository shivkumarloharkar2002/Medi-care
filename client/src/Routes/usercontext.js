// import React, { createContext, useState, useEffect } from 'react';

// // Create a context
// export const UserContext = createContext();

// // Create a provider component
// export const UserProvider = ({ children }) => {
//     const [user, setUser] = useState(null); // Store user data here
//     const [loading, setLoading] = useState(true); // Add loading state

//     useEffect(() => {
//         // Fetch user data from an API or localStorage
//         const fetchUserData = async () => {
//             // Example: get user data from localStorage or an API
//             try {
//                 const storedUser = JSON.parse(localStorage.getItem('user'));
//                 console.log("UserContext",storedUser)
//                 if (storedUser) {
//                     setUser(storedUser);
//                 }
//             }
//             catch (e) {
//                 console.error("Failed to load user data", e);
//             }finally{
//                 setLoading(false); // Set loading to false after fetching
//             }
//         }
//         fetchUserData();
//     }, []);

//     return (
//         <UserContext.Provider value={{ user, loading, }}>
//             {children}
//         </UserContext.Provider>
//     );
// };

import React, { createContext, useState, useEffect } from 'react';

// Create a context
export const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user data here
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Fetch user data from an API or localStorage
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem('user');
                // console.log("Raw stored user:", storedUser);
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                    console.log("Parsed user data:", JSON.parse(storedUser));
                }
            } catch (e) {
                console.error("Failed to load user data", e);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{ user, loading }}>
            {console.log("user ",user)}
            {children}
        </UserContext.Provider>
    );
};
