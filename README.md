# AI-Powered Visual Publishing Platform

A full-stack web application that lets users turn text prompts into AI-generated images, publish their creations to a community gallery, discover posts through search, and download images.

## Features

- Generate images from text prompts using the Hugging Face Inference API and the `FLUX.1-schnell` model.
- Preview generated images before publishing.
- Publish images with an author name and the original prompt.
- Store image assets in Cloudinary and post metadata in MongoDB.
- Browse a responsive community gallery with lazy-loaded image cards.
- Search published posts by author name or prompt keywords.
- Download published images directly from the gallery.

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Frontend | React, Axios, Material UI, Styled Components |
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| AI generation | Hugging Face Inference API (`FLUX.1-schnell`) |
| Image hosting | Cloudinary |

## Project Structure

```text
IMAGE_GENERATOR/
├── client/                 # React application
│   └── src/
│       ├── components/     # Form, gallery, search, and UI components
│       ├── pages/          # Home and Create Post pages
│       └── api/            # Axios API client
└── server/                 # Express API
    ├── controllers/        # Image generation and post handlers
    ├── models/             # Mongoose post schema
    └── routes/             # API route definitions
```

## Prerequisites

- Node.js 18 or newer
- A MongoDB database
- A Hugging Face access token
- A Cloudinary account

## Environment Variables

Create a `.env` file in the `server` directory:

```env
MONGO_URL=your_mongodb_connection_string
HF_TOKEN=your_hugging_face_access_token
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Never commit this file or its credentials.

## Installation and Running Locally

1. Install server dependencies and start the API:

   ```bash
   cd server
   npm install
   npm start
   ```

   The API runs at `http://localhost:8080`.

2. In another terminal, install client dependencies and start React:

   ```bash
   cd client
   npm install
   npm start
   ```

   The app uses the API base URL `http://localhost:8080/api`.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/generateImage` | Generates an image from a `prompt`. |
| `GET` | `/api/post` | Returns all published posts. |
| `POST` | `/api/post` | Uploads an image to Cloudinary and saves the post. |

### Generate an Image

```json
POST /api/generateImage
{
  "prompt": "A futuristic city at sunset, cinematic lighting"
}
```

### Publish a Post

```json
POST /api/post
{
  "name": "Jane Doe",
  "prompt": "A futuristic city at sunset, cinematic lighting",
  "photo": "data:image/jpeg;base64,..."
}
```

## How It Works

1. A user enters their name and an image prompt.
2. The React client sends the prompt to the Express API.
3. The backend requests an image from Hugging Face and returns it as Base64 data.
4. The user previews the result and chooses to publish it.
5. The backend uploads the image to Cloudinary and saves the author, prompt, and image URL in MongoDB.
6. Published content appears in the searchable community gallery.

## Future Improvements

- Add user authentication and individual profiles.
- Add pagination and server-side search for large galleries.
- Add prompt history, likes, and comments.
- Make the API base URL environment-configurable for production deployments.
