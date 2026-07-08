import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, phone, message, rating } = data;

    if (!name || !phone || !message || rating === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Google Sheets via App Script
    // NOTE: This uses a DIFFERENT Google App Script URL designed for the Feedback sheet.
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyLM-sDYHu1tc-C4s1PFWibQ_amShNi1fh_2LlIGEPc80DvMTB312R-WuDNv3eS42S3/exec";
    
    if (scriptUrl) {
      try {
        const res = await fetch(scriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            name,
            phone,
            message,
            rating,
            submittedAt: new Date().toISOString()
          }),
        });
        const resultText = await res.text();
        console.log("Feedback App Script Response:", resultText);
      } catch (scriptError) {
        console.error("Error sending to Feedback App Script:", scriptError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Feedback API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
