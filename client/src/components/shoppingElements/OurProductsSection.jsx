import { useEffect, useState } from "react"; 
import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";
import { getAllProducts } from "../../api/guestAPI";
import Button from "../shares/Button";
import { useNavigate } from 'react-router-dom';

const OurProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showExtraMessage, setShowExtraMessage] = useState(false);
  const navigate = useNavigate();

  const handleAddToCartSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    const list = await getAllProducts();                 // luôn là mảng (có lỗi cũng là [])
    setProducts(list);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 20);
  };

  // Chỉ lấy từ 0 đến visibleCount
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div className="container mx-auto px-4 py-4">
      <TitleSection title="Our Products" />

      <div className="bg-white p-4 rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
          {visibleProducts.map((product) => (
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
              isNew={Date.now() - new Date(product.createdAt) < 7 * 24 * 60 * 60 * 1000}
              onAddToCartSuccess={handleAddToCartSuccess}
            />
          ))}
        </div>
      </div>

      {showSuccessMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white w-11/12 max-w-md p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Product Added to Cart
            </h2>
            <p className="mt-3 text-gray-600">
              You have successfully added the item to your cart.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Button
                text="Go to Cart"
                otherClassName="blue"
                type="button"
                onClick={() => {
                  navigate("/buyer/cart");
                  setShowSuccessMessage(false);
                }}
              />
              <Button
                text="Continue Shopping"
                otherClassName="gray"
                type="button"
                onClick={() => {
                  setShowSuccessMessage(false);
                  setShowExtraMessage(true);
                  setTimeout(() => setShowExtraMessage(false), 2000);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {showExtraMessage && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-5 rounded shadow-lg z-50">
          Successfully added to cart
        </div>
      )}

      {/* Nút View More chỉ hiện khi còn sản phẩm chưa load */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <SecondaryButton title="View More" onClick={handleViewMore} />
        </div>
      )}
    </div>
  );
};

export default OurProductsSection;
