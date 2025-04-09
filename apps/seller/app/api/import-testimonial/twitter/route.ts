import { NextResponse } from "next/server";
import { getTweet } from "react-tweet/api";

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const statusId = url.split("/status/")[1];
    const tweet = await getTweet(statusId);

    return NextResponse.json({ data: tweet }, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to import your tweet, try again later",
      },
      { status: 400 },
    );
  }
}
