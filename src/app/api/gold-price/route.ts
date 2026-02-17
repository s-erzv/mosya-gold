import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const EMAS_API_KEY = process.env.EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices?brand[eq]=ANTAM&weight[eq]=1';

  try {
    const res = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'X-API-Key': EMAS_API_KEY || '',
        'Accept': 'application/json',
      },
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      const errorData = await res.text();
      return NextResponse.json({ 
        status: 'error', 
        message: `API Maulana Error: ${res.status}`,
        debug: errorData.substring(0, 100)
      }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json({ 
      status: 'error', 
      message: error.message 
    }, { status: 500 });
  }
}