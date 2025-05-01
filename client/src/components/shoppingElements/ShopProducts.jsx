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

  // Mock data
  useEffect(() => {
    // Mock categories
    const mockCategories = [
      { id: 1, name: "Clothes" },
      { id: 2, name: "Shoes" },
      { id: 3, name: "Electronics" },
      { id: 4, name: "Books" },
      { id: 5, name: "Home & Kitchen" }
    ];
    
    // Mock products - extended list with more products
    const mockProducts = [
      {
        id: 1,
        name: "Premium Dog Food",
        price: 120,
        salePrice: 99,
        saled: 254,
        createdAt: "2025-04-01T08:30:00",
        thumbnailURL: "https://product.hstatic.net/1000365242/product/caddy-snack-small-breed-mau-trang-voi-dha_7326bb33d59b45daa109134944dec20e_large.jpg",
        categoryIds: [1],
        rating: 4.5,
        reviewCount: 120
      },
      {
        id: 2,
        name: "Canon EOS DSLR Camera",
        price: 550,
        salePrice: 0,
        saled: 89,
        createdAt: "2025-04-20T10:15:00",
        thumbnailURL: "https://img.tgdd.vn/imgt/f_webp,fit_outside,quality_100/https://cdn.tgdd.vn/Products/Images/42/305658/s16/iphone-16-promax-black-titanium-1-650x650.png",
        categoryIds: [3],
        rating: 4.8,
        reviewCount: 45
      },
      {
        id: 3,
        name: "ASUS TUF Gaming Laptop",
        price: 950,
        salePrice: 899,
        saled: 147,
        createdAt: "2025-04-25T14:20:00",
        thumbnailURL: "https://cdn2.cellphones.com.vn/x358,webp,q100/media/catalog/product/t/e/text_ng_n_5__1_33.png",
        categoryIds: [3],
        rating: 4.7,
        reviewCount: 60
      },
      {
        id: 4,
        name: "Logitech Wireless Mouse",
        price: 45,
        salePrice: 35,
        saled: 321,
        createdAt: "2025-03-15T09:45:00",
        thumbnailURL: "https://vn.e-giant.vn/cdn/shop/products/tire-ge-foot-mass-1_1200x1200.jpg?v=1679033211",
        categoryIds: [3],
        rating: 2.2,
        reviewCount: 200
      },
      {
        id: 5,
        name: "Kids Sneakers",
        price: 65,
        salePrice: 0,
        saled: 103,
        createdAt: "2025-04-10T11:30:00",
        thumbnailURL: "https://down-vn.img.susercontent.com/file/sg-11134201-22110-heclyd7535jvaf",
        categoryIds: [2],
        rating: 4.0,        
        reviewCount: 80
      },
      {
        id: 6,
        name: "Puma Special Cleats",
        price: 120,
        salePrice: 99.99,
        saled: 78,
        createdAt: "2025-04-28T16:40:00",
        thumbnailURL: "https://down-vn.img.susercontent.com/file/0b7c66ac33e2af3875606bd24c0821eb",
        categoryIds: [2],
        rating: 4.6,
        reviewCount: 50
      },
      {
        id: 7,
        name: "Xbox Controller",
        price: 75,
        salePrice: 69.95,
        saled: 205,
        createdAt: "2025-04-05T13:15:00",
        thumbnailURL: "https://www.zdnet.com/a/img/resize/307adc7ad24c564fa99a6090d146a2e81f961495/2023/05/31/72bacf2b-c040-4e7e-96f3-729f88fb7406/xbox-controller.jpg?auto=webp&fit=crop&height=900&width=1200",
        categoryIds: [3],
        rating: 4.3,
        reviewCount: 150
      },
      {
        id: 8,
        name: "Smart Jacket",
        price: 250,
        salePrice: 199.99,
        saled: 42,
        createdAt: "2025-04-15T15:00:00",
        thumbnailURL: "https://www.vietcetera.com/uploads/images/05-apr-2023/pillow-slippers-soc-thu-cung.jpg",
        categoryIds: [1],
        rating: 4.9,
        reviewCount: 30
      },
      {
        id: 9,
        name: "Wireless Earbuds",
        price: 89,
        salePrice: 69,
        saled: 178,
        createdAt: "2025-04-12T09:25:00",
        thumbnailURL: "https://cdn.tgdd.vn/Products/Images/54/236016/airpods-pro-2-hop-sac-khong-day-091222-034125-600x600.jpg",
        categoryIds: [3],
        rating: 4.4,
        reviewCount: 90
      },
    ];
    
    setCategories(mockCategories);
    setProducts(mockProducts);
    sortProducts(mockProducts, activeFilter);
    setLoading(false);
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
  const handleCategoryFilter = (categoryId) => {
    if (categoryId === null) {
      // Reset filter
      sortProducts(products, activeFilter);
      setSelectedCategory(null);
    } else {
      // Filter by category
      const selectedCat = categories.find(cat => cat.id === categoryId);
      setSelectedCategory(selectedCat);
      
      // Mock filter by category
      const filteredProducts = products.filter(product => 
        product.categoryIds.includes(categoryId)
      );
      sortProducts(filteredProducts, activeFilter);
    }
    setShowCategoryDropdown(false);
    setShowAllProducts(false); // Reset to initial view when changing filters
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