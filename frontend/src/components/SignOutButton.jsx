import { useMutation, useQueryClient } from "react-query"
import * as apiClient from "../api-client.js" 
import { useAppContext } from "../contexts/AppContext";

const SignOutButton = ()=>{
    const queryClient = useQueryClient();

    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async()=>{
            await queryClient.invalidateQueries("validateToken");
            showToast({message:"Signed Out",type:"SUCCESS" })

        },
        onError: (error)=>{
            showToast({message:error.message,type:"ERROR" })


        }
    })
    const handleClick = ()=>{
        mutation.mutate();
    }
    return (
        <button onClick={handleClick} className=" text-blue-600 px-3 bg-white font-bold hover:bg-gray-100">Sign Out</button>
    )
}
export default SignOutButton