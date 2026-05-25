"use client"

import { validateToken } from "@/api/user";
import { Context, createContext, useContext, useEffect, useState } from "react";

interface AuthContextType {
    token : string | null;
    isLoggedIn : boolean
}

const AuthContext = createContext<AuthContextType | null>(null);

const useAuth = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return authContext;
}

const AuthProvider : React.FC<{children : React.ReactNode}> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
        <AuthContext.Provider value={{token, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export {useAuth, AuthProvider}