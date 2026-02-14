import { NextResponse } from 'next/server';

export async function GET() {
  const EMAS_API_KEY = process.env.NEXT_PUBLIC_EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices?brand[eq]=ANTAM&weight[eq]=1';

  console.log("Memulai fetch ke Emas API dengan Key:", EMAS_API_KEY ? "Tersedia" : "KOSONG");

  try {
    if (!EMAS_API_KEY) {
      throw new Error("API Key Maulana tidak ditemukan di Environment Variables");
    }

    const res = await fetch(BASE_URL, {
      headers: {
        'X-API-Key': EMAS_API_KEY,
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 } 
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Emas API ID merespon dengan error:", res.status, errorText);
      return NextResponse.json({ 
        status: 'error', 
        message: `Emas API Error: ${res.status}`,
        details: errorText 
      }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Internal Server Error di Route Handler:", error.message);
    return NextResponse.json({ 
      status: 'error', 
      message: error.message || 'Internal Server Error' 
    }, { status: 500 });
  }
}