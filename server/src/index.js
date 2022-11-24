import express from "express";
import router from "./router/routes.js";
import cors from "cors"

// Init .env 
import dotenv from "dotenv"
dotenv.config()

const app = express()

app.use(cors())
app.use(router)

app.listen(5000, () => {
	console.log("Running on http://localhost:5000")
})