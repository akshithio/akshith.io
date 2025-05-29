// @ts-nocheck
import { Storage } from "@google-cloud/storage";
import fs from "fs";
import path from "path";

console.log("Authenticating with GCP...");

const creds = JSON.parse(process.env.FONT_ACCESS_GCP);
const storage = new Storage({ credentials: creds });

const bucketName = "akshithio-fonts";
const destDir = path.join(process.cwd(), "public/fonts");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const downloadFonts = async () => {
  console.log("Downloading fonts...");

  const [files] = await storage.bucket(bucketName).getFiles({ prefix: "" });

  for (const file of files) {
    if (!file.name.endsWith(".woff2")) continue;

    const destPath = path.join(destDir, path.basename(file.name));
    console.log(`Downloading ${file.name} → ${destPath}`);
    await file.download({ destination: destPath });
  }

  console.log("Download complete.");
};

downloadFonts().catch((err) => {
  console.error("Error during font download:", err);
  process.exit(1);
});
