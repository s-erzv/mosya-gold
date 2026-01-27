import { supabase } from "@/lib/supabase";
import ProductCard from "@/components/ProductCard";

export default async function KatalogPage() {
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-[#FDFDFD] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4">
            Koleksi <span className="text-[#D4AF37]">Mosya Gold</span>
          </h1>
          <div className="w-24 h-1 bg-[#D4AF37] mx-auto mb-6"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Temukan kemurnian emas dan keindahan perhiasan eksklusif yang dirancang untuk menyempurnakan setiap momen berharga Anda.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product) => (
            <ProductCard 
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image_url}
              category={product.category}
            />
          ))}
        </div>
      </div>
    </div>
  );
}