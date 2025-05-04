import { useState, useEffect } from "react";

const images = [
  "https://cdn.memorykings.pe/files/2023/01/10/346060-MK033431GRANDE.jpg",
  "https://img.freepik.com/premium-vector/summer-sale-banner-template-with-frame-blue-floral-leaf_90661-594.jpg?w=996",
  "https://reallyree.com/wp-content/uploads/2018/07/charlotte-tilbury-summer-sale-2018.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/864a19202871479.668d766568781.jpg",
  "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2bbcfa99737217.5ef9be3dbb9a9.jpg",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Tự động chuyển ảnh sau 3 giây

    return () => clearInterval(interval);
  }, [currentIndex]);

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? images.length - 1 : prevIndex - 1
//     );
//   };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="container mx-auto">
<div className="w-full gap-4">
    <div className="relative mx-auto">
      {/* Ảnh */}
      <div className="overflow-hidden rounded-lg">
        <img
          src={images[currentIndex]}
          alt="carousel"
          className="w-full h-96 object-cover transition duration-500 ease-in-out transform scale-100"
        />
      </div>

      {/* Nút điều hướng */}
      {/* <button
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
        onClick={prevSlide}
      >
        ❮
      </button>
      <button
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
        onClick={nextSlide}
      >
        ❯
      </button> */}

      {/* Dots Indicator */}
      <div className=" absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <dotbutton
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-[var(--button)]" : "bg-gray-500"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></dotbutton>
        ))}
      </div>
    </div>
  {/* <div className="flex flex-col space-y-2">
    <div className="bg-yellow-100 rounded-lg p-2 flex items-center justify-center">
      <img src="/api/placeholder/300/100" alt="Snack Promotion" className="w-full h-auto" />
    </div>
    <div className="bg-blue-100 rounded-lg p-2 flex items-center justify-center">
      <img src="/api/placeholder/300/100" alt="Food Promotion" className="w-full h-auto" />
    </div>
  </div> */}
</div>
</div>
  );
};

export default Carousel;
