require("dotenv").config(); // Load environment variables first
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

// Import routers
const userRouter = require("./router/userRouter");
const profileRouter = require("./router/profileRouter");
const productRouter = require("./router/productRouter");

const app = express();

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000"], // Update for production domains if needed
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/v1", userRouter);
app.use("/api/v1", profileRouter);
app.use("/api/v1", productRouter);

// Serve React frontend
const clientBuildPath = path.join(__dirname, "../client/dist"); // Vite build output
if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Backend server is running in development mode!");
  });
}

// Error handler middleware
app.use(errorHandler);

// Start server after DB connects
const port = process.env.PORT || 8080; // Set 8080 for deployment
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`✅ Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
