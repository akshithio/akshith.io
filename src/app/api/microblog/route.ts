import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { read } from "to-vfile";
import { matter } from "vfile-matter";

export async function GET(request: NextRequest) {
  try {
    const directory = "./src/content/";

    // Ensure the directory exists
    if (!fs.existsSync(directory)) {
      return NextResponse.json(
        { error: "Directory not found" },
        { status: 404 },
      );
    }

    const files = fs.readdirSync(directory);

    const res = await Promise.all(
      files.map(async (file) => {
        const filePath = `${directory}${file}`;
        const parsedFile = await read(filePath);
        matter(parsedFile, { strip: true });

        // Extract just the matter data and flatten it
        const matterData = parsedFile.data.matter || parsedFile.data;

        return {
          ...matterData,
        };
      }),
    );

    return NextResponse.json(res);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
