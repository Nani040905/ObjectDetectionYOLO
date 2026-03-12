from flask import Flask
from flask_socketio import SocketIO, emit
from ultralytics import YOLO
from PIL import Image
import base64
import io
import torch

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

device = "cuda" if torch.cuda.is_available() else "cpu"
model = YOLO("yolov8s.pt").to(device)

CONF_THRESHOLD = 0.5


@socketio.on("frame")
def handle_frame(data):

    image_data = data["image"].split(",")[1]
    img_bytes = base64.b64decode(image_data)

    img = Image.open(io.BytesIO(img_bytes))

    results = model(img, imgsz=640, device=device, half=True)

    detections = []

    for r in results:
        for box in r.boxes:

            conf = float(box.conf)

            if conf < CONF_THRESHOLD:
                continue

            class_id = int(box.cls)
            name = model.names[class_id]

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "name": name,
                "confidence": conf,
                "box": [x1, y1, x2, y2]
            })

    emit("detections", detections)


if __name__ == "__main__":
    socketio.run(app, port=5001)