import { useEffect, useState, useRef, useMemo } from "react";
import ProductCard from "./ProductCard";
import SecondaryButton from "../shares/SecondaryButton";
import TitleSection from "../shares/TitleSection";
import { useSearch } from "../../hooks/searchContext"; // Adjust path as needed

const ShopProducts = ({ shopId }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("Bestseller");
  const [categories, setCategories] = useState([]);
  const [showPriceDropdown, setShowPriceDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showAllProducts, setShowAllProducts] = useState(false);
  
  const { searchQuery } = useSearch(); // Get search query from context
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

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/seller/${shopId}/getCategory`);
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.categories.map(cat => ({ id: cat.id, name: cat.name })));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [shopId]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:8080/seller/${shopId}/getProducts`);
        const data = await response.json();
        
        const formattedProducts = data.map(product => ({
          id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          salePrice: parseFloat(product.salePrice),
          saled: product.saled,
          createdAt: product.createdAt,
          thumbnailURL: product.thumbnailURL.replace(/\\/g, "/"),
          categories: product.categories || [],
          rating: product.totalRating || 0,
          reviewCount: 0,
        }));
        
        setProducts(formattedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [shopId]);

  // Memoized filtered products based on search and category
  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => 
        product.categories.some(cat => cat === selectedCategory.name)
      );
    }
    
    return result;
  }, [products, searchQuery, selectedCategory]);

  // Memoized sorted products
  const sortedProducts = useMemo(() => {
    let result = [...filteredProducts];
    
    // Apply active filter (Bestseller/Newest)
    switch (activeFilter) {
      case "Bestseller":
        result.sort((a, b) => b.saled - a.saled);
        break;
      case "Newest":
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }
    
    return result;
  }, [filteredProducts, activeFilter]);

  // Price filter handler (now modifies the display directly)
  const handlePriceFilter = (order) => {
    let sorted = [...sortedProducts];
    sorted.sort((a, b) => {
      const aPrice = a.salePrice > 0 ? a.salePrice : a.price;
      const bPrice = b.salePrice > 0 ? b.salePrice : b.price;
      return order === "highToLow" ? bPrice - aPrice : aPrice - bPrice;
    });
    setShowPriceDropdown(false);
    return sorted;
  };

  // Final displayed products
  const displayProducts = useMemo(() => {
    return showAllProducts ? sortedProducts : sortedProducts.slice(0, 8);
  }, [sortedProducts, showAllProducts]);

  // Handle filter changes
  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setShowAllProducts(false);
  };

  // Category filter handler
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category ? categories.find(c => c.id === category) : null);
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
      {/* Header with filters */}
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
        {sortedProducts.length === 0 ? (
          <div className="text-center py-8">
            {searchQuery ? "No products match your search" : "No products found for this shop"}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
            {displayProducts.map((product) => (
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

      {/* View All button */}
      {sortedProducts.length > 8 && !showAllProducts && (
        <div className="mt-6 flex justify-center">
          <SecondaryButton title="View All Products" onClick={handleViewAllProducts} />
        </div>
      )}
    </div>
  );
};

export default ShopProducts;