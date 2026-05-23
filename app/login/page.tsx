"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./Login.module.css"
import FormInput from "@/components/FormInput/FormInput";
import { login } from "@/api/user";
import { LoginError } from "@/types/user";

export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<LoginError>({
        "username": "",
        "password" : "",
    });

    const router = useRouter();

    const handleSubmit = async () => {
        let errorTest : LoginError = {
            "username": "",
            "password" : "",
        }

        if (!username) errorTest.username = "Please enter a username";
        if (!password) errorTest.password = "Please enter a password";

        const allValuesEmpty : boolean = Object.values(errorTest).every(value => !value);
        setError(errorTest)
        if (!allValuesEmpty) return;

        const success : boolean = await login(username, password);
        if (success) router.replace("/profile")

    }

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBackground}>
                <div className="text-5xl">Login</div>
                <FormInput setValue={setUsername} error={error.username} label="Enter Username:"></FormInput>
                <FormInput setValue={setPassword} error={error.password} label="Enter Password"></FormInput>
                <button className={styles.loginSubmit} onClick={() => handleSubmit()}>Submit</button>
            </div>
        </div>
    )
}