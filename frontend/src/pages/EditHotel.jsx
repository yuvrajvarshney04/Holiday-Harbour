import React from 'react'
import {useParams} from "react-router-dom"
import {useMutation, useQuery} from "react-query"
import * as apiClient from "../api-client.js"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm.jsx"
import { useAppContext } from '../contexts/AppContext.jsx'

const EditHotel = () => {
    const {hotelId} = useParams()
    const {showToast} = useAppContext()
   
    const {data : hotel} = useQuery("fetchMyHotelById", ()=>
        apiClient.fetchMyHotelById(hotelId),{
            enabled: !!hotelId
        }
    )
   

    const {mutate,  isLoading} = useMutation(apiClient.updateMyHotelById, {
      onSuccess: ()=>{
        showToast({message :"Hotel Saved!", type:"SUCCESS"})
      },
      onError: ()=>{
        showToast({message :"Error Saving Hotel", type:"ERROR"})

      }
    })

    const handleSave = (hotelFormData) =>{
      mutate(hotelFormData)

    }

  return (
    
    <ManageHotelForm hotel ={hotel} onSave = {handleSave} isLoading = {isLoading} />
  )
}

export default EditHotel
