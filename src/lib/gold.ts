import { supabase } from './supabase';

export const fetchGoldPriceData = async () => {
  try {
    // 1. Ambil SEMUA settings (Redmark & Retro) dari Supabase
    const { data: allSettings } = await supabase.from('gold_settings').select('*');

    // 2. Fetch data harga live dari API Maulana (lewat route internal kita)
    let result;
    try {
      const baseUrl = typeof window !== 'undefined' 
        ? '' 
        : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
        
      const res = await fetch(`${baseUrl}/api/gold-price`, { cache: 'no-store' });
      result = await res.json();
    } catch (e) {
      result = { status: 'error', data: [] };
    }

    const marketData = result.data || [];

    // 3. Fungsi Helper untuk hitung harga jual Mosya berdasarkan tipe profit
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

    // 4. Proses data untuk tiap gramasi (Default untuk Tab 1 / Antam Redmark)
    const redmarkSetting = allSettings?.find(s => s.gold_type === 'Antam Redmark');
    const antamMarket = marketData.find((d: any) => d.brand.toUpperCase() === 'ANTAM');
    const marketPrice = Number(antamMarket?.sell_price || 0);

    const denominations = [0.5, 1, 2, 3, 5, 10, 25, 50, 100];
    
    // processedPrices ini sebagai fallback/default view
    const processedPrices = denominations.map(gram => ({
      type: `${gram} Gram`,
      sell_price: calculateFinalPrice(gram, marketPrice, redmarkSetting),
      buy_price: marketPrice > 0 ? Math.round((marketPrice - 200000) * gram) : 0
    }));

    return { 
      marketPrice, 
      settings: allSettings || [], // Ini penting untuk diproses di komponen
      processedPrices,
      rawMarketData: marketData,
      // Kita tambahkan helper function ini supaya bisa dipanggil di UI
      calculateFinalPrice 
    };

  } catch (err) {
    console.error("Gold Fetch Error:", err);
    return { marketPrice: 0, settings: [], processedPrices: [], rawMarketData: [] };
  }
};