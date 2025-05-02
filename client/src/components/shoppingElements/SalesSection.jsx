import { useRef, useEffect, useState } from "react";
import CountdownTimer from "../CountdownTimer";
import SalesCard from "./SalesCard";
import TitleSection from "../shares/TitleSection";
import SecondaryButton from "../shares/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getAllProducts } from "../../api/guestAPI";

const SalesSection = () => {
  const scrollRef = useRef(null);
  const CARD_WIDTH = 250;
  const CARDS_PER_VIEW = 4;
  const SCROLL_AMOUNT = CARD_WIDTH * CARDS_PER_VIEW;

  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(20);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= SCROLL_AMOUNT;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += SCROLL_AMOUNT;
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data.allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleProducts((prev) => prev + 20);
  }

  const visibleProductsList = products.slice(0, visibleProducts);

  return (
    <div className="container mx-auto px-4 py-4">
      <TitleSection title={"Today's Sales"} />

      <div className="flex justify-between items-center w-full mb-4">
        <CountdownTimer />

        <div className="flex gap-x-2">
          <button
            onClick={scrollLeft}
            className="bg-gray-200 p-2 px-4 rounded-full"
          >
            <FontAwesomeIcon icon={faAngleLeft} size="lg" />
          </button>

          <button
            onClick={scrollRight}
            className="bg-gray-200 p-2 px-4 rounded-full"
          >
            <FontAwesomeIcon icon={faAngleRight} size="lg" />
          </button>
        </div>
      </div>

      <div className="relative bg-white p-4 rounded-lg">
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-scroll scroll-smooth scrollbar-hide"
            style={{
              scrollSnapType: "x mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {visibleProductsList.map((product) => (
              <div
                key={product.id}
                className="scrollSnapAlign-start min-w-[250px] w-[250px]"
              >
                <SalesCard
                  id={product.id.toString()}
                  productName={product.name}
                  salePrice={Math.floor(product.salePrice * 100 + product.price)}
                  originalPrice={product.price}
                  discountPercentage={product.salePrice * 100}
                  // Not right, but for demo purpose
                  rating={Math.floor(Math.random() * 5) + 1} 
                  reviewCount={Math.floor(Math.random() * 100)}
                  // Not right, but for demo purpose
                  imageUrl={product.thumbnailURL}
                  shopId={product.shopId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {
        visibleProducts < products.length && (
          <div className="flex justify-center mt-4">
            <SecondaryButton title="Load More" onClick={handleLoadMore} />
          </div>
        )}
    </div>
  );
}

export default SalesSection;
