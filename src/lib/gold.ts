import { supabase } from './supabase';

export const fetchGoldPriceData = async () => {
  try {
    const { data: allSettings } = await supabase.from('gold_settings').select('*');

    let result;
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? '' 
        : (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
        
      const res = await fetch(`${baseUrl}/api/gold-price`, { cache: 'no-store' });
      result = await res.json();
    } catch (e) {
      console.error("Fetch API Error:", e);
      result = { status: 'error', data: [] };
    }

    const marketData = result.data || [];

    const calculateFinalPrice = (gram: number, baseMarketPrice: number, setting: any) => {
      if (!baseMarketPrice || !setting) return 0;
      
      const baseValue = baseMarketPrice * gram;
      let profit = 0;

      if (setting.profit_type === 'percentage') {
        const percentage = Number(setting.percentage_margins?.[gram.toString()] || 0);
        profit = baseValue * (percentage / 100);
      } else {
        profit = Number(setting.weight_margins?.[gram.toString()] || 0);
      }

      return Math.round(baseValue + profit);
    };

    const certicardSetting = allSettings?.find(s => s.gold_type === 'Antam Certicard');
    const antamMarket = marketData.find((d: any) => d.brand.toUpperCase() === 'ANTAM');
    const marketPrice = Number(antamMarket?.sell_price || 0);

    const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    
    const processedPrices = denominations.map(gram => ({
      type: `${gram} Gram`,
      sell_price: calculateFinalPrice(gram, marketPrice, certicardSetting),
      buy_price: marketPrice > 0 ? Math.round((marketPrice - 200000) * gram) : 0
    }));

    return { 
      marketPrice, 
      settings: allSettings || [], 
      processedPrices,
      rawMarketData: marketData,
      calculateFinalPrice 
    };

  } catch (err) {
    console.error("Gold Fetch Error:", err);
    return { 
      marketPrice: 0, 
      settings: [], 
      processedPrices: [], 
      rawMarketData: [],
      calculateFinalPrice: () => 0 
    };
  }
};