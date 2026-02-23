import { supabase } from './supabase';

export const fetchGoldPriceData = async () => {
  try {
    const { data: allSettings } = await supabase.from('gold_settings').select('*');

    let result;
    try {
      const baseUrl = typeof window !== 'undefined' ? '' : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
      const res = await fetch(`${baseUrl}/api/gold-price`, { cache: 'no-store' });
      result = await res.json();
    } catch (e) {
      result = { status: 'error', data: [] };
    }

    const marketData = result.data || [];

    const calculateFinalPrice = (gram: number, baseMarketPrice: number, setting: any) => {
      if (!baseMarketPrice || !setting) return 0;
      const baseValue = baseMarketPrice * gram;
      let profit = setting.profit_type === 'percentage' 
        ? baseValue * (Number(setting.percentage_margins?.[gram.toString()] || 0) / 100)
        : Number(setting.weight_margins?.[gram.toString()] || 0);
      return Math.round(baseValue + profit);
    };

    return { 
      settings: allSettings || [], 
      rawMarketData: marketData,
      calculateFinalPrice 
    };

  } catch (err) {
    console.error("Gold Fetch Error:", err);
    return { settings: [], rawMarketData: [], calculateFinalPrice: () => 0 };
  }
};