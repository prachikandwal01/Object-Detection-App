// server.js
// Run: npm install express http-proxy-middleware
// Then: node server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Serve static files (index.html lives in ./public)
app.use(express.static("public"));

// Proxy for phone IP camera
// Set your phone IP Webcam base address here:
const PHONE_BASE = process.env.PHONE_BASE || "http://192.168.1.5:8080";

app.use(
  "/ipcam",
  createProxyMiddleware({
    target: PHONE_BASE,
    changeOrigin: true,
    pathRewrite: { "^/ipcam": "" },
    onProxyRes(res) {
      res.headers["Access-Control-Allow-Origin"] = "*";
    },
  })
);

app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});