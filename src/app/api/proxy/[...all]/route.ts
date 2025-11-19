import { type NextRequest, NextResponse } from "next/server";

const API_BASE = "http://localhost:3333";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  const { all } = await context.params;

  const path = all.join("/");
  const url = `${API_BASE}/${path}${req.nextUrl.search}`;

  const res = await fetch(url, {
    method: "GET",
  });

  const data = await res.json();
  return NextResponse.json(data);
}

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  const { all } = await context.params;

  const path = all.join("/");

  const url = `${API_BASE}/${path}${req.nextUrl.search}`;

  const body = await req.text();

  const backendResponse = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const responseText = await backendResponse.text();

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  const { all } = await context.params;

  const path = all.join("/");

  const url = `${API_BASE}/${path}${req.nextUrl.search}`;

  const body = await req.text();

  const backendResponse = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const responseText = await backendResponse.text();

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  const { all } = await context.params;

  const path = all.join("/");
  const url = `${API_BASE}/${path}${req.nextUrl.search}`;

  const body = await req.text();

  const res = await fetch(url, {
    method: "DELETE",
    body,
  });

  const text = await res.text();

  try {
    return NextResponse.json(JSON.parse(text), { status: res.status });
  } catch {
    return new NextResponse(text, { status: res.status });
  }
}

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ all: string[] }> },
) {
  const { all } = await context.params;

  const path = all.join("/");

  const url = `${API_BASE}/${path}${req.nextUrl.search}`;

  const body = await req.text();

  const backendResponse = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const responseText = await backendResponse.text();

  return new NextResponse(responseText, {
    status: backendResponse.status,
    headers: backendResponse.headers,
  });
}
