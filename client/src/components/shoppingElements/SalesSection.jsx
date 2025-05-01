import { useRef, useEffect, useState } from "react";
import CountdownTimer from "../CountdownTimer";
import SalesCard from "./SalesCard";
import TitleSection from "../shares/TitleSection";
import SecondaryButton from "../shares/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const SalesSection = () => {
  const scrollRef = useRef(null);
  const CARD_WIDTH = 250;
  const CARDS_PER_VIEW = 4;
  const SCROLL_AMOUNT = CARD_WIDTH * CARDS_PER_VIEW;

  const [products, setProducts] = useState([]);

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
            {products.map((product) => (
              <div
                key={product.id}
                className="scrollSnapAlign-start min-w-[250px] w-[250px]"
              >
                <SalesCard
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
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <SecondaryButton title="View All Products" />
    </div>
  );
};

export default SalesSection;
