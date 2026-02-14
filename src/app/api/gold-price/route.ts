// src/app/api/gold-price/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const EMAS_API_KEY = process.env.NEXT_PUBLIC_EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices?brand[eq]=ANTAM&weight[eq]=1';

  try {
    const res = await fetch(BASE_URL, {
      headers: {
        'X-API-Key': EMAS_API_KEY || '',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      next: { revalidate: 3600 } 
    });

    // Jika kena blokir (403/503), kembalikan harga 0
    if (res.status === 403 || res.status === 503) {
       return NextResponse.json({
         status: 'success', 
         data: [{ sell_price: 0 }] 
       });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    // Jika API mati total, kembalikan harga 0
    return NextResponse.json({ 
      status: 'success', 
      data: [{ sell_price: 0 }] 
    });
  }
}