import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const docs = await prisma.generatedDocument.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, docs });
  } catch (error) {
    console.error("Fetch Docs Error:", error);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
