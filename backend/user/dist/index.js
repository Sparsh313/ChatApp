import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { createClient } from "redis";
dotenv.config();
const app = express();
// Create Redis client
export const redisClient = createClient({
    url: process.env.REDIS_URL,
});
// Connect Redis
redisClient
    .connect()
    .then(() => console.log("Redis connected"))
    .catch((err) => console.error("Redis error:", err));
// ROUTES
import userRoutes from "./routes/user.js";
import { connectRabbitMQ } from "./config/rabbitmq.js";
app.use("api/user", userRoutes);
// DATABASE
connectDB();
// RABBITMQ
connectRabbitMQ();
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Running on port number ${port}`);
});
//# sourceMappingURL=index.js.map