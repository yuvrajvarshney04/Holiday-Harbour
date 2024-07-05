
import express from "express";
import { check, validationResult , body} from "express-validator";
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 100 * 1024 * 1024,
    }
});

router.post("/", verifyToken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),
    body("image").notEmpty().withMessage("Image is required"),
], upload.array("imageFiles", 6), async (req,res) => {
    try {
        const imageFiles = req.files;
        const newHotel = req.body;
        const imagePublicIds = [];

        const uploadPromises = imageFiles.map(async (image) => {
            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const uploadResult = await cloudinary.v2.uploader.upload(dataURI);
            imagePublicIds.push(uploadResult.public_id);
        });

        await Promise.all(uploadPromises);
        newHotel.imageUrls = imagePublicIds.map(publicId => {
            return cloudinary.v2.url(publicId);
        });

        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        const emptyBookingArray = [];
        hotel.bookings = emptyBookingArray
        await hotel.save();
        res.status(201).send(hotel);
    } catch (e) {
        console.log("Error creating hotel: ", e);
        res.status(500).json({message: "Something went wrong"});
    }
});

router.get("/", verifyToken, async(req,res)=>{
    try{
        const hotels = await Hotel.find({userId : req.userId})
    res.json(hotels)
    }
    catch(error) {
        res.status(500).json({message : "Error fetching hotels"})
    }
    
})

router.get("/:id", verifyToken, async(req, res)=>{
    const id = req.params.id.toString();
    try
    {
        const hotel = await Hotel.findOne({
            _id : id, 
            userId : req.userId
        })

        res.json(hotel)
    }
    catch(error)
    {
        res.status(500).json({message : "Error fetching hotels"})
    }
})

router.put("/:hotelId", verifyToken, upload.array("imageFiles"), async(req,res)=>{
    try{
       
        const updatedHotel = req.body

        
        updatedHotel.lastUpdated  = new Date()
        const hotel = await Hotel.findOne({ _id: req.params.hotelId, userId: req.userId });
        
    

       if(!hotel)
       {
        res.status(404).json({message : "Hotel not found"})

       }
       hotel.name = updatedHotel.name
       hotel.city = updatedHotel.city
       hotel.country = updatedHotel.country
       hotel.description = updatedHotel.description
       hotel.type = updatedHotel.type
       hotel.adultCount = updatedHotel.adultCount
       hotel.childCount = updatedHotel.childCount
       hotel.facilities = updatedHotel.facilities
       hotel.starRating = updatedHotel.starRating
       hotel.lastUpdated = updatedHotel.lastUpdated
       
    

       
       const files = req.files

       const imagePublicIds = [];

       const uploadPromises = files.map(async (image) => {
           const b64 = Buffer.from(image.buffer).toString("base64");
           let dataURI = "data:" + image.mimetype + ";base64," + b64;
           const uploadResult = await cloudinary.v2.uploader.upload(dataURI);
           imagePublicIds.push(uploadResult.public_id);
       });

     

       await Promise.all(uploadPromises);
       
       const array =  imagePublicIds.map(publicId => {
           return cloudinary.v2.url(publicId);
       });
    //    updatedHotel.imageUrls = [...updatedHotel.imageUrls || [], array]
       hotel.imageUrls = [...array, ...(updatedHotel.imageUrls || [])]

       await hotel.save()

       res.status(201).json(hotel)


    }
    catch(error){
        res.status(500).json({message : "Something went wrong"})
    }
} )





export default router;
