import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // This should be the same URL as the Feedback Script
    const scriptUrl = "https://script.google.com/macros/s/AKfycbyLM-sDYHu1tc-C4s1PFWibQ_amShNi1fh_2LlIGEPc80DvMTB312R-WuDNv3eS42S3/exec";
    
    if (!scriptUrl || scriptUrl.includes("YOUR_FEEDBACK_SCRIPT_URL_HERE")) {
      return NextResponse.json({ error: "Feedback script URL not configured" }, { status: 500 });
    }

    // Call the Google App Script endpoint
    // The script must have a doGet(e) function that returns JSON array of feedback
    const response = await fetch(scriptUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Using no-store to prevent aggressive caching if new feedback comes in
      cache: 'no-store' 
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from Google Script: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Testimonial fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}
