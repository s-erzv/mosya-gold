import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const EMAS_API_KEY = process.env.EMAS_API_KEY;
  const BASE_URL = 'https://emas.maulanar.my.id/api/prices?weight[eq]=1';

  try {
    const res = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        'X-API-Key': EMAS_API_KEY || '',
        'Accept': 'application/json',
      },
      next: { revalidate: 7200 }
    });

    if (!res.ok) {
      return NextResponse.json({ status: 'error', message: 'API Maulana Error' }, { status: res.status });
    }

    const json = await res.json();
    if (!json.data) return NextResponse.json({ status: 'error', message: 'No data' }, { status: 500 });

    const monitoredBrands = ['ANTAM', 'ANTAM MULIA RETRO', 'GALERI 24', 'EMASKU', 'UBS'];
    const filteredData = json.data.filter((item: any) => 
      monitoredBrands.includes(item.brand.toUpperCase())
    );

    const { data: lastHistory } = await supabaseAdmin
      .from('gold_price_history')
      .select('recorded_at')
      .order('recorded_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - (2 * 60 * 60 * 1000));

    const isReadyToSave = !lastHistory || new Date(lastHistory.recorded_at) < twoHoursAgo;

    if (isReadyToSave) {
      console.log("Saving history to DB (2-hour cycle)...");
      
      const historyToInsert = [];

      for (const item of filteredData) {
        const { data: prevPrice } = await supabaseAdmin
          .from('gold_price_history')
          .select('sell_price')
          .eq('gold_type', item.brand)
          .order('recorded_at', { ascending: false })
          .limit(1)
          .maybeSingle();

        if (!prevPrice || Number(prevPrice.sell_price) !== Number(item.sell_price)) {
          historyToInsert.push({
            gold_type: item.brand,
            buy_price: Number(item.buyback_price || item.buy_price || 0),
            sell_price: Number(item.sell_price || 0),
            recorded_at: now.toISOString()
          });
        }
      }

      if (historyToInsert.length > 0) {
        await supabaseAdmin.from('gold_price_history').insert(historyToInsert);
      }
    }

    return NextResponse.json({
      status: 'success',
      data: filteredData
    });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}