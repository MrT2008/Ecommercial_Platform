import Sidebar from '../../components/seller/sellerSidebar';
import { useState, useEffect } from 'react';
import SecondaryButton from "../../components/shares/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getSellerId } from "../../api/sellerAPI";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [shopId, setShopId] = useState(null);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const userId = getSellerId(); 
          const shopRes = await fetch(`http://localhost:8080/seller/getShop/${userId}`);
          const shopData = await shopRes.json();
          const shopId = shopData.data.shop.id;
          setShopId(shopId);
  
          const res = await fetch(`http://localhost:8080/seller/${shopId}/getCategory`);
          const data = await res.json();
          setCategories(data.categories || []);
        } catch (err) {
          console.error("Lỗi khi fetch categories:", err);
        }
      };
  
      fetchCategories();
    }, []);
  
    const handleAddCategory = async () => {
      if (!newCategory.trim() || !shopId) return;
    
      try {
        const response = await fetch(`http://localhost:8080/seller/${shopId}/postCategory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newCategory }),
        });
    
        if (!response.ok) throw new Error("Failed to add category");
    
        const result = await response.json();
    
        // Có thể thêm thẳng category vừa tạo hoặc gọi lại API để lấy list mới
        setCategories([...categories, result.category]);  // Nếu API trả về category vừa tạo
        setNewCategory("");  // Reset input
      } catch (err) {
        console.error("Lỗi khi thêm category:", err);
      }
    };
    
  
    const handleDelete = (index) => {
      const updated = [...categories];
      updated.splice(index, 1);
      setCategories(updated);
    };
  
    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />
    
            {/* Main Content */}
            <div className="w-4/5 p-6 py-12 px-8">
                <h2 className="text-2xl font-bold mb-6 text-[#FFA50B]">Category Management</h2>
                <div className="flex flex-row gap-6">
                {/* Form to Add Category */}
                <div className="bg-white p-6 shadow rounded-md mb-6 w-full max-w-sm">
                    <h2 className="text-lg font-semibold mb-6">Add Category</h2>
                    <input
                    type="text"
                    placeholder="e.g. Electronics"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-3 border rounded mb-2"
                    />
                    <div className="flex justify-end" >
                        <SecondaryButton title ="Save" onClick={handleAddCategory}/>
                    </div>
                </div>
        
                {/* Category List */}
                <div className="flex-grow bg-white p-6 shadow rounded-md">
                    <h2 className="text-lg font-semibold mb-1">Category</h2>
                    <table className="w-full text-left">
                    <thead>
                        <tr className="text-center">
                        <th className="p-2">No.</th>
                        <th className="p-2">Category Name</th>
                        <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => (
                        <tr
                            key={index}
                            className={`${index % 2 === 0 ? "bg-[#F7F6FF]" : "bg-white"} text-center`}
                        >
                            <td className="p-2">{index + 1}</td>
                            <td className="p-2">{category.name}</td>
                            <td className="p-2">
                            <div className="flex items-center justify-center gap-2">
                                <button
                                className="text-[#EA4335]"
                                onClick={() => handleDelete(index)}
                                title="Delete"
                                >
                                <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
    );
};
  
  export default Category;