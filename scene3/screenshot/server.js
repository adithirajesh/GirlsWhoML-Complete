
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors()); // allows all origins
app.use(express.json());

// Handle screenshot upload
app.post("/upload", upload.single("file"), (req, res) => {
  console.log("📸 Received screenshot!");
  console.log("File:", req.file?.originalname);
  console.log("Timestamp:", req.body.timestamp);
  console.log("Total Users:", req.body.totalUsers);

  // Rename file for readability
  const newPath = path.join("uploads", req.file.originalname || `screenshot_${Date.now()}.png`);
  fs.renameSync(req.file.path, newPath);

  res.json({ message: "Screenshot received", file: newPath });
});

// Just a health check
app.get("/", (req, res) => res.send("Server running ✅"));

app.listen(3000, () => console.log("🚀 Server ready on http://localhost:3000"));
