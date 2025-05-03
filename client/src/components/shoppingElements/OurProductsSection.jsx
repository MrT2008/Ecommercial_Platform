import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";
import { getAllProducts } from "../../api/guestAPI";
const OurProductsSection = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log("Fetched products:", response);
      setProducts(response.allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  useEffect(() => {
    fetchProducts();
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
              salePrice={product.salePrice}
              originalPrice={product.price}
              discountPercentage={product.saled}
              rating={product.totalRating}
              reviewCount={Math.floor(Math.random() * 100)}
              imageUrl={product.thumbnailURL}
              isNew={Date.now() - new Date(product.createdAt) < 7 * 24 * 60 * 60 * 1000} // New if created within the last week
            />
          ))}
        </div>
      </div>

      <SecondaryButton title="View All Products" />
    </div>
  );
};

export default OurProductsSection;
