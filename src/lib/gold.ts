// src/lib/gold.ts
import { supabase } from './supabase';

export const fetchGoldPriceData = async () => {
  try {
    const { data: mosyaSettings } = await supabase
      .from('gold_settings')
      .select('*')
      .eq('gold_type', 'Mosya Gold')
      .single();
    
    const { data: allSettings } = await supabase.from('gold_settings').select('*');

    const isServer = typeof window === 'undefined';
    let apiUrl = '/api/gold-price';

    if (isServer) {
      const host = (process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000')
        .replace(/^https?:\/\//, '');
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
      apiUrl = `${protocol}://${host}/api/gold-price`;
    }

    const res = await fetch(apiUrl, { cache: 'no-store', signal: AbortSignal.timeout(10000) });
    const result = await res.json();

    // Default 0 kalau gagal
    let marketPrice = 0; 

    if (result.status === 'success' && result.data && result.data.length > 0) {
      marketPrice = Number(result.data[0].sell_price || 0);
    }

    const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    const weightMargins = mosyaSettings?.weight_margins || {};

    const processedPrices = denominations.map(gram => {
      // Jika marketPrice 0, hasil akhir harus tetap informatif (hanya untung atau 0)
      // Tapi mending kita bikin 0 semua kalau marketPrice-nya 0
      const baseValue = Number(marketPrice) * Number(gram);
      const profit = Number(weightMargins[gram.toString()] || 0);
      
      const isAvailable = marketPrice > 0;

      return {
        type: `${gram} Gram`,
        sell_price: isAvailable ? Math.round(baseValue + profit) : 0,
        buy_price: isAvailable ? Math.round((Number(marketPrice) - 200000) * Number(gram)) : 0
      };
    });

    return { 
      marketPrice: Number(marketPrice), 
      weightMargins: weightMargins, 
      settings: allSettings || [],
      processedPrices: processedPrices
    };

  } catch (err) {
    console.error("Gagal Fetch Harga:", err);
    return {
      marketPrice: 0,
      weightMargins: {},
      settings: [],
      processedPrices: [0.5, 1, 2, 3, 5, 10, 25, 50, 100].map(g => ({
        type: `${g} Gram`,
        sell_price: 0,
        buy_price: 0
      }))
    };
  }
};