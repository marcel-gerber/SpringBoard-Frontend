import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({ isLoggedIn: false, login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check for an active session
    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch("http://localhost:8080/api/players/session", { credentials: "include" });
            setIsLoggedIn(response.ok);
        };

        checkSession();
    }, []);

    const login = () => setIsLoggedIn(true);
    const logout = async () => {
        await fetch("http://localhost:8080/api/players/logout", {
            method: "POST",
            credentials: "include",
        });
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}