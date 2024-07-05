import { useFormContext } from "react-hook-form"

const ImagesSection = ()=>{
    const {register, formState: {errors},watch, setValue} = useFormContext();

    const existingImageUrls = watch("imageUrls")

    const handleDelete = (event , imageUrl)=>{
        event.preventDefault()
        setValue("imageUrls", 
        existingImageUrls.filter((url)=> url !==imageUrl)
        )

    }

    return (
        <div>
            <h2 className="max-[450px]:ml-2 text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
            {existingImageUrls && (
                <div className="grid grid-cols-6 gap-4">
                    {existingImageUrls.map((url, index)=>(
                        <div key={index} className="relative group">
                            <img src={url}  className="min-h-full object-cover  "/>
                            <button 
                            onClick={(event) => handleDelete(event, url)}
                            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white">Delete</button>
                        </div>

                    ))}
                </div>
            )}
                <input className="w-full text-gray-700 font-normal" type = "file" multiple accept="image/*" name = "imageFiles" {...register("imageFiles", {
                   validate : (imageFiles)=>{
                    const totalLength = imageFiles.length + (existingImageUrls?.length || 0);
                    if(totalLength === 0){
                        return "At least one image should be added"
                    }
                    if(totalLength > 6)
                    {
                        return "Total number of images cannot be more than 6"
                    }
                    return true;
                   }
                })}></input>
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>
            )}
        </div>

    )
}
export default ImagesSection