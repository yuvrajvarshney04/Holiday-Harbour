import { useFormContext } from "react-hook-form"

const GuestsSection = ()=>{
    const {register, formState : {errors}} = useFormContext();
    return (
        <div>
           <h2 className="max-[450px]:ml-2 text-2xl font-bold mb-3 ">Guests</h2>
           <div className="grid grid-cols-2 p-6 gap-5 bg-gray-300">
            <label className="text-gray-700 text-sm font-semibold">
                 Adults
                 <input className="border rounded w-full py-2 px-3 font-normal" name = "adultCount" type = "number" min = {1}
                 {...register("adultCount",{
                    required:"This field is required",
                 })}
                 ></input>
                   {errors.adultCount && (
                <span className="text-red-500 text-sm font-bold">{errors.adultCount.message}</span>
            )}
            </label>

            <label className="text-gray-700 text-sm font-semibold">
                 Children
                 <input className="border rounded w-full py-2 px-3 font-normal" name = "childCount" type = "number" min = {0}
                 {...register("childCount",{
                    required:"This field is required",
                 })}
                 ></input>
                   {errors.childCount && (
                <span className="text-red-500 text-sm font-bold">{errors.childCount.message}</span>
            )}
            </label>
          
           </div> 
        </div>

    )
} 
export default GuestsSection