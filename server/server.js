require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const userRouter = require("./router/userRouter");
const profileRouter = require("./router/profileRouter");
const productRouter = require("./router/productRouter");

const app = express();

app.use(cors({
  origin: ["http://localhost:5173", "https://abcd1234.ngrok.io"],
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", userRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", productRouter);

// Serve frontend build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Backend running in dev!"));
}

app.use(errorHandler);

const port = process.env.PORT || 8080;

connectDB()
  .then(() => app.listen(port, () => console.log(`✅ Server running on port ${port}`)))
  .catch(err => {
    console.error("❌ DB connection failed:", err.message);
    process.exit(1);
  });
