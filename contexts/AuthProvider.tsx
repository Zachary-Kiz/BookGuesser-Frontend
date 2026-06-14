"use client"

import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(logged);

    return (
        <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export {useAuth, AuthProvider}