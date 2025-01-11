import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { read } from "to-vfile";
import { matter } from "vfile-matter";

export async function GET(request: NextRequest) {
  const searchString = request.nextUrl.searchParams.get("searchString");

  try {
    const directory = "./src/content/";

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

        const matterData = parsedFile.data.matter || parsedFile.data;
        return {
          ...matterData,
          filename: file.replace(".mdx", ""),
        };
      }),
    );

    const filteredRes =
      searchString === "all"
        ? res
        : res.filter((item) => item.filename === searchString);

    return NextResponse.json(filteredRes);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
