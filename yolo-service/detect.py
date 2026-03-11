from flask import Flask, request, jsonify
from ultralytics import YOLO
from PIL import Image

app = Flask(__name__)

model = YOLO("yolov8m.pt")

CONF_THRESHOLD = 0.5

@app.route('/detect', methods=['POST'])
def detect():

    file = request.files['image']
    img = Image.open(file)

    results = model(img, imgsz=640)

    detections = []

    for r in results:
        for box in r.boxes:

            conf = float(box.conf)

            if conf < CONF_THRESHOLD:
                continue

            class_id = int(box.cls)
            class_name = model.names[class_id]

            x1, y1, x2, y2 = box.xyxy[0].tolist()

            detections.append({
                "name": class_name,
                "confidence": conf,
                "box": [x1, y1, x2, y2]
            })

    return jsonify(detections)

if __name__ == "__main__":
    app.run(port=5001)