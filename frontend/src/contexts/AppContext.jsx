import React ,{useContext, useState} from "react"
import Toast from "../components/Toast"
import { useQuery } from "react-query"
import * as apiClient from "../api-client.js"
import { loadStripe } from "@stripe/stripe-js"; 

const STRIPE_PUB_KEY = "pk_test_51PZEcSRsmDbZH9hIizRYu97Kg2EDoBVjoDGkZbLIf0velbVSnZuCaFZUbKPitLWTOoZ2AHI2ROs1lmLDcDworRUs00Q4tU51Rm"

const AppContext = React.createContext(undefined)

const stripePromise = loadStripe(STRIPE_PUB_KEY);


export const AppContextProvider = ({children})=>{

    const [toast, setToast] = useState(undefined)
    const {isError} = useQuery("validateToken", apiClient.validateToken,{
            retry : false
    })

    return (
        <AppContext.Provider value = {{
            showToast:(toastMessage)=>{
                setToast(toastMessage)
                // console.log(toastMessage)
            },
            isLoggedIn : !isError,
            stripePromise
        }}>
        {toast && <Toast  message = {toast.message} type = {toast.type} onClose = {()=>{setToast(undefined)}}/>}
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = ()=>{
    const context = useContext(AppContext)
    return context 
}