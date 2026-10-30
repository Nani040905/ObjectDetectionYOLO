# YOLOv8 Object Detection Web Application

A full-stack, real-time object detection web application. The application utilizes a React frontend, a Node.js API gateway backend, and a specialized Python microservice running YOLOv8 (Ultralytics) for image and video inference.

---

## 📁 Repository Structure

```
ObjectDetectionYOLO/
├── client/                  # React + Vite frontend
│   ├── src/                 # UI components and API handlers
│   └── package.json
│
├── server/                  # Node.js + Express API gateway/orchestrator
│   ├── routes/              # Routing logic
│   ├── server.js            # App entry point
│   └── package.json
│
└── yolo-service/            # Python Flask + YOLOv8 inference service
    ├── detect.py            # Flask app & YOLO detection logic
    └── requirements.txt     # Python package dependencies
```

---

## 🧰 Tech Stack

- **Frontend**: React (Vite), TailwindCSS, Axios
- **API Gateway**: Node.js, Express, Socket.io
- **AI Inference**: Python, Flask, YOLOv8 (Ultralytics), OpenCV, PyTorch
- **Runtime Env**: Tested on Node.js v24.12.0 and Python 3.10 / 3.11 / 3.12

---

## 🚀 Setup & Installation

### 1. Python YOLO Service Setup
1. Navigate to the `yolo-service` directory:
   ```bash
   cd yolo-service
   ```
2. Create and activate a Python virtual environment (e.g., Python 3.10):
   ```bash
   python -m venv venv
   # On Windows:
   venv\Scripts\activate
   ```
3. Install PyTorch with CUDA support (if GPU is available, optional but recommended for performance):
   ```bash
   pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
   ```
4. Install other dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Run the Flask YOLO service:
   ```bash
   python detect.py
   ```
   *(Running by default on `http://127.0.0.1:5000`)*

### 2. Node.js Backend Setup
1. Navigate to the `server` directory:
   ```bash
   cd ../server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Navigate to the `client` directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *(Access frontend via `http://localhost:5173`)*
