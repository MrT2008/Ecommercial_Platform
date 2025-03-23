import { useRef } from "react";
import CountdownTimer from "../CountdownTimer";
import SalesCard from "./SalesCard";
import TitleSection from "../shares/TitleSection";
import SecondaryButton from "../shares/SecondaryButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const SalesSection = () => {
  const scrollRef = useRef(null);
  const CARD_WIDTH = 250; // Chiều rộng mỗi card (bao gồm margin)
  const CARDS_PER_VIEW = 4; // Số card hiển thị trong 1 lần
  const SCROLL_AMOUNT = CARD_WIDTH * CARDS_PER_VIEW; // Lượng cuộn

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

  return (
    <div className="container mx-auto px-4 py-4">
      <TitleSection title={"Today's Sales"} />

      <div className="flex justify-between items-center w-full">
        {/* Đồng hồ đếm ngược (bên trái) */}
        <CountdownTimer />

        {/* Nhóm nút mũi tên (bên phải) */}
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
        {/* Danh sách sản phẩm cuộn ngang */}
        <div className="overflow-hidden">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-scroll scroll-smooth scrollbar-hide"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none", }}
          >
            {[...Array(10)].map((_, index) => (
              <div key={index} className="scrollSnapAlign-start min-w-[250px] w-[250px]">
                <SalesCard
                  productName={`Sale Item ${index + 1}`}
                  salePrice={(Math.random() * 500 + 100).toFixed(0)}
                  originalPrice={(Math.random() * 800 + 500).toFixed(0)}
                  discountPercentage={Math.floor(Math.random() * 50) + 10}
                  rating={Math.floor(Math.random() * 5) + 1}
                  reviewCount={Math.floor(Math.random() * 100)}
                  imageUrl={`/api/placeholder/180/180?text=Sale ${index + 1}`}
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
