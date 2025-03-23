import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";

const OurProductsSection = () => {
  const products = [...Array(12)]; // 3 hàng, mỗi hàng 4 sản phẩm

  return (
    <div className="container mx-auto px-4 py-4">
      <TitleSection title={"Our Products"} />

      <div className="bg-white p-4 rounded-lg">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
    {products.map((_, index) => (
      <ProductCard
        key={index}
        productName={`Sale Item ${index + 1}`}
        salePrice={(Math.random() * 500 + 100).toFixed(0)}
        originalPrice={(Math.random() * 800 + 500).toFixed(0)}
        discountPercentage={Math.floor(Math.random() * 50) + 10}
        rating={Math.floor(Math.random() * 5) + 1}
        reviewCount={Math.floor(Math.random() * 100)}
        imageUrl={`/api/placeholder/180/180?text=Sale ${index + 1}`}
      />
    ))}
  </div>
</div>

      <SecondaryButton title ="View All Products"/>
    </div>
  );
};

export default OurProductsSection;
