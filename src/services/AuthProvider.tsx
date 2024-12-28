import React, { createContext, useContext, useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";

interface AuthContextType {
    isLoggedIn: boolean;
    playerId: string;
    login: (playerId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    playerId: "",
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [playerId, setPlayerId] = useState<string>("");
    const navigate = useNavigate();

    // Check for an active session
    useEffect(() => {
        const checkSession = async () => {
            const response = await fetch("http://localhost:8080/api/players/session", { credentials: "include" });

            if(response.ok) {
                setIsLoggedIn(true);
                const data = await response.json();
                setPlayerId(data.playerId);
            }
        };

        checkSession();
    }, []);

    const login = (playerId: string) => {
        setIsLoggedIn(true);
        setPlayerId(playerId);
    };

    const logout = async () => {
        const response = await fetch("http://localhost:8080/api/players/logout", {
            method: "POST",
            credentials: "include",
        });

        if(response.ok) {
            setIsLoggedIn(false);
            setPlayerId("");
            navigate("/");
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, playerId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}