import { FormProvider, useForm } from "react-hook-form"
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import { useEffect } from "react";

const ManageHotelForm = (props) =>{
    const hotel = props.hotel
    // console.log(hotel)
    const formMethods = useForm();
    const {handleSubmit, reset} = formMethods;
    useEffect(()=>{
        
        reset(hotel)
    },[props.hotel, reset])
    const onSubmit = handleSubmit((formDataJson)=>{

        // console.log(formData)
        const formData = new FormData()

        if(props.hotel){
            formData.append("hotelId",props.hotel._id)
        }

        formData.append("name", formDataJson.name)
        formData.append("city", formDataJson.city)
        formData.append("country", formDataJson.country)
        formData.append("description", formDataJson.description)
        formData.append("type", formDataJson.type)
        formData.append("pricePerNight", formDataJson.pricePerNight.toString())
        formData.append("starRating", formDataJson.starRating.toString())
        formData.append("adultCount", formDataJson.adultCount.toString())
        formData.append("childCount", formDataJson.childCount.toString())
        formDataJson.facilities.forEach((facility, index)=>{
            formData.append(`facilities[${index}]`,facility)

        })

        if(formDataJson.imageUrls){
            formDataJson.imageUrls.forEach((url, index)=>{
                formData.append(`imageUrls[${index}]`, url)
            })
        }

        Array.from(formDataJson.imageFiles).forEach((imageFile=>{
            formData.append(`imageFiles`, imageFile)
        }))


        props.onSave(formData)
      
    })


    return (
        <FormProvider {...formMethods}>
             <form onSubmit={onSubmit} className="flex flex-col gap-10">
                <DetailsSection />
                <TypeSection/>
                <FacilitiesSection />
                <GuestsSection />
                <ImagesSection />
                <span className="flex justify-end">
                    <button disabled={props.isLoading}
                     className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500" 
                     type = "submit">
                     {props.isLoading ?"Saving..." :"Save"}
                     </button>
                </span>

             </form>
        </FormProvider>
       
    )
}
export default ManageHotelForm