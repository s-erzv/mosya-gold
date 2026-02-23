import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const EMAS_API_KEY = process.env.EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices';

  try {
    const resToday = await fetch(`${BASE_URL}?weight[eq]=1`, {
      headers: { 'X-API-Key': EMAS_API_KEY || '', 'Accept': 'application/json' },
      next: { revalidate: 3600 } 
    });

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const dateStr = yesterday.toISOString().split('T')[0];

    const resHistory = await fetch(`${BASE_URL}?weight[eq]=1&updated_at[eq]=${dateStr}`, {
      headers: { 'X-API-Key': EMAS_API_KEY || '', 'Accept': 'application/json' },
      next: { revalidate: 3600 }
    });

    if (!resToday.ok) return NextResponse.json({ status: 'error', message: 'API Error' }, { status: resToday.status });

    const jsonToday = await resToday.json();
    const jsonHistory = await resHistory.json();

    const monitoredBrands = ['ANTAM', 'ANTAM MULIA RETRO', 'GALERI 24', 'EMASKU', 'UBS'];
    
    const dataWithHistory = jsonToday.data
      .filter((item: any) => monitoredBrands.includes(item.brand.toUpperCase()))
      .map((todayItem: any) => {
        const historyItem = jsonHistory.data?.find((h: any) => h.brand === todayItem.brand);
        return {
          ...todayItem,
          yesterday_price: historyItem ? historyItem.sell_price : todayItem.sell_price
        };
      });

    return NextResponse.json({
      status: 'success',
      data: dataWithHistory
    });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}