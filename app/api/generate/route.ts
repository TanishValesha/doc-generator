// import { Groq } from "groq-sdk";
// import { NextResponse } from "next/server";

// // Initialize Groq securely on the server
// const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// export async function POST(req: Request) {
//   try {
//     const { prompt } = await req.json();

//     const response = await groq.chat.completions.create({
//       model: "llama-3.3-70b-versatile",
//       messages: [{ role: "user", content: prompt }],
//     });

//     return NextResponse.json({
//       success: true,
//       data: response.choices[0]?.message?.content,
//     });
//   } catch (error) {
//     console.error("Groq API Error:", error);
//     return NextResponse.json(
//       { success: false, error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { Groq } from "groq-sdk";
import { marked } from "marked";
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

interface PromptInput {
  topic: string;
}

function generatePreClassDoc({ topic }: PromptInput): string {
  return `Generate a comprehensive pre-class document on the topic: ${topic}

## Formatting Requirements
Use proper Markdown syntax throughout:
- **###** for section headings
- **Bold text** for key terms and important concepts
- _Italics_ for emphasis and definitions
- **-** for bulleted lists with proper indentation
- Standard paragraph formatting with appropriate line spacing
- Code blocks if technical content is involved

## Content Structure & Requirements

### 1. Introduction (100-150 words)
...

**Output only the final Markdown document - no meta-commentary or explanations.**`;
}

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    // Generate Prompt
    const prompt = generatePreClassDoc({ topic });

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

    const browser = await puppeteer.launch();
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

    await browser.close();

    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${topic}-preclass.pdf"`,
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
