import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import authRoutes from "./src/routes/auth.js"
import noteRoutes from "./src/routes/notes.route.js"
import { connectDB } from "./src/config/db.js"

const app = express();
app.use(express.json())
dotenv.config()
app.use(cors())



const PORT = process.env.PORT || 5001
const URI = process.env.MONGO_URL
if(!URI){
    console.log("Mongo DB URL is not defined in .env file ")
    process.exit(1)
}
async function db(){
    try{
        await connectDB(URI)
        app.listen(PORT,()=> {console.log(`server running on port ${PORT}`)})

    }
    catch(e){
        console.log("error in mongo db connection :",e)
        process.exit(1)
    }
  
}
db();

app.use("/auth/api",authRoutes)
app.use("/notes/api",noteRoutes)

