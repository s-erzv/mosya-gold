// src/lib/gold.ts
import { supabase } from './supabase';

export const calculatePrice = (basePrice: number, margin: number) => {
  return basePrice + (basePrice * (margin / 100));
};

export const fetchGoldData = async () => {
  try {
    // 1. Ambil margin dari Supabase
    const { data: settings, error } = await supabase.from('gold_settings').select('*');
    if (error || !settings) return [];

    // 2. Ambil harga XAU/USD (Emas per Ounce dalam Dollar)
    // Gunakan GoldAPI (XAU/USD biasanya gratis) atau provider lain
    const goldRes = await fetch('https://www.goldapi.io/api/XAU/USD', {
      headers: { 'x-access-token': process.env.NEXT_PUBLIC_GOLD_API_KEY || '' }
    });
    const goldData = await goldRes.json();

    // 3. Ambil Kurs USD ke IDR (Gunakan API bebas seperti exchangerate-api.com)
    const rateRes = await fetch('https://open.er-api.com/v6/latest/USD');
    const rateData = await rateRes.json();
    const usdToIdr = rateData.rates.IDR;
    const priceInIdrPerGram = (goldData.price / 31.1035) * usdToIdr;

    return settings.map(s => ({
      type: s.gold_type,
      market_price: priceInIdrPerGram, 
      sell_price: priceInIdrPerGram + (priceInIdrPerGram * (s.margin_percentage / 100)), // Harga Customer Beli
      buy_price: priceInIdrPerGram - (priceInIdrPerGram * 0.02), // Harga Mosya Beli Balik (Buyback), contoh margin 2%
    }));
  } catch (err) {
    return [];
  }
};

export const fetchGoldPriceData = async () => {
  try {
    const { data: settings, error } = await supabase.from('gold_settings').select('*');
    if (error || !settings) return null;

    const [goldRes, rateRes] = await Promise.all([
      fetch('https://www.goldapi.io/api/XAU/USD', {
        headers: { 'x-access-token': process.env.NEXT_PUBLIC_GOLD_API_KEY || '' }
      }),
      fetch('https://open.er-api.com/v6/latest/USD')
    ]);

    const goldData = await goldRes.json();
    const rateData = await rateRes.json();
    const usdToIdr = rateData.rates.IDR;
    const marketPrice = (goldData.price / 31.1035) * usdToIdr; //pergram

    return { marketPrice, settings };
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const fetchGoldBaseData = async () => {
  try {
    const { data: settings, error } = await supabase
      .from('gold_settings')
      .select('margin_percentage')
      .eq('gold_type', 'Mosya Gold')
      .single();

    const margin = settings?.margin_percentage ?? 20;

    const [goldRes, rateRes] = await Promise.all([
      fetch('https://www.goldapi.io/api/XAU/USD', {
        headers: { 'x-access-token': process.env.NEXT_PUBLIC_GOLD_API_KEY || '' }
      }),
      fetch('https://open.er-api.com/v6/latest/USD')
    ]);

    const goldData = await goldRes.json();
    const rateData = await rateRes.json();

    const usdToIdr = rateData.rates.IDR;
    const marketPricePerGram = (goldData.price / 31.1035) * usdToIdr;

    return { marketPricePerGram, margin };
  } catch (err) {
    console.error(err);
    return null;
  }
};