import { useState } from 'react';
import TitleSection from '../shares/TitleSection';

const ShopCategories = () => {
  const [categories] = useState([
    { id: 1, name: "Clothes" },
    { id: 2, name: "Shoes" },
    { id: 3, name: "Electronics" },
    { id: 4, name: "Books" },
    { id: 5, name: "Home & Kitchen" }
  ]);

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