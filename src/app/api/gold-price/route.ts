import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get('date');
  
  const EMAS_API_KEY = process.env.EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices';

  try {
    let url = `${BASE_URL}?weight[eq]=1`;
    if (dateParam) url += `&updated_at[eq]=${dateParam}`;

    const res = await fetch(url, {
      headers: { 'X-API-Key': EMAS_API_KEY || '', 'Accept': 'application/json' },
      next: { revalidate: 3600 } 
    });

    const json = await res.json();
    if (!res.ok) return NextResponse.json({ status: 'error' }, { status: res.status });

    const filteredData = json.data.filter((item: any) => {
      const brand = item.brand.toUpperCase();
      const resrc = item.resource.toLowerCase();

      if (brand === 'ANTAM') return resrc === 'antam'; 
      if (brand === 'ANTAM MULIA RETRO') return resrc === 'galeri24';
      if (brand === 'UBS') return resrc === 'galeri24';
      if (brand === 'GALERI 24') return resrc === 'galeri24';
      if (brand === 'EMASKU') return resrc === 'hartadinata';
      
      return false;
    });

    return NextResponse.json({ status: 'success', data: filteredData });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}