import { useState } from 'react';
import TitleSection from '../shares/TitleSection';
import { useEffect } from "react";

const ShopCategories = ({ shopId }) => {
  const [categories, setCategories] = useState([]);

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

  return (
    <div className="container mx-auto px-4 py-4 mb-2">
      <div className="flex items-center">
        <TitleSection title="Categories" />
        <div className="flex overflow-x-auto flex-grow pl-6">
          {categories.map(category => (
            <span 
              key={category.id}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-full text-base font-medium whitespace-nowrap mr-5"
            >
              {category.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShopCategories;