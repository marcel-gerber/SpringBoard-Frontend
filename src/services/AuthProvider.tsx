import React, { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext({ isLoggedIn: false, login: () => {}, logout: () => {} });

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

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
        const response = await fetch("http://localhost:8080/api/players/logout", {
            method: "POST",
            credentials: "include",
        });

        if(response.ok) {
            navigate("/");
            setIsLoggedIn(false);
        }
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