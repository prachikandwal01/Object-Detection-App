const video = document.getElementById("webcam");
const ipImg = document.getElementById("ipImage");
const canvas = document.getElementById("phoneCanvas");
const ctx = canvas.getContext("2d");
const alertDiv = document.getElementById("alert");
const connectBtn = document.getElementById("connectBtn");
const phoneUrlInput = document.getElementById("phoneUrl");

let mode = "laptop";
let stream = null;
let modelPromise = cocoSsd.load();

// speech + cooldown
let lastMessage = "";
let lastSpokenTime = 0;
const cooldown = 3000;
let framesSinceLastDetection = 0;
const disappearFrames = 5;

async function detectLoop() {
    const model = await modelPromise;

    let inputEl = null;
    if (mode === "laptop" && video.readyState >= 2) {
        inputEl = video;
    } else if (mode === "phone" && ipImg.naturalWidth > 0) {
        ctx.drawImage(ipImg, 0, 0, canvas.width, canvas.height);
        inputEl = canvas;
    }

    if (inputEl) {
        const predictions = await model.detect(inputEl);
        handlePredictions(predictions);
    } else {
        framesSinceLastDetection++;
        if (framesSinceLastDetection >= disappearFrames) {
            alertDiv.innerText = "";
            lastMessage = "";
        }
    }

    requestAnimationFrame(detectLoop);
}

function handlePredictions(predictions) {
    const messages = [];
    for (const pred of predictions) {
        if (pred.score > 0.75) {
            switch (pred.class) {
                case "person": messages.push("person ahead"); break;
                case "bottle": messages.push("bottle ahead"); break;
                case "chair": messages.push("chair ahead"); break;
                default: messages.push(pred.class + " ahead");
            }
        }
    }

    const now = Date.now();
    if (messages.length > 0) {
        framesSinceLastDetection = 0;
        const messageText = messages.join(", ");
        if (messageText !== lastMessage || now - lastSpokenTime > cooldown) {
            alertDiv.innerText = messageText;
            const synth = window.speechSynthesis;
            synth.cancel();
            synth.speak(new SpeechSynthesisUtterance(messageText));
            lastMessage = messageText;
            lastSpokenTime = now;
        }
    } else {
        framesSinceLastDetection++;
        if (framesSinceLastDetection >= disappearFrames) {
            alertDiv.innerText = "";
            lastMessage = "";
        }
    }
}

async function startLaptopCam() {
    stopCurrent();
    mode = "laptop";
    canvas.style.display = "none";
    video.style.display = "block";
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
    } catch (e) {
        console.error("Laptop cam error:", e);
        alert("Cannot access laptop webcam.");
    }
}

async function startPhoneCam(baseUrl) {
    stopCurrent();
    mode = "phone";
    video.style.display = "none";
    canvas.style.display = "block";
    ipImg.src = "/ipcam/videofeed"; // proxied via server.js
}

function stopCurrent() {
    if (stream) {
        stream.getTracks().forEach(t => t.stop());
        stream = null;
    }
    video.srcObject = null;
    lastMessage = "";
    alertDiv.innerText = "";
}

connectBtn.addEventListener("click", () => {
    const selected = document.querySelector('input[name="source"]:checked').value;
    if (selected === "laptop") {
        startLaptopCam();
    } else {
        const url = phoneUrlInput.value.trim();
        if (!/^https?:\/\//.test(url)) {
            alert("Enter phone address like: http://192.168.1.77:8080");
            return;
        }
        startPhoneCam(url);
    }
});

startLaptopCam();
detectLoop();