'use client'

import { useRouter } from "next/navigation"
import { resetAuthCookies } from "../lib/actions"
import MenuLink from "./navbar/MenuLink"

const LogoutButton: React.FC = () => {
    const router = useRouter();

    // The submitLogout function remains async
    const submitLogout = async () => {
        console.log("logouting");
        resetAuthCookies();  // Clear auth cookies
        console.log("logout");
        router.push('/');    // Redirect to homepage
    };

    return (
        <MenuLink 
            label="Log out" 
            onclick={() => {
                submitLogout();  // Call the async function inside the click handler
            }}  
        />
    );
};

export default LogoutButton;
