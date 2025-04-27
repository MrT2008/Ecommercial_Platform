import Sidebar from '../../components/admin/sellerSidebar';
import React, { useState, useEffect } from 'react';
import SecondaryButton from "../../components/shares/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    const fetchCategories = async () => {
        try {
            const response = await fetch('http://localhost:8080/seller/1/getCategory');
            const data = await response.json();
            if (data.categories) {
                const activeCategories = data.categories.filter(cat => cat.isActive);
                setCategories(activeCategories);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };



    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/seller/1/delteteCategory/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                console.log('Category deactivated successfully');
                setCategories(prevCategories => prevCategories.filter(cat => cat.id !== id));
            } else {
                console.error('Failed to deactivate category');
            }
        } catch (error) {
            console.error('Error deactivating category:', error);
        }
    };



    const handleAddCategory = async () => {
        if (newCategory.trim()) {
            try {
                const response = await fetch('http://localhost:8080/seller/1/postCategory', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: newCategory,
                        isActive: 1,
                    }),
                });

                if (response.ok) {
                    setNewCategory("");
                    await fetchCategories();
                } else {
                    console.error('Failed to add category');
                }
            } catch (error) {
                console.error('Error adding category:', error);
            }
        }
    };

    return (
        <div className="flex">
            <Sidebar />

            <div className="w-4/5 p-6">
                <h2 className="text-2xl font-bold mb-6 text-[#FFA50B]">Category Management</h2>
                <div className="flex flex-row gap-6">
                    <div className="bg-white p-6 shadow rounded-md mb-6 w-full max-w-sm">
                        <h2 className="text-lg font-semibold mb-2">Add Category</h2>
                        <input
                            type="text"
                            placeholder="e.g. Electronics"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                        />
                        <div onClick={handleAddCategory}>
                            <SecondaryButton title="Save" />
                        </div>
                    </div>

                    <div className="flex-grow bg-white p-6 shadow rounded-md">
                        <h2 className="text-lg font-semibold mb-4">Category</h2>
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
                                    <tr key={category.id} className={`${index % 2 === 0 ? "bg-[#F7F6FF]" : "bg-white"} text-center`}>
                                        <td className="p-2">{index + 1}</td>
                                        <td className="p-2">{category.name}</td>
                                        <td className="p-2">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    className="text-[#EA4335]"
                                                    onClick={() => handleDelete(category.id)}
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
