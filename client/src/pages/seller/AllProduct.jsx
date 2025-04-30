import Sidebar from '../../components/seller/sellerSidebar';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddProductDialog from "../../pages/seller/AddProductDialog";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sellerId, setSellerId] = useState(null);

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        // Lấy seller ID
        const id = getSellerId();
        setSellerId(id);
        
        console.log(`Đang fetch sản phẩm cho seller với ID: ${id}`);
        const response = await fetch(`http://localhost:8080/seller/${id}/getProducts`);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`Đã nhận được ${data.length} sản phẩm từ API`);
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Không thể fetch sản phẩm:", err);
        setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Helper function to get seller ID
  const getSellerId = () => {
    // PHƯƠNG PHÁP 1: Lấy từ React Router (nếu bạn đang sử dụng react-router-dom)
    // Ví dụ nếu URL là /seller/5/products
    try {
      const match = window.location.pathname.match(/\/seller\/(\d+)/);
      if (match && match[1]) {
        return match[1];
      }
    } catch (e) {
      console.error("Không thể lấy sellerId từ URL:", e);
    }
    
    // PHƯƠNG PHÁP 2: Lấy từ localStorage (nếu đã lưu khi đăng nhập)
    try {
      const userDataString = localStorage.getItem('userData') || localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && (userData.shopId || userData.id)) {
          return userData.shopId || userData.id;
        }
      }
    } catch (e) {
      console.error("Không thể lấy sellerId từ localStorage:", e);
    }
    
    // PHƯƠNG PHÁP 3: Lấy từ sessionStorage
    try {
      const sessionDataString = sessionStorage.getItem('userData') || sessionStorage.getItem('user');
      if (sessionDataString) {
        const sessionData = JSON.parse(sessionDataString);
        if (sessionData && (sessionData.sellerId || sessionData.id)) {
          return sessionData.sellerId || sessionData.id;
        }
      }
    } catch (e) {
      console.error("Không thể lấy sellerId từ sessionStorage:", e);
    }
    
    // Mặc định trả về 1 nếu không tìm thấy từ các nguồn trên
    console.warn("Không tìm thấy sellerId, sử dụng giá trị mặc định: 1");
    return 1;
  };

  const handleSaveProduct = async (product) => {
    try {
      const url = `http://localhost:8080/seller/${sellerId}/postProduct`;  //sellerId truyền vào là userId, trong khi cái cần là shopId
      const method = editingProduct ? 'PUT' : 'POST';
      const endpoint = editingProduct ? `${url}/${editingProduct.id}` : url;
      
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Failed to save product');
      }

      // Refresh products list after saving
      const updatedProductsResponse = await fetch(`http://localhost:8080/seller/${sellerId}/getProducts`);
      if (updatedProductsResponse.ok) {
        const updatedProducts = await updatedProductsResponse.json();
        setProducts(updatedProducts);
      }
    } catch (err) {
      console.error("Error saving product:", err);
      // You could add a toast notification here
    }
    
    setEditingProduct(null);
    setDialogOpen(false);
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/seller/${sellerId}/products/${productId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete product');
        }

        // Update local state after successful deletion
        setProducts(products.filter(item => item.id !== productId));
      } catch (err) {
        console.error("Error deleting product:", err);
        // You could add a toast notification here
      }
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-4/5 p-6 py-12 px-8">
        {/* Title and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">All Products</h2>
          <SecondaryButton title="Add new product" onClick={() => setDialogOpen(true)} />
        </div>

        {/* Loading and Error States */}
        {isLoading && (
          <div className="text-center py-10">
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && products.length === 0 && (
          <div className="text-center py-10 bg-gray-50 rounded-lg">
            <p className="text-gray-600 mb-4">You do not have any products yet</p>
            <SecondaryButton title="Add your first product" onClick={() => setDialogOpen(true)} />
          </div>
        )}

        {/* Products Table */}
        {!isLoading && !error && products.length > 0 && (
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-center text-gray-600 border-b">
                <th className="p-2">No.</th>
                <th className="p-2">Products</th>
                <th className="p-2">Quantity</th>
                <th className="p-2">Price</th>
                <th className="p-2">Discount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Category</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, index) => (
                <tr
                  key={p.id}
                  className={`text-center ${index % 2 === 0 ? 'bg-[#F7F6FF]' : 'bg-white'}`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center justify-center gap-2">
                    {p.image && (
                      <img
                        src={p.image}
                        alt="product"
                        className="rounded-full w-8 h-8"
                      />
                    )}
                    <span>{p.name}</span>
                  </td>
                  <td className="p-2">{p.quantity}</td>
                  <td className="p-2">${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}</td>
                  <td className="p-2">{p.discount || '0%'}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${
                        p.status === 'Active'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      {Array.isArray(p.category) ? p.category.map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                        >
                          {cat}
                        </span>
                      )) : (
                        <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                          {p.category || 'Uncategorized'}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="text-[#5F33E1]"
                        title="Edit"
                        onClick={() => {
                          setEditingProduct(p);
                          setDialogOpen(true);
                        }}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="text-[#EA4335]"
                        title="Delete"
                        onClick={() => handleDeleteProduct(p.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Add Product Dialog */}
        <AddProductDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setDialogOpen(false);
            setEditingProduct(null); 
          }}
          onSave={handleSaveProduct}
          product={editingProduct} 
        />
      </div>
    </div>
  );
};

export default AllProduct;