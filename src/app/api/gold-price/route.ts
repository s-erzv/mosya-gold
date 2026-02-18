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
    // Debugging: Cek apakah key terbaca oleh server
    if (!EMAS_API_KEY) {
      console.error("ERROR: EMAS_API_KEY is not defined in environment variables.");
    }

    const res = await fetch(BASE_URL, {
      method: 'GET',
      headers: {
        // Coba kirim kedua jenis header jika ragu mana yang benar
        'X-API-Key': EMAS_API_KEY || '',
        'Authorization': `Bearer ${EMAS_API_KEY}`, 
        'Accept': 'application/json',
      },
      next: { revalidate: 0 } 
    });

    if (!res.ok) {
      const errorText = await res.text();
      // Ini akan membantu kamu melihat alasan "Unauthorized" (key salah, expired, atau salah header)
      console.error(`Fetch failed: ${res.status} - ${errorText}`);
      
      return NextResponse.json({ 
        status: 'error', 
        message: `API Luar Error (${res.status})`,
        details: errorText // Cek pesan ini di browser/console
      }, { status: res.status });
    }

    const json = await res.json();
    
    if (!json.data) {
       return NextResponse.json({ status: 'error', message: 'Data empty from API' }, { status: 500 });
    }

    // --- LOGIC SUPABASE ---
    const antamMarket = json.data.find((d: any) => d.brand.toUpperCase() === 'ANTAM');
    if (antamMarket) {
      await supabaseAdmin.from('gold_price_history').insert([{
        gold_type: 'Antam',
        buy_price: Number(antamMarket.buy_price || 0),
        sell_price: Number(antamMarket.sell_price || 0),
        recorded_at: new Date().toISOString()
      }]);
    }

    const allowedBrands = ['ANTAM', 'ANTAM MULIA RETRO', 'GALERI 24', 'EMASKU', 'UBS'];
    const filteredData = json.data.filter((item: any) => 
      allowedBrands.includes(item.brand.toUpperCase())
    );

    return NextResponse.json({ status: 'success', data: filteredData });

  } catch (error: any) {
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}