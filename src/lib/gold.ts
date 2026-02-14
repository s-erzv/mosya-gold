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

    const res = await fetch(apiUrl, { 
      cache: 'no-store',
      signal: AbortSignal.timeout(10000) 
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    
    const result = await res.json();

    let marketPrice = 1350000; 

    if (result.status === 'success' && result.data && result.data.length > 0) {
      marketPrice = Number(result.data[0].sell_price);
    }

    const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    const weightMargins = mosyaSettings?.weight_margins || {};

    const processedPrices = denominations.map(gram => {
      const baseValue = Number(marketPrice) * Number(gram);
      const profit = Number(weightMargins[gram.toString()] || 0);
      
      return {
        type: `${gram} Gram`,
        sell_price: Math.round(baseValue + profit),
        buy_price: Math.round((Number(marketPrice) - 200000) * Number(gram)) 
      };
    });

    return { 
      marketPrice: Number(marketPrice), 
      weightMargins: weightMargins, 
      settings: allSettings || [],
      processedPrices: processedPrices
    };

  } catch (err) {
    console.error("Gagal Fetch Harga di Production:", err);
    return {
      marketPrice: 1350000,
      weightMargins: {},
      settings: [],
      processedPrices: [0.5, 1, 2, 3, 5, 10, 25, 50, 100].map(g => ({
        type: `${g} Gram`,
        sell_price: (1350000 * g) + 300000,
        buy_price: (1150000 * g)
      }))
    };
  }
};