import express from "express"
import multer from "multer"
import cors from "cors"
import { detect } from './routes/detect.js'

const app = express()

app.use(cors())

const upload = multer({ dest: "uploads/" })

app.post("/detect", upload.single("image"), detect)

app.listen(5000, () => {
    console.log("Server running on 5000")
})