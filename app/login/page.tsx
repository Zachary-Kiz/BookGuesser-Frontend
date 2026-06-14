"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Login.module.css"
import FormInput from "@/components/FormInput/FormInput";
import { login } from "@/app/api/userClient";
import { LoginError } from "@/types/user";
import { useAuth } from "@/contexts/AuthProvider";

export default function Login() {

    const { setIsLoggedIn } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<LoginError>({
        "username": "",
        "password" : "",
        "exists" : ""
    });

    const router = useRouter();

    const handleSubmit = async () => {
        let errorTest : LoginError = {
            "username": "",
            "password" : "",
            "exists" : ""
        }

        if (!username) errorTest.username = "Please enter a username";
        if (!password) errorTest.password = "Please enter a password";

        const allValuesEmpty : boolean = Object.values(errorTest).every(value => !value);

        if (!allValuesEmpty) {
            setError(errorTest)
            return;
        }

        try {
            const success : boolean = await login(username, password);
            if (success) {
                setIsLoggedIn(true);
                router.replace(`/profile`)
            }
        } catch (e : any) {
            errorTest.exists = e.message;
            setError(errorTest);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBackground}>
                <div className="text-5xl">Login</div>
                {error.exists && <div>*{error.exists}</div>}
                <FormInput setValue={setUsername} error={error.username} label="Enter Username:"></FormInput>
                <FormInput setValue={setPassword} error={error.password} label="Enter Password"></FormInput>
                <button className={styles.loginSubmit} onClick={() => handleSubmit()}>Submit</button>
            </div>
        </div>
    )
}