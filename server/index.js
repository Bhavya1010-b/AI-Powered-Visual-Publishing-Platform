import cors from "cors";
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import PostRouter from "./routes/Posts.js";
import GenerateImageRouter from "./routes/GenerateImage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = report_server_config() || express();

function report_server_config() {
  return express();
}

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

app.use("/api/post", PostRouter);
app.use("/api/generateImage", GenerateImageRouter);

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*all", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
  });
} else {
  // Default get for local API testing
  app.get("/", async (req, res) => {
    res.status(200).json({
      message: "Hello GFG Developers!",
    });
  });
}

//function to connect to mongodb
const connectDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => {
      console.error("Failed to connect to DB");
      console.error(err);
    });
};

const PORT = process.env.PORT || 8080;

//function to start the server
const startServer = async () => {
  try {
    connectDB();
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};

startServer();