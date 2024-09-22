'use client'

import Modals from "./Modals"
import { useRouter } from "next/navigation"
import { useState } from "react"
import CustumButton from "../forms/CustumButton"
import useSignupModal from "@/app/hooks/useSignupModal"
import apiService from "@/app/services/apiServices"
import { handleLogin } from "@/app/lib/actions"

const SignupModal = () => {
    const router=useRouter();
    const [email,setEmail]=useState('');
    const [password1,setPassword1]=useState('');
    const [password2,setPassword2]=useState('');
    const [errors,setErrors]=useState<string[]>([]);
    const SignupModal=useSignupModal();

    const submitSignup=async()=>{
        const formdata={
            email:email,
            password1:password1,
            password2:password2
        }

        const response = await apiService.postWithoutToken('/api/auth/register/',JSON.stringify(formdata));

        if(response.access){
            handleLogin(response.user.pk, response.access, response.refresh);

            SignupModal.close();
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
            <h2 className="mb-6 text-2xl">Welcome to StayVista, please Sign up!!</h2>
        
            <form action={submitSignup} className="space-y-4">
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
                        onChange={(e)=> setPassword1(e.target.value)}
                        type="password"
                        id="password1"
                        name="password1"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Repeat Password
                    </label>
                    <input
                        onChange={(e)=> setPassword2(e.target.value)}
                        type="password"
                        id="password2"
                        name="password2"
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
                    onClick={() => {submitSignup()}} classname={""}/>
            </form>
        </>
    )
  return (
    <Modals
        isopen={SignupModal.isOpen}
        close={SignupModal.close}
        label="Signup"
        content={content}
    />
  )
}

export default SignupModal
