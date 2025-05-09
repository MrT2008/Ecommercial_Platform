import { useEffect, useState, useRef } from "react";
import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";

const ShopProducts = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Bestseller");
  const [categories, setCategories] = useState([]);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const priceRef = useRef(null);
  const categoryRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        setShowPriceDropdown(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategoryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/seller/${shopId}/getCategory`);
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        const categories = data.categories.map((cat) => ({
          id: cat.id,
          name: cat.name,
        }));

        setCategories(categories); // hoặc xử lý theo logic app của bạn
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [shopId]);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/seller/${shopId}/getProducts`);
        const data = await response.json();

        const formattedProducts = data.map((product) => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          salePrice: parseFloat(product.salePrice),
          saled: product.saled,
          createdAt: product.createdAt,
          thumbnailURL: product.thumbnailURL.replace(/\\/g, "/"), // sửa dấu `\` thành `/` nếu có
          categories: product.categories || [],
          rating: product.totalRating || 0,
          reviewCount: 0, // API không có reviewCount
        }));

        setProducts(formattedProducts);
        sortProducts(formattedProducts, activeFilter);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Sort products based on active filter
  const sortProducts = (productsToSort, filter) => {
    let sorted = [...productsToSort];

    switch (filter) {
      case "Bestseller":
        // Sort by highest sales
        sorted.sort((a, b) => b.saled - a.saled);
        break;
      case "Newest":
        // Sort by creation date (newest first)
        sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    setDisplayProducts(sorted);
  };

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    sortProducts(products, filter);
  };

  // Price filter handlers
  const handlePriceFilter = (order) => {
    let sorted = [...displayProducts];
    if (order === "highToLow") {
      sorted.sort((a, b) => {
        const aPrice = a.salePrice > 0 ? a.salePrice : a.price;
        const bPrice = b.salePrice > 0 ? b.salePrice : b.price;
        return bPrice - aPrice;
      });
    } else {
      sorted.sort((a, b) => {
        const aPrice = a.salePrice > 0 ? a.salePrice : a.price;
        const bPrice = b.salePrice > 0 ? b.salePrice : b.price;
        return aPrice - bPrice;
      });
    }
    setDisplayProducts(sorted);
    setShowPriceDropdown(false);
  };

  // Category filter handler
  const handleCategoryFilter = (category) => {
    if (category === null) {
      // Reset filter
      sortProducts(products, activeFilter);
      setSelectedCategory(null);
    } else {
      const selectedCat = categories.find(cat => cat.id === category);
      setSelectedCategory(selectedCat); // select category object is the number 
      
      const filteredProducts = products.filter(product =>
        product.categories.some(cat => cat === selectedCat.name)
      );
  
      sortProducts(filteredProducts, activeFilter);
    }
    setShowCategoryDropdown(false);
    setShowAllProducts(false);
  };
  

  // Handle view all products
  const handleViewAllProducts = () => {
    setShowAllProducts(true);
  };

  if (loading) {
    return <div className="text-center py-8">Loading products...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-4">
      {/* Header with HomePage styling */}
      <div className="flex items-center justify-between mb-4">
        <TitleSection title="Our Products" />
        <div className="flex items-center">
          <span className="text-sm mr-2">Sorted:</span>
          <button
            onClick={() => handleFilterChange("Bestseller")}
            className={`px-4 py-1 text-sm mr-2 rounded-md ${activeFilter === "Bestseller" ? "bg-[#FFA50B] text-white" : "bg-gray-200"}`}
          >
            Bestseller
          </button>
          <button
            onClick={() => handleFilterChange("Newest")}
            className={`px-4 py-1 text-sm mr-2 rounded-md ${activeFilter === "Newest" ? "bg-[#FFA50B] text-white" : "bg-gray-200"}`}
          >
            Newest
          </button>

          {/* Price dropdown */}
          <div className="relative inline-block mx-2" ref={priceRef}>
            <button
              onClick={() => setShowPriceDropdown(!showPriceDropdown)}
              className="flex items-center px-4 py-1 bg-white border border-gray-300 rounded-md text-sm"
            >
              Price
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showPriceDropdown && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handlePriceFilter("highToLow")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Highest to Lowest
                </button>
                <button
                  onClick={() => handlePriceFilter("lowToHigh")}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Lowest to Highest
                </button>
              </div>
            )}
          </div>

          {/* Category dropdown */}
          <div className="relative inline-block" ref={categoryRef}>
            <button
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="flex items-center px-4 py-1 bg-white border border-gray-300 rounded-md text-sm"
            >
              {selectedCategory ? selectedCategory.name : "Category"}
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showCategoryDropdown && categories.length > 0 && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  onClick={() => handleCategoryFilter(null)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryFilter(category.id)}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Products grid */}
      <div className="bg-white p-4 rounded-lg">
        {displayProducts.length === 0 ? (
          <div className="text-center py-8">No products found for this shop</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
            {(showAllProducts ? displayProducts : displayProducts.slice(0, 8)).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id.toString()}
                productName={product.name}
                salePrice={product.salePrice > 0 ? product.salePrice : product.price}
                originalPrice={product.salePrice > 0 ? product.price : null}
                discountPercentage={product.salePrice > 0 ?
                  Math.round(100 - (product.salePrice * 100 / product.price)) : 0}
                rating={product.rating}
                reviewCount={product.reviewCount}
                imageUrl={product.thumbnailURL}
                isNew={new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Hiện nút "View All Products" chỉ khi có nhiều hơn 8 sản phẩm và chưa nhấp vào nút */}
      {displayProducts.length > 8 && !showAllProducts && (
        <div className="mt-6 flex justify-center">
          <SecondaryButton title="View All Products" onClick={handleViewAllProducts} />
        </div>
      )}
    </div>
  );
};

export default ShopProducts;