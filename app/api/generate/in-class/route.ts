import { Groq } from "groq-sdk";
import { marked } from "marked";
import chromium from "@sparticuz/chromium";
import { NextResponse } from "next/server";
import { generateInClassDoc } from "@/app/_prompts/inClass";
import { prisma } from "@/lib/prisma";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

export async function POST(req: Request) {
  try {
    const { topic, filename, difficulty } = await req.json();

    // Generate Prompt
    const prompt = generateInClassDoc({ topic, difficulty });

    // Get Markdown response from Groq
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile", // or your preferred one
      messages: [{ role: "user", content: prompt }],
    });

    const markdown = response.choices[0]?.message?.content?.trim();

    if (!markdown) {
      return NextResponse.json(
        { error: "No content generated" },
        { status: 400 }
      );
    }

    // Convert markdown to HTML
    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 40px;
              font-size: 14px;
              color: #222;
            }
            h3 {
              font-size: 18px;
              margin-top: 24px;
              color: #2c3e50;
            }
            ul {
              margin-left: 20px;
              list-style: disc;
            }
            li {
              margin: 6px 0;
            }
            p {
              margin: 10px 0;
            }
            strong {
              font-weight: bold;
            }
            em {
              font-style: italic;
            }
            pre {
              background: #f5f5f5;
              padding: 10px;
              border-radius: 4px;
              overflow-x: auto;
              font-family: monospace;
            }
          </style>
        </head>
        <body>
          ${marked.parse(markdown)}
        </body>
      </html>
    `;

    const isProduction = process.env.NODE_ENV === "production";

    let puppeteer;
    if (isProduction) {
      puppeteer = (await import("puppeteer-core")).default;
    } else {
      puppeteer = (await import("puppeteer")).default;
    }

    const browser = await puppeteer.launch({
      args: isProduction
        ? [...chromium.args, "--hide-scrollbars", "--disable-web-security"]
        : ["--no-sandbox", "--disable-setuid-sandbox"],
      defaultViewport: isProduction ? chromium.defaultViewport : undefined,
      executablePath: isProduction
        ? await chromium.executablePath()
        : undefined,
      headless: true,
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20mm",
        bottom: "20mm",
        left: "20mm",
        right: "20mm",
      },
    });

    const formData = new FormData();
    formData.append("file", new Blob([pdfBuffer], { type: "application/pdf" }));
    formData.append("upload_preset", process.env.CLOUDINARY_UPLOAD_PRESET!);

    const cloudRes = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const cloudData = await cloudRes.json();
    const fileUrl = cloudData.secure_url;

    await prisma.generatedDocument.create({
      data: {
        topic,
        filename: `${filename}_${topic}_In_Class_File_${new Date()
          .toLocaleString()
          .replace(/[/,: ]/g, "_")}.pdf`,
        type: "in-class",
        difficulty,
        url: fileUrl,
      },
    });

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}_${topic}_In_Class_File_${new Date()
          .toLocaleString()
          .replace(/[/,: ]/g, "_")}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
