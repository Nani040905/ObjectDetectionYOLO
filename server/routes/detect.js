import axios from "axios"
import FormData from "form-data"
import fs from "fs"

export const detect = async (req, res) => {

    const form = new FormData()
    form.append("image", fs.createReadStream(req.file.path))

    const response = await axios.post(
        "http://localhost:5001/detect",
        form,
        { headers: form.getHeaders() }
    )

    res.json(response.data)
}