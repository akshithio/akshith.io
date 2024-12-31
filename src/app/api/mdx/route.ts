import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { read } from "to-vfile";
import { matter } from "vfile-matter";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchString = searchParams.get("searchString");
    const directory = "./src/mdx/";

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
        return {
          matter: parsedFile.data, // Adjust based on actual front matter structure
          contents: String(parsedFile),
        };
      }),
    );

    if (searchString === "all") {
      return NextResponse.json(res);
    }

    const foundFile = res.find((file) => file.matter.url === searchString);

    if (foundFile) {
      return NextResponse.json(foundFile);
    } else {
      return NextResponse.json(
        { error: "No such file found" },
        { status: 404 },
      );
    }
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
