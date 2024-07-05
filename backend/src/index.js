import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose"
import userRoutes from "./routes/users.js"
import authRoutes from "./routes/auth.js"
import cookieParser from "cookie-parser"
import { cookie } from 'express-validator';
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import {v2 as cloudinary} from "cloudinary"
import myHotelRoutes from "./routes/my-hotels.js"
import hotelRoutes from "./routes/hotels.js"
import bookingRoutes from "./routes/my-bookings.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const source = process.env.MONGODB_CONNECTION_STRING;
// console.log(source)
// console.log(process.env.CLOUDINARY_CLOUD_NAME)

cloudinary.config({
    cloud_name:"dcpvvikum",
    api_key:"311469293849917",
    api_secret:"FjSgx-ZwN7FiSC9m_o5DAQSWBo4",
})

await mongoose.connect("mongodb+srv://yuvrajvarshneymonu:4xz8w8SVhkoaxMpz@cluster0.vvvqpvx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); 
const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cors(
));

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/auth",authRoutes )
app.use("/api/users",userRoutes )
app.use("/api/my-hotels",myHotelRoutes)
app.use("/api/hotels",hotelRoutes)
app.use("/api/my-bookings",bookingRoutes)



app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"))
})
 

app.listen(7000, ()=>{
    console.log("server is running on localhost 7000")
});
