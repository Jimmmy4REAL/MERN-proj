import express, { request } from "express"
import {port,mongodbURL}  from "./config.js"
import mongoose from "mongoose";

const app = express();

app.get('/',(reequest,response) =>{
    console.log(request)
    return response.status(200).send("home page")
})
// app.listen(port,() =>{
//     console.log(`app running on port >> ${port}`);
// })
mongoose.connect(mongodbURL)
        .then(()=>{
            console.log('mongodb connected');
            app.listen(port,() =>{
                console.log(`app running on port >> ${port}`);
        });
    })
        .catch((error) => {
            console.log(error);
        });