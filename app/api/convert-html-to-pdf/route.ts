import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

interface ConversionOptions {
  margin?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
}

// Cache browser instance for serverless optimization
let browserInstance: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;

async function getBrowser() {
  if (browserInstance) {
    return browserInstance;
  }

  browserInstance = await puppeteer.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(),
    headless: true,
  });

  return browserInstance;
}

export async function POST(req: NextRequest) {
  let browser: Awaited<ReturnType<typeof puppeteer.launch>> | null = null;
  let page: any = null;

  try {
    const {
      htmlContent,
      options,
    }: { htmlContent: string; options?: ConversionOptions } = await req.json();

    if (!htmlContent) {
      return NextResponse.json(
        { error: "HTML content is required" },
        { status: 400 },
      );
    }

    browser = await getBrowser();
    page = await browser.newPage();

    // A4 (794x1123) — корректный CSS пиксельный размер под PDF
    await page.setViewport({
      width: 794,
      height: 1123,
      deviceScaleFactor: 1,
    });

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: options?.margin ?? {
        top: "1cm",
        bottom: "1cm",
        left: "1cm",
        right: "1cm",
      },
    });

    // Close page but keep browser instance cached
    await page.close();

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=converted.pdf",
        "Content-Length": pdfBuffer.length.toString(),
      },
    });
  } catch (e) {
    console.error("PDF conversion error:", e);

    // Close page on error
    if (page) {
      try {
        await page.close();
      } catch (closeError) {
        console.error("Error closing page:", closeError);
      }
    }

    return NextResponse.json(
      { error: "PDF conversion failed" },
      { status: 500 },
    );
  }
}
