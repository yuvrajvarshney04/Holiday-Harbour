import {useForm} from "react-hook-form"
import React from 'react'
import { useMutation, useQueryClient} from "react-query"
import * as apiClient from "../api-client.js"
import { useAppContext } from "../contexts/AppContext.jsx"
import { useNavigate } from "react-router-dom"
const Register = ()=>{
    const queryClient = useQueryClient();
    const navigate  = useNavigate();

    const {showToast} = useAppContext();

    const { register, handleSubmit, formState:{errors}, watch} = useForm();

    const mutation = useMutation(apiClient.register,{
        onSuccess: async()=>{
           showToast({message:"Registration successfull",type:"SUCCESS" })
           await queryClient.invalidateQueries("validateToken")
           navigate("/");
        },
        onError:(error)=>{
            console.log(error);
            showToast({message:error.message,type:"ERROR" })
           
            
        }
    })

    const onSubmit = handleSubmit(async (data)=>{
        mutation.mutate(data)
       
    })
    return (
        <form onSubmit = {onSubmit} className = "flex flex-col gap-5">
            <h2 className = "text-3xl font-bold">Create an Account</h2>
            <div className = "flex flex-col md:flex-row gap-5">
                <label className = "text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "text" name = "firstName" {...register("firstName", {required : "This is a required field"})}>

                    </input>
                    {errors.firstName &&(
                        <span className = "text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label className = "text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "text" name = "lastName"{...register("lastName", {required : "This is a required field"})}>

                    </input>
                    {errors.lastName &&(
                        <span className = "text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>
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
            <label className = "text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "password" name = "confirm_password"{...register("confirm_password", 
                    {
                       validate:(val)=>{
                        if(!val){
                            return "This field is required"
                        }
                        else if(watch("password") !==val){
                            return "Your passwords do not match";

                        }
                       }
                    })}></input>
                    {errors.confirm_password &&(
                        <span className = "text-red-500">{errors.confirm_password.message}</span>
                    )}
            </label>
            <span>
                <button type = "submit" className = "bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>

        </form>
    )
}
export default Register