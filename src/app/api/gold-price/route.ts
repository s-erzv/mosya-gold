// src/app/api/gold-price/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const EMAS_API_KEY = process.env.NEXT_PUBLIC_EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices?brand[eq]=ANTAM&weight[eq]=1';

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        'X-API-Key': EMAS_API_KEY || '',
      },
      // Cache selama 1 jam di sisi server
      next: { revalidate: 3600 } 
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Failed to fetch' }, { status: 500 });
  }
}