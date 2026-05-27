"use client"

import { validateToken } from "@/api/userServer";
import { Context, createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token : string | null;
    isLoggedIn : boolean;
    setIsLoggedIn: (boolean : boolean) => void;
}

interface AuthProviderType {
    children: ReactNode,
    logged : boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}

const AuthProvider = ({ children, logged=false } : AuthProviderType) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(logged);

    const checkToken = async () => {
        try {
            const data = await validateToken();
            setToken(data['accessToken']);
            setIsLoggedIn(true);
        } catch {
            setToken(null);
            setIsLoggedIn(false);
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    return (
        <AuthContext.Provider value={{token, isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export {useAuth, AuthProvider}