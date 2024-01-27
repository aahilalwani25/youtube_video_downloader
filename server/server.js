import express from "express";
import dotenv from "dotenv"; // Import dotenv
import bodyParser from "body-parser";
import authRouter from "./routers/authRouter.js"

dotenv.config() // Load environment variables from .env file
const PORT= process.env.PORT || 5000;

const app = express()
// !important! 
// you need to install the following libraries |express|[dotenv > if required]
// or run this command >> npm i express dotenv 

app.use(bodyParser.json());

app.use('/connect',)

//localhost:8000/signup/(any route)
app.use('/signup/',authRouter);

app.listen(PORT , ()=> console.log('> Server is up and running on port : ' + PORT))