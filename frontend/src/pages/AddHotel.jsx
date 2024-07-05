import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api-client.js"
const AddHotel = ()=>{
    const {showToast} = useAppContext();
    const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess :()=>{
            showToast({message : "Hotel Saved", type : "SUCCESS"})
        },
        onError:()=>{
            showToast({message :"Error saving hotel", type:"ERROR"})
        }
    })
    const handleSave = (hotelFormData)=>{
        mutate(hotelFormData)

    }
    return (<ManageHotelForm onSave = {handleSave} isLoading = {isLoading} />)
}
export default AddHotel