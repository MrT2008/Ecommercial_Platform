import Sidebar from '../../components/seller/sellerSidebar';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddProductDialog from "../../pages/seller/AddProductDialog";
import { getSellerId } from "../../api/sellerAPI";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [sellerId, setSellerId] = useState(null);
  const [reloadProducts, setReloadProducts] = useState(false); // State to trigger reload

  // Fetch products when component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const userId = getSellerId();
        const shopId = await getShopIdFromUserId(userId);
  
        const productRes = await fetch(`http://localhost:8080/seller/${shopId}/getProducts`);
        if (!productRes.ok) {
          throw new Error(`Error: ${productRes.status}`);
        }

        const products = await productRes.json();
        setProducts(products);
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
  }, [reloadProducts]); 
  
  
  const handleSaveProduct = async (product) => {
    try {
      // Get the shop ID first
      const userId = getSellerId();
      let shopId;

      try {
        // Fetch the shop ID first
        const shopRes = await fetch(`http://localhost:8080/seller/getShop/${userId}`);
        const shopData = await shopRes.json();
        shopId = shopData.data.shop.id;
        if (!shopId) {
          throw new Error("Shop ID not found in response");
        }
        console.log("Found shop ID:", shopId);
        setReloadProducts(prev => !prev);
      } catch (err) {
        console.error("Error getting shop ID:", err);
        alert("Failed to find your shop. Please check if you're logged in properly.");
        return;
      }

      const url = `http://localhost:8080/seller/${shopId}/postProduct`;
      const method = editingProduct ? 'PUT' : 'POST';
      const endpoint = editingProduct ? `${url}/${editingProduct.id}` : url;

      console.log("Sending request to:", endpoint);

      // Create FormData object instead of JSON
      const formData = new FormData();

      // Add all fields with null checks
      formData.append('name', product.name || '');
      formData.append('price', product.price?.toString() || '0');
      formData.append('description', product.description || '');

      // Handle categories
      if (Array.isArray(product.categories) && product.categories.length > 0) {
        product.categories.forEach((cat, index) => {
          formData.append(`categories[${index}]`, cat);
        });
      } else {
        // Add a default category if none provided
        formData.append('categories[0]', 'uncategorized');
      }

      formData.append('quantity', product.quantity?.toString() || '0');
      formData.append('type', 'product');
      formData.append('discount', product.discount?.toString() || '0');

      // Handle image upload
      if (product.image) {
        if (typeof product.image === 'string' && product.image.startsWith('data:')) {
          // Convert base64 to blob
          const response = await fetch(product.image);
          const blob = await response.blob();
          formData.append('thumbnailURL', blob, 'product-image.jpg');
        } else if (typeof product.image === 'string') {
          // If it's a URL or file path from an existing product
          formData.append('thumbnailURL', product.image);
        } else if (product.image instanceof File) {
          // If it's already a File object
          formData.append('thumbnailURL', product.image);
        }
      }

      // Log what we're sending
      console.log('Sending product data to:', endpoint);
      const formDataEntries = {};
      for (let [key, value] of formData.entries()) {
        formDataEntries[key] = value instanceof Blob ? 'Blob/File data' : value;
      }
      console.log('Form data:', formDataEntries);

      const response = await fetch(endpoint, {
        method: method,
        // Don't set Content-Type header when using FormData
        // The browser will automatically set it with the correct boundary
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Server error response:', errorData);
        throw new Error(`Failed to save product: ${response.status} ${response.statusText}`);
      }
      
      // Show success message
      alert('Product saved successfully!');
    } catch (err) {
      console.error("Error saving product:", err);
      alert(`Error saving product: ${err.message}`);
    } finally {
      setEditingProduct(null);
      setDialogOpen(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`http://localhost:8080/seller/${shopId}/deleteProduct/${productId}`, {
          method: 'PUT',
          credentials: 'include',
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

  console.log("Products:", products);

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
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">${typeof p.price === 'number' ? p.price.toFixed(2) : p.price}</td>
                  <td className="p-2">{p.saled + "%"|| '0%'}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${p.status === 'Active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      {Array.isArray(p.categories) ? p.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                        >
                          {cat}
                        </span>
                      )) : (
                        <span className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full">
                          {p.categories || 'Uncategorized'}
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
                        {p.id}
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
            setReloadProducts(prev => !prev); 
          }}
          onSave={handleSaveProduct}
          product={editingProduct}
        />
      </div>
    </div>
  );
};

export default AllProduct;