import { useState, useRef } from "react"
import axios from "axios"

export default function Upload() {

  const [image, setImage] = useState(null)
  const [detections, setDetections] = useState([])

  const imgRef = useRef(null)
  const canvasRef = useRef(null)

  const handleUpload = async () => {

    const formData = new FormData()
    formData.append("image", image)

    const res = await axios.post(
      "http://localhost:5000/detect",
      formData
    )

    setDetections(res.data)

    setTimeout(drawBoxes,100)
  }

  const drawBoxes = () => {

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const img = imgRef.current

    canvas.width = img.width
    canvas.height = img.height

    ctx.clearRect(0,0,canvas.width,canvas.height)

    detections.forEach(det => {

      const [x1,y1,x2,y2] = det.box

      ctx.strokeStyle = "red"
      ctx.lineWidth = 2
      ctx.strokeRect(x1,y1,x2-x1,y2-y1)

      ctx.fillStyle = "red"
      ctx.font = "16px Arial"

      ctx.fillText(
        `${det.name} ${(det.confidence*100).toFixed(1)}%`,
        x1,
        y1-5
      )

    })
  }

  return (
    <div className="p-6">

      <input
        type="file"
        onChange={(e)=>setImage(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 ml-3"
      >
        Detect
      </button>

      {image && (
        <div className="relative mt-6">

          <img
            ref={imgRef}
            src={URL.createObjectURL(image)}
            alt=""
          />

          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0"
          />

        </div>
      )}

    </div>
  )
}