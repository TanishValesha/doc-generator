"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import ReactMarkdown from "react-markdown";
import { generatePreClassDoc } from "./_prompts/preClass";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [loading, setLoading] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const generateDocument = async () => {
    setLoading(true);
    const desiredPrompt = generatePreClassDoc({ topic });
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: desiredPrompt }),
    });
    const data = await res.json();
    console.log("Response from backend:", data.data);

    setMarkdown(data.data); // should return markdown from backend
    setLoading(false);
  };

  // const downloadPDF = () => {
  //   if (!contentRef.current) return;

  //   const doc = new jsPDF();
  //   doc.html(contentRef.current, {
  //     callback: () => doc.save("pre-class-document.pdf"),
  //     margin: [10, 10, 10, 10],
  //     x: 10,
  //     y: 10,
  //     html2canvas: { scale: 0.8 },
  //   });
  // };

  // const downloadPDF = () => {
  //   if (!contentRef.current) return;

  //   const doc = new jsPDF({
  //     orientation: "portrait",
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   doc.html(contentRef.current, {
  //     callback: function (doc) {
  //       doc.save("pre-class-document.pdf");
  //     },
  //     margin: [20, 20, 20, 20], // top, left, bottom, right
  //     autoPaging: "text",
  //     html2canvas: {
  //       scale: 1,
  //       useCORS: true,
  //     },
  //     x: 10,
  //     y: 10,
  //     width: 180, // max printable width on A4 paper with padding
  //   });
  // };

  // const downloadPDF = () => {
  //   const doc = new jsPDF({
  //     unit: "mm",
  //     format: "a4",
  //   });

  //   let y = 20;
  //   const marginLeft = 15;
  //   const maxWidth = 180;
  //   const lineHeight = 7;

  //   // Helper function to check for new page
  //   const checkNewPage = (requiredHeight = 15) => {
  //     if (y + requiredHeight > 280) {
  //       doc.addPage();
  //       y = 20;
  //     }
  //   };

  //   // Enhanced function to render text with bold, italic, and code formatting
  //   const renderStyledText = (text, x, startY, options = {}) => {
  //     const { fontSize = 12, indent = 0, isBold = false } = options;

  //     doc.setFontSize(fontSize);

  //     // Regex to match **bold**, _italic_, and `code`
  //     const regex = /(\*\*([^*]+)\*\*)|(_([^_]+)_)|(`([^`]+)`)/g;

  //     let cursorX = x + indent;
  //     let cursorY = startY;
  //     let lastIndex = 0;
  //     let match;

  //     // Process text with inline formatting
  //     while ((match = regex.exec(text)) !== null) {
  //       // Render normal text before the match
  //       if (match.index > lastIndex) {
  //         const normalText = text.substring(lastIndex, match.index);
  //         if (normalText) {
  //           doc.setFont("helvetica", isBold ? "bold" : "normal");
  //           const splitText = doc.splitTextToSize(
  //             normalText,
  //             maxWidth - (cursorX - x)
  //           );
  //           splitText.forEach((line, i) => {
  //             if (i > 0) {
  //               cursorY += lineHeight;
  //               cursorX = x + indent;
  //               checkNewPage();
  //             }
  //             doc.text(line, cursorX, cursorY);
  //             if (i === splitText.length - 1) {
  //               cursorX += doc.getTextWidth(line);
  //             }
  //           });
  //         }
  //       }

  //       // Handle styled text
  //       let styledText = "";
  //       let fontStyle = "normal";
  //       let isCode = false;

  //       if (match[1]) {
  //         // **bold**
  //         styledText = match[2];
  //         fontStyle = "bold";
  //       } else if (match[3]) {
  //         // _italic_
  //         styledText = match[4];
  //         fontStyle = "italic";
  //       } else if (match[5]) {
  //         // `code`
  //         styledText = match[6];
  //         fontStyle = "normal";
  //         isCode = true;
  //       }

  //       if (styledText) {
  //         // Add background for code
  //         if (isCode) {
  //           const textWidth = doc.getTextWidth(styledText);
  //           doc.setFillColor(240, 240, 240);
  //           doc.rect(
  //             cursorX - 1,
  //             cursorY - fontSize * 0.7,
  //             textWidth + 2,
  //             fontSize + 1,
  //             "F"
  //           );
  //         }

  //         doc.setFont("helvetica", fontStyle);
  //         doc.text(styledText, cursorX, cursorY);
  //         cursorX += doc.getTextWidth(styledText);
  //       }

  //       lastIndex = regex.lastIndex;
  //     }

  //     // Render remaining normal text
  //     if (lastIndex < text.length) {
  //       const normalText = text.substring(lastIndex);
  //       if (normalText) {
  //         doc.setFont("helvetica", isBold ? "bold" : "normal");
  //         const splitText = doc.splitTextToSize(
  //           normalText,
  //           maxWidth - (cursorX - x)
  //         );
  //         splitText.forEach((line, i) => {
  //           if (i > 0) {
  //             cursorY += lineHeight;
  //             cursorX = x + indent;
  //             checkNewPage();
  //           }
  //           doc.text(line, cursorX, cursorY);
  //         });
  //       }
  //     }

  //     return cursorY + lineHeight;
  //   };

  //   // Function to render bullet points with nesting
  //   const renderBulletPoint = (text, level = 0) => {
  //     const bullets = ["•", "◦", "▪"];
  //     const indents = [0, 10, 20];

  //     const bullet = bullets[Math.min(level, bullets.length - 1)];
  //     const indent = indents[Math.min(level, indents.length - 1)];

  //     checkNewPage();

  //     // Render bullet
  //     doc.setFont("helvetica", "normal");
  //     doc.setFontSize(12);
  //     doc.text(bullet, marginLeft + indent, y);

  //     // Render bullet text
  //     y = renderStyledText(text, marginLeft + indent + 6, y);
  //     y += 2;
  //   };

  //   // Function to render code blocks
  //   const renderCodeBlock = (code) => {
  //     checkNewPage(30);

  //     // Background
  //     const lines = code.split("\n");
  //     const blockHeight = lines.length * 5 + 6;
  //     doc.setFillColor(245, 245, 245);
  //     doc.rect(marginLeft, y - 3, maxWidth, blockHeight, "F");

  //     // Border
  //     doc.setDrawColor(200, 200, 200);
  //     doc.setLineWidth(0.5);
  //     doc.rect(marginLeft, y - 3, maxWidth, blockHeight);

  //     // Code text
  //     doc.setFont("courier", "normal");
  //     doc.setFontSize(10);
  //     lines.forEach((line) => {
  //       doc.text(line, marginLeft + 3, y);
  //       y += 5;
  //     });

  //     y += 8;
  //   };

  //   // Parse markdown
  //   const lines = markdown.split("\n");
  //   let inCodeBlock = false;
  //   let codeContent = "";

  //   lines.forEach((line) => {
  //     const trimmedLine = line.trim();

  //     // Handle code blocks
  //     if (trimmedLine.startsWith("```")) {
  //       if (!inCodeBlock) {
  //         inCodeBlock = true;
  //         codeContent = "";
  //       } else {
  //         inCodeBlock = false;
  //         renderCodeBlock(codeContent);
  //         codeContent = "";
  //       }
  //       return;
  //     }

  //     if (inCodeBlock) {
  //       codeContent += line + "\n";
  //       return;
  //     }

  //     // Handle different markdown elements
  //     if (trimmedLine.startsWith("# ")) {
  //       checkNewPage(20);
  //       doc.setFont("helvetica", "bold");
  //       doc.setFontSize(18);
  //       doc.setTextColor(41, 128, 185); // Blue color
  //       doc.text(trimmedLine.substring(2), marginLeft, y);
  //       y += 12;

  //       // Add underline
  //       doc.setDrawColor(41, 128, 185);
  //       doc.setLineWidth(0.8);
  //       doc.line(marginLeft, y, marginLeft + maxWidth, y);
  //       y += 8;
  //     } else if (trimmedLine.startsWith("## ")) {
  //       checkNewPage(15);
  //       doc.setFont("helvetica", "bold");
  //       doc.setFontSize(16);
  //       doc.setTextColor(52, 73, 94); // Dark gray
  //       doc.text(trimmedLine.substring(3), marginLeft, y);
  //       y += 10;
  //     } else if (trimmedLine.startsWith("### ")) {
  //       checkNewPage(12);
  //       doc.setFont("helvetica", "bold");
  //       doc.setFontSize(14);
  //       doc.setTextColor(52, 73, 94);
  //       doc.text(trimmedLine.substring(4), marginLeft, y);
  //       y += 8;
  //     } else if (trimmedLine.startsWith("#### ")) {
  //       checkNewPage(10);
  //       doc.setFont("helvetica", "bold");
  //       doc.setFontSize(12);
  //       doc.setTextColor(44, 62, 80);
  //       doc.text(trimmedLine.substring(5), marginLeft, y);
  //       y += 7;
  //     } else if (trimmedLine.match(/^(\s*)[-*+]\s/)) {
  //       // Handle nested bullet points
  //       const match = trimmedLine.match(/^(\s*)[-*+]\s(.*)$/);
  //       if (match) {
  //         const indentLevel = Math.floor(match[1].length / 2);
  //         const content = match[2];
  //         renderBulletPoint(content, indentLevel);
  //       }
  //     } else if (trimmedLine.match(/^\d+\.\s/)) {
  //       // Numbered lists
  //       const content = trimmedLine.replace(/^\d+\.\s/, "");
  //       const number = trimmedLine.match(/^(\d+)\./)[1];

  //       checkNewPage();
  //       doc.setFont("helvetica", "bold");
  //       doc.setFontSize(12);
  //       doc.setTextColor(41, 128, 185);
  //       doc.text(number + ".", marginLeft, y);

  //       doc.setTextColor(44, 62, 80); // Reset color
  //       y = renderStyledText(content, marginLeft + 12, y);
  //       y += 3;
  //     } else if (trimmedLine.startsWith("> ")) {
  //       // Blockquotes
  //       checkNewPage(15);
  //       const quoteText = trimmedLine.substring(2);

  //       // Quote border
  //       doc.setDrawColor(231, 76, 60); // Red
  //       doc.setLineWidth(2);
  //       doc.line(marginLeft, y - 3, marginLeft, y + 10);

  //       doc.setTextColor(100, 100, 100);
  //       y = renderStyledText(quoteText, marginLeft + 8, y, { fontSize: 11 });
  //       y += 5;
  //     } else if (trimmedLine.match(/^[-*_]{3,}$/)) {
  //       // Horizontal rule
  //       checkNewPage();
  //       doc.setDrawColor(200, 200, 200);
  //       doc.setLineWidth(0.5);
  //       doc.line(marginLeft, y, marginLeft + maxWidth, y);
  //       y += 8;
  //     } else if (trimmedLine !== "") {
  //       // Regular paragraph
  //       checkNewPage();
  //       doc.setTextColor(44, 62, 80); // Reset to normal text color
  //       y = renderStyledText(trimmedLine, marginLeft, y);
  //       y += 4;
  //     } else {
  //       // Empty line
  //       y += 5;
  //     }
  //   });

  //   // Add page numbers
  //   const pageCount = doc.internal.getNumberOfPages();
  //   for (let i = 1; i <= pageCount; i++) {
  //     doc.setPage(i);
  //     doc.setFont("helvetica", "normal");
  //     doc.setFontSize(10);
  //     doc.setTextColor(150, 150, 150);
  //     doc.text(`Page ${i} of ${pageCount}`, 180, 290);
  //   }

  //   doc.save("pre-class-document.pdf");
  // };

  const downloadPDF = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic: "String Algorithms" }),
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "pre-class-document.pdf";
    link.click();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        📚 Pre-Class Document Generator
      </h1>

      <input
        type="text"
        placeholder="Enter a topic (e.g. Photosynthesis)"
        className="border p-2 w-full mb-4"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      />

      <button
        onClick={generateDocument}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading || !topic}
      >
        {loading ? "Generating..." : "Generate Document"}
      </button>

      <button
        onClick={downloadPDF}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Download PDF
      </button>

      {markdown && (
        <div className="mt-6">
          <div
            ref={contentRef}
            style={{
              padding: "20px",
              fontSize: "14px",
              lineHeight: 1.6,
              fontFamily: "Helvetica, Arial, sans-serif",
              color: "#000",
              backgroundColor: "#fff",
              maxWidth: "700px",
              margin: "auto",
              borderRadius: "4px",
            }}
          >
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>

          <button
            onClick={downloadPDF}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
          >
            Download PDF
          </button>
        </div>
      )}
    </div>
  );
}
