import { getUser, validateToken } from "@/api/userServer"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function Profile() {

    const {user} = await getUser();
    if (!user) redirect("/login")
    
    return (
        <div>
            {user ? user : "Profiles coming soon!"}
        </div>
    )
}