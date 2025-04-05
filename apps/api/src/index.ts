import express from "express";
import multer from "multer";
import multerS3 from "multer-s3";
import cors from "cors";
import { S3Client } from "@aws-sdk/client-s3";
import prisma from "@repo/database/client";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  },
});

// Set up Express app
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3002;

// Configure Multer to use S3 for storage

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME!,
    key: function (req, file, cb) {
      const uniqueNumber = Date.now().toString();
      file.filename = uniqueNumber;
      let extArray = file.mimetype.split("/");
      let extension = extArray[extArray.length - 1];
      cb(null, `videos/${file.fieldname}-${uniqueNumber}.${extension}`);
    },
  }),
});

// Endpoint to upload video
app.post("/upload-video", upload.single("video"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No video file uploaded" });
    return;
  }

  try {
    const updatedReview = await prisma.review.update({
      where: { id: req.body.reference_id },
      data: {
        videoUrl:
          `${process.env.AWS_CLOUDFRONT_URL}/${req.file.fieldname}-${req.file.filename}/${req.file.fieldname}-${req.file.filename}.m3u8`,
      },
    });

    console.log("Database updated successfully:", updatedReview);
    res.json({
      message: "Video uploaded and database updated successfully",
    });
  } catch (error) {
    console.error("Error updating database:", error);
    res.status(500).send("Error updating database");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
