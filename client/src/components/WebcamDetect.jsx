import { useRef, useState } from "react"
import Webcam from "react-webcam"
import axios from "axios"

export default function WebcamDetect() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)

  const [running,setRunning] = useState(false)

  const captureFrame = async () => {

    if(!webcamRef.current) return

    const imageSrc = webcamRef.current.getScreenshot()

    const blob = await fetch(imageSrc).then(r => r.blob())

    const formData = new FormData()
    formData.append("image", blob, "frame.jpg")

    const res = await axios.post(
      "http://localhost:5000/detect",
      formData
    )

    drawBoxes(res.data)
  }

  const drawBoxes = (detections) => {

    const video = webcamRef.current.video
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    ctx.clearRect(0,0,canvas.width,canvas.height)

    detections.forEach(det => {

      const [x1,y1,x2,y2] = det.box

      ctx.strokeStyle = "lime"
      ctx.lineWidth = 2
      ctx.strokeRect(x1,y1,x2-x1,y2-y1)

      ctx.fillStyle = "lime"
      ctx.font = "16px Arial"

      ctx.fillText(
        `${det.name} ${(det.confidence*100).toFixed(1)}%`,
        x1,
        y1-5
      )

    })
  }

  const startDetection = () => {

    if(running) return

    setRunning(true)

    intervalRef.current = setInterval(() => {
      captureFrame()
    },1000)

  }
  const clearCanvas = () => {
	  const canvas = canvasRef.current
  	const ctx = canvas.getContext("2d")

  	ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  const stopDetection = () => {

    setRunning(false)

    clearInterval(intervalRef.current)

		clearCanvas()


  }

  return (

    <div className="p-6">

      <div className="space-x-4">

        <button
          onClick={startDetection}
          className="bg-green-500 text-white px-4 py-2"
        >
          Start Detection
        </button>

        <button
          onClick={stopDetection}
          className="bg-red-500 text-white px-4 py-2"
        >
          Stop Detection
        </button>

      </div>

      <div className="relative mt-6">

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
        />

        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0"
        />

      </div>

    </div>
  )
}