import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, contact, persons, date, time, occasion } = data;

    if (!name || !email || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Save to Google Sheets via App Script
    const scriptUrl = "https://script.google.com/macros/s/AKfycbzkL5yzl1ySzGot74-RknB-GanCUVqqPWeZO6kYjjHl7m9QeUx3CpffgHm94oI4MI9J/exec";

    if (scriptUrl) {
      try {
        const res = await fetch(scriptUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify({
            name,
            email,
            contact,
            persons,
            date,
            time,
            occasion,
            submittedAt: new Date().toISOString()
          }),
        });
        const resultText = await res.text();
        console.log("App Script Response:", resultText);
      } catch (scriptError) {
        console.error("Error sending to App Script:", scriptError);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
