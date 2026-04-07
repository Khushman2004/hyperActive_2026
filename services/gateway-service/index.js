import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createProxyMiddleware } from "http-proxy-middleware";

dotenv.config();

const app = express();

app.use(cors());
// app.use(express.json());

// 🔁 Forward auth requests to auth service
app.use(
    "/auth",
    createProxyMiddleware({
        target: "http://localhost:5001",
        changeOrigin: true,
        pathRewrite: {
            "^/auth": "", // remove /auth before forwarding
        },
    })
);

// app.use((req, res, next) => {
//     console.log("Gateway received:", req.method, req.url);
//     next();
// });

// test route
// app.get("/", (req, res) => {
//     res.send("Gateway running 🚀");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Gateway running on port ${PORT}`);
});