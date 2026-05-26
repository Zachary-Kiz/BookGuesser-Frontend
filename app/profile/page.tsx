import { getUser, validateToken } from "@/api/user"
import { redirect } from "next/navigation";


export default async function Profile() {

    const user = await getUser()
    console.log(user)
    
    return (
        <div>
            Profiles coming soon!
        </div>
    )
}