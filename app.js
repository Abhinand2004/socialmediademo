import express from "express"
import Router from "./router.js"
import connection from "./connnection.js"
import path from "path"
import dotenv from "dotenv"
dotenv.config()
const port=3008;

const app=express()
app.use(express.static('frontend'))
app.use (express.json({limit:"100mb"}))
app.use('/api',Router)

// Connect to the database and start the server
connection().then(() => {
    app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
    });
}).catch((error) => {
    console.log(error);
});
