import { useFormContext } from "react-hook-form"

const DetailsSection = ()=>{
    const {register, formState:{errors} } = useFormContext();
    return (
        <div className = "flex flex-col gap-4 ">
        <h1 className="max-[450px]:ml-2 text-3xl font-bold mb-3">Add Hotel</h1>
        <label className = "max-[450px]:ml-2 text-gray-700 text-sm font-bold flex-1">
                    Name
                    <input className = " border rounded w-full py-1 px-2 font-normal" type = "text" name = "name"{...register("name", {required : "This is a required field"})}></input>
                    {errors.name &&(
                        <span className = "text-red-500">{errors.name.message}</span>
                    )}
            </label>

            <div className="flex gap-4">
            <label className = "max-[450px]:ml-2 text-gray-700 text-sm font-bold flex-1">
                    City
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "text" name = "city"{...register("city", {required : "This is a required field"})}></input>
                    {errors.city &&(
                        <span className = "text-red-500">{errors.city.message}</span>
                    )}
            </label>
            <label className = "text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "text" name = "country"{...register("country", {required : "This is a required field"})}></input>
                    {errors.country &&(
                        <span className = "text-red-500">{errors.country.message}</span>
                    )}
            </label>

            </div>

            <label className = "max-[450px]:ml-2 text-gray-700 text-sm font-bold flex-1">
                    Description
                    <textarea className = "border rounded w-full py-1 px-2 font-normal" rows={10} name = "description"{...register("description", {required : "This is a required field"})}></textarea>
                    {errors.description &&(
                        <span className = "text-red-500">{errors.description.message}</span>
                    )}
            </label>

            <label className = "max-[450px]:ml-2 text-gray-700 text-sm font-bold max-w-[50%]">
                    Price Per Night
                    <input className = "border rounded w-full py-1 px-2 font-normal" type = "number" min={1} name = "pricePerNight"{...register("pricePerNight", {required : "This is a required field"})}></input>
                    {errors.pricePerNight &&(
                        <span className = "text-red-500">{errors.pricePerNight.message}</span>
                    )}
            </label>

            <label className = "max-[450px]:ml-2 text-gray-700 text-sm font-bold max-w-[50%]">
                    Star Rating
                        <select name = "starRating" {...register("starRating", {required : "This is a required field"})} className="border rounded w-full p-2 text-gray-700 font normal">
                            <option value = "" className="text-sm font-bold">
                                Select a Rating
                            </option>
                            {[1,2,3,4,5].map((num, index)=>(
                                <option key={index} value = {num}>{num}</option>
                            ))}
                        </select>
                    {errors.starRating &&(
                        <span className = "text-red-500">{errors.starRating.message}</span>
                    )}
            </label>

            



        </div>
    )
}
export default DetailsSection