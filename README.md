Object Detection Web Application 👁️

A web-based object detection application that uses TensorFlow for
AI-powered object detection, with a JavaScript frontend and
Node.js/Express backend.

🚀 Overview

This project provides a browser-based interface for object detection.
The application combines a frontend built with HTML, CSS, and JavaScript
with a Node.js backend that handles server-side communication and
proxying.

TensorFlow is used as the underlying machine-learning technology for
detecting objects from visual input.

✨ Features

👁️ AI-powered object detection using TensorFlow

🌐 Browser-based interface

🖼️ Visual input and detection results

🎯 Object identification with detection output

⚡ JavaScript-based frontend

🖥️ Node.js and Express backend

🔄 HTTP proxy support for communication with the detection service

🎨 Custom web interface

🛠️ Technology Stack

Frontend

HTML5

CSS3

JavaScript

Backend

Node.js

Express.js 5.1.0

HTTP Proxy Middleware 3.0.5

AI / Computer Vision

TensorFlow

TensorFlow-based object detection model

Package Management

npm

🔄 How It Works

User
  │
  ▼
Web Interface
  │
  ▼
Image / Camera Input
  │
  ▼
JavaScript Frontend
  │
  ▼
Node.js + Express Server
  │
  ▼
TensorFlow Object Detection
  │
  ▼
Detection Results
  │
  ▼
Results Displayed in Browser

📁 Project Structure

Object-Detection/
│
├── images/
│
├── public/
│   ├── bg.png
│   ├── index.html
│   ├── main.html
│   ├── script.js
│   └── style.css
│
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md

⚙️ Installation

1. Clone the repository

git clone https://github.com/prachikandwal01/YOUR-REPOSITORY-NAME.git
cd YOUR-REPOSITORY-NAME

2. Install Node.js dependencies

Make sure Node.js and npm are installed, then run:

npm install

This installs the dependencies defined in package.json, including
Express and HTTP Proxy Middleware.

3. Start the application

npm start

The start script runs:

node server.js

Open the local address displayed by the server in your browser.

🧠 TensorFlow

TensorFlow provides the machine-learning capabilities used by the object
detection component of the project.

The exact TensorFlow model and inference configuration depend on the
implementation used by the application.

🔐 GitHub Safety

Do not commit unnecessary generated dependencies or private
configuration files.

Recommended .gitignore entries:

node_modules/
.env

The node_modules directory can always be recreated with:

npm install

🔮 Future Improvements

Real-time camera-based detection

Object confidence scores

Object counting

Multiple object categories

Real-time object tracking

Custom-trained TensorFlow detection models

Detection history

Improved mobile responsiveness

Cloud deployment

Alert generation for specific detected objects

🎯 Project Goal

The goal of this project is to demonstrate how AI-powered object
detection can be integrated into a web application, connecting a
browser-based user interface with a server-side application and
machine-learning inference.

👩‍💻 Author

Prachi Kandwal

A computer vision and web development project exploring the integration
of TensorFlow-based object detection with modern web technologies.

📄 License

This project is currently intended for educational and personal project
use.
