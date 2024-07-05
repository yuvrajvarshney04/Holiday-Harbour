import React from 'react'
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient} from "react-query"
import * as apiClient from "../api-client.js"
import { useAppContext } from '../contexts/AppContext'
import { useNavigate, Link, useLocation } from "react-router-dom"

const SignIn = ()=>{
    const navigate  = useNavigate();
    const {showToast} = useAppContext()
    const queryClient =useQueryClient();

    const location = useLocation()

    const {register, formState:{errors}, handleSubmit} = useForm();
    const mutation = useMutation(apiClient.signIn,{
        onSuccess:async ()=>{
            console.log("success")
           showToast({message:"Sign In successfull",type:"SUCCESS" })
           await queryClient.invalidateQueries("validateToken")
           navigate(location.state?.from?.pathname || "/");
        },
        onError:(error)=>{
            console.log(error);
            showToast({message:error.message,type:"ERROR" })
        
        }
    })
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data)

    })
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className = "text-3xl font-bold"> Sign In</h2>

        <label className = "text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "email" name = "email"{...register("email", {required : "This is a required field"})}></input>
                    {errors.email &&(
                        <span className = "text-red-500">{errors.email.message}</span>
                    )}
            </label>
            <label className = "text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "password" name = "password"{...register("password", 
                    {required : "This field is required",
                    minLength:{value:6,message : "Password must be at least 6 characters"}
                    })}></input>
                    {errors.password &&(
                        <span className = "text-red-500">{errors.password.message}</span>
                    )}
            </label>
            <span className="flex items-center justify-between"> 
                <span className="text-sm">
                    Not Registered? <Link className='underline' to="/register">Create an account here</Link>
                </span>
                <button type = "submit" className = "bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Log In
                </button>
            </span>

        </form>

    )
}
export default SignIn