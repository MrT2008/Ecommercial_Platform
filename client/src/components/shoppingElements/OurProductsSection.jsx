import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";
import axios from "axios";

const OurProductsSection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/seller/1/getProducts")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch products:", err);
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-4">
      <TitleSection title={"Our Products"} />

      <div className="bg-white p-4 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id.toString()}
              productName={product.name}
              // Giá xạo tó :v
              salePrice={(Math.random() * 500 + 100).toFixed(0)}
              originalPrice={(Math.random() * 800 + 500).toFixed(0)}
              discountPercentage={Math.floor(Math.random() * 50) + 10}
              rating={Math.floor(Math.random() * 5) + 1}
              // Giá xạo tó :v
              reviewCount={Math.floor(Math.random() * 100)}
              imageUrl={product.thumbnailURL}
              isNew={Math.random() > 0.5}
            />
          ))}
        </div>
      </div>

      <SecondaryButton title="View All Products" />
    </div>
  );
};

export default OurProductsSection;
