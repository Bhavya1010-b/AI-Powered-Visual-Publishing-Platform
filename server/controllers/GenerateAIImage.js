import * as dotenv from "dotenv";
import { HfInference } from "@huggingface/inference";
import { createError } from "../error.js";

dotenv.config();

// Initialize the official Hugging Face SDK
const hf = new HfInference(process.env.HF_TOKEN);

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required."));
    }

    console.log("Generating image with HF SDK for prompt:", prompt);

    // Call the model using the official SDK wrapper
    const responseBlob = await hf.textToImage({
      model: "black-forest-labs/FLUX.1-schnell",
      inputs: prompt,
    });

    // Convert the raw response Blob to a buffer
    const arrayBuffer = await responseBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert to Base64 string for the frontend
    const base64Image = buffer.toString("base64");

    return res.status(200).json({
      success: true,
      photo: base64Image,
    });

  } catch (error) {
    // FORCE NODE TO PRINT THE HIDDEN CAUSE OF THE NETWORKING ISSUE
    console.error("--- GENAI CONTROLLER ERROR ---");
    console.error("Message:", error.message);
    console.error("System Cause:", error.cause || "No underlying system cause attached");
    console.dir(error);
    console.error("------------------------------");

    next(createError(500, error.message || "Failed to generate image."));
  }
};