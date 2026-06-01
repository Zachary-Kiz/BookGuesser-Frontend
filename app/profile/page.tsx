import { getUser, validateToken } from "@/api/userServer"
import { redirect } from "next/navigation";


export default async function Profile() {

    const user = await getUser();
    if (!user) redirect("/login")
    const username = user['user']
    
    return (
        <div>
            {user ? username : "Profiles coming soon!"}
        </div>
    )
}