import { useEffect, useState, useMemo } from "react"; 
import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";
import { getAllProducts } from "../../api/guestAPI";
import Button from "../shares/Button";
import { useNavigate } from 'react-router-dom';
import { useSearch } from "../../hooks/searchContext";

const OurProductsSection = ({ initialProducts = [] }) => {
  const [products, setProducts] = useState(initialProducts);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showExtraMessage, setShowExtraMessage] = useState(false);
  const navigate = useNavigate();
  const { searchQuery } = useSearch();

  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.categories?.some(cat => 
        cat.toLowerCase().includes(searchQuery.toLowerCase())
    ));
  }, [products, searchQuery]);

  // Only show visible products from filtered results
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const handleAddToCartSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 2000);
  };

  const fetchProducts = async () => {
    if (products.length > 0) return; // Skip if we already have products
    
    setLoading(true);
    try {
      const list = await getAllProducts();
      setProducts(list);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewMore = () => {
    setVisibleCount(prev => prev + 20);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-4">
        <TitleSection title="Our Products" />
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-4">
      <TitleSection title="Our Products" />

      {filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No products found matching your search.</p>
        </div>
      ) : (
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
      )}

      {/* View More button - only show if there are more products to show */}
      {visibleProducts.length < filteredProducts.length && (
        <div className="flex justify-center mt-6">
          <SecondaryButton title="View More" onClick={handleViewMore} />
        </div>
      )}

      {/* Success modal */}
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

      {/* Toast notification */}
      {showExtraMessage && (
        <div className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-5 rounded shadow-lg z-50">
          Successfully added to cart
        </div>
      )}
    </div>
  );
};

export default OurProductsSection;