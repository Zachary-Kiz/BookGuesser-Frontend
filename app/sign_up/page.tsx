"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./SignUp.module.css"
import FormInput from "@/components/FormInput/FormInput";
import { registerAccount } from "@/api/user";
import { SignUpError } from "@/types/user";

export default function SignUp() {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [rePass, setRePass] = useState<string>("");

    const [error, setError] = useState<SignUpError>({
        "username": "",
        "email" : "",
        "password" : "",
        "rePass" : ""
    });

    const router = useRouter();

    const handleSubmit = async () => {
        let errorTest : SignUpError = {
            "username": "",
            "email" : "",
            "password" : "",
            "rePass" : ""
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) errorTest.email = "Please enter an email";
        if (!username) errorTest.username = "Please enter a username";
        if (!password) errorTest.password = "Please enter a password";
        if (!rePass) errorTest.rePass = "Please re-enter password";
        if (password !== rePass) errorTest.password = "Passwords do not match";

        const allValuesEmpty : boolean = Object.values(errorTest).every(value => !value);
        setError(errorTest)
        if (!allValuesEmpty) return;

        const success : boolean = await registerAccount(username, email, password);
        if (success) router.replace("/profile")

    }

    return (
        <div className={styles.signContainer}>
            <div className={styles.signBackground}>
                <div className="text-5xl">Sign Up</div>
                <FormInput setValue={setEmail} error={error.email} label="Enter Email:"></FormInput>
                <FormInput setValue={setUsername} error={error.username} label="Enter Username:"></FormInput>
                <FormInput setValue={setPassword} error={error.password} label="Enter Password"></FormInput>
                <FormInput setValue={setRePass} error={error.rePass} label="Re-enter Password"></FormInput>
                <button className={styles.signSubmit} onClick={() => handleSubmit()}>Submit</button>
            </div>
        </div>
    )
}