'use client'


import useLoginModal from "@/app/hooks/useLoginModal"
import Modals from "./Modals"
import { useState } from "react"
import CustumButton from "../forms/CustumButton"
import { useRouter } from "next/navigation"
import apiService from "@/app/services/apiServices"
import { handleLogin } from "@/app/lib/actions"


const LoginModal = () => {
    const router=useRouter();
    const [email,setEmail]=useState( '');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState<string[]>([]);
    const LoginModal=useLoginModal();

    const submitLogin = async() =>{
        const formdata={
            email:email,
            password:password
        }

        const response = await apiService.postWithoutToken('/api/auth/login/',JSON.stringify(formdata));

        if(response.access){
            handleLogin(response.user.pk, response.access, response.refresh);

            LoginModal.close();
            router.push("/")
        }
        else{
            const tmpErrors: string[] = Object.values(response).map((error:any) => {
                return error;
            })

            setErrors(tmpErrors);
        }
    }

    const content=(
        <>
            <h2 className="mb-6 text-2xl">Welcome to StayVista, please log in!</h2>
        
            <form action={submitLogin} className="space-y-4">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        onChange={(e)=> setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        onChange={(e)=> setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                {errors.map((error,index)=> {
                    return(
                        <div key={`error_${index}`} className="p-5 bg-stayvista text-white rounded-xl opacity-80 ">{error}</div>
                    )
                })}
                <CustumButton
                    label="Submit"
                    onClick={() => {submitLogin()}} classname={""}/>
            </form>
        </>
    )
  return (
    <Modals
        isopen={LoginModal.isOpen}
        close={LoginModal.close}
        label="Login"
        content={content}
    />
  )
}

export default LoginModal
