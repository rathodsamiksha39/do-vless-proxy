import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();

// ✅ Your active VLESS backend
const target = "https://india.satishcdn.com";

app.use(
  "/",
  createProxyMiddleware({
    target,
    changeOrigin: true,
    ws: true,
    secure: false,
    headers: {
      "X-Forwarded-For": "india.satishcdn.com",
      Host: "india.satishcdn.com",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/118.0",
    },
    onProxyReq(proxyReq) {
      proxyReq.setHeader("Connection", "keep-alive");
    },
  })
);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Reverse proxy running on port ${port}`);
});
