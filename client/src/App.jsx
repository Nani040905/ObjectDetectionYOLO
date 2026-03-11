import Upload from "./components/Upload"
import WebcamDetect from "./components/WebcamDetect"

function App() {

  return (

    <div>

      <h1 className="text-2xl text-center mt-10">
        YOLO Object Detection
      </h1>

      <Upload/>

      <WebcamDetect/>

    </div>

  )
}

export default App