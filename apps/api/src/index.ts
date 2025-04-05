import express from "express";
import prisma from "@repo/database/client";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", async (req, res) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: process.env.EMAIL,
      },
    });

    res.status(200).json({
      message: "ok",
      existingUser,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      message: "Failed to retrieve user information",
    });
  }
});

app.listen(3002, () => {
  console.log("Server running on PORT", 3002);
});
