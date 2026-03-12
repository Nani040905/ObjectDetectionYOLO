import { useRef, useEffect } from "react"
import Webcam from "react-webcam"
import { io } from "socket.io-client"

const socket = io("http://localhost:5001")

export default function WebcamDetect() {

  const webcamRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {

    socket.on("detections", drawBoxes)

    return () => socket.off("detections")

  }, [])


  const captureFrame = () => {

    const imageSrc = webcamRef.current.getScreenshot()

    socket.emit("frame", { image: imageSrc })
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
      ctx.fillText(det.name, x1, y1-5)

    })

  }

  useEffect(() => {

    const interval = setInterval(captureFrame, 800)

    return () => clearInterval(interval)

  }, [])


  return (

    <div className="relative">

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
      />

    </div>

  )

}