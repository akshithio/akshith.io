// @ts-nocheck
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const GITHUB_OWNER = "akshithio";
const GITHUB_REPO = "fonts";
const DEST_DIR = path.join(process.cwd(), "public/fonts");

// Make sure the GitHub token exists
if (!process.env.GITHUB_TOKEN) {
  console.error("Missing GITHUB_TOKEN in environment.");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
  Accept: "application/vnd.github.v3.raw",
};

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

const downloadFonts = async () => {
  console.log("Fetching font list from GitHub...");

  // Get repository tree (recursive)
  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/main?recursive=1`,
    { headers },
  );

  if (!res.ok) {
    console.error(`Failed to fetch repo tree: ${res.status} ${res.statusText}`);
    process.exit(1);
  }

  const data = await res.json();

  const fontFiles = data.tree.filter((f) => f.path.endsWith(".otf"));

  console.log(`Found ${fontFiles.length} font(s).`);

  for (const file of fontFiles) {
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.path}`;
    const destPath = path.join(DEST_DIR, path.basename(file.path));

    console.log(`Downloading ${file.path} → ${destPath}`);

    const fontRes = await fetch(url, { headers });
    if (!fontRes.ok) {
      console.error(`Failed to download ${file.path}: ${fontRes.status}`);
      continue;
    }

    const buffer = await fontRes.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
  }

  console.log("Download complete.");
};

downloadFonts().catch((err) => {
  console.error("Error downloading fonts:", err);
  process.exit(1);
});