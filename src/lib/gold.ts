import { supabase } from './supabase';

export const fetchGoldPriceData = async () => {
  try {
    const { data: mosyaSettings } = await supabase
      .from('gold_settings')
      .select('*')
      .eq('gold_type', 'Mosya Gold')
      .single();
    
    const { data: allSettings } = await supabase.from('gold_settings').select('*');

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/gold-price`, { cache: 'no-store' });
    const result = await res.json();

    let marketPrice = 1350000;

    if (result.status === 'success' && result.data && result.data.length > 0) {
      marketPrice = Number(result.data[0].sell_price);
    }

    const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    const weightMargins = mosyaSettings?.weight_margins || {};

    const processedPrices = denominations.map(gram => {
      const baseValue = marketPrice * gram;
      const profit = Number(weightMargins[gram.toString()] || 0);
      
      return {
        type: `${gram} Gram`,
        sell_price: Math.round(baseValue + profit),
        buy_price: Math.round((marketPrice - 200000) * gram) 
      };
    });

    return { 
      marketPrice: Number(marketPrice), 
      weightMargins: weightMargins, 
      settings: allSettings || [],
      processedPrices: processedPrices
    };
  } catch (err) {
    console.error("Fetch Gold Error:", err);
    return {
      marketPrice: 1350000,
      weightMargins: {},
      settings: [],
      processedPrices: []
    };
  }
};