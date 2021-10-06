const express = require("express");
const connectDB = require("./config/connectDB")
const app = express();
require('dotenv').config()

// call function that connect with database
connectDB(); 

// middleware to read the json type
app.use(express.json());

//middleware for contact api
app.use("/api/contact", require("./router/contact"))

//server
const PORT = process.env.PORT; 
console.log(PORT)
app.listen(PORT, (err)=> 
   err? console.log(err)
   : console.log("server is running")
);