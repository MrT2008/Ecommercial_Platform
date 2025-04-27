import Sidebar from '../../components/admin/sellerSidebar';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddProductDialog from "../../pages/seller/AddProductDialog";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:8080/seller/1/getProducts');
      const data = await response.json();
      if (Array.isArray(data)) {
        setProducts(data);
      } else {
        console.error('Data format unexpected:', data);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleSaveProduct = async (product) => {
    console.log("Product data to send:", product);
    try {
      let url = 'http://localhost:8080/seller/1/postProduct';
      let method = 'POST';

      const body = {
        name: product.name || "", 
        price: product.price ? Number(product.price) : 0, 
        description: product.description || "",
        thumbnailURL: product.thumbnailURL || "https://daihocdaivietsaigon.edu.vn/wp-content/uploads/2023/02/1676242016_111-Hinh-Anh-Avatar-Nu-Dep-Phong-Cach-CHILL-HET.jpg",  // <-- DEFAULT IMAGE
        categoryId: (product.categoryId && product.categoryId.length > 0) ? product.categoryId : [1],
        stock: product.stock ? Number(product.stock) : 1,
      };
      


      console.log('Sending body:', JSON.stringify(body, null, 2));

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const savedProduct = await response.json();
        setProducts(prev => [...prev, savedProduct]);
        setEditingProduct(null);
        setDialogOpen(false);
      } else {
        console.error('Failed to save product');
        const errorResponse = await response.text();
        console.error('Error details:', errorResponse);
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };




  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/seller/1/deleteProduct/${id}`, {
        method: 'PUT',
      });

      if (response.ok) {
        setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">All Products</h2>
          <SecondaryButton title="Add new product" onClick={() => setDialogOpen(true)} />
        </div>

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
            {products
              .filter((p) => p.status !== "isdeleted")
              .map((p, index) => (
                <tr
                  key={p.id}
                  className={`text-center ${index % 2 === 0 ? 'bg-[#F7F6FF]' : 'bg-white'}`}
                >
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center justify-center gap-2">
                    <img
                      src={p.thumbnailURL}
                      alt="product"
                      className="rounded-full w-8 h-8"
                    />
                    <span>{p.name}</span>
                  </td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">${parseFloat(p.price).toFixed(2)}</td>
                  <td className="p-2">${parseFloat(p.salePrice).toFixed(2)}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium ${p.status === 'active'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                        }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex flex-wrap justify-center gap-1">
                      {p.categories && p.categories.map((cat, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-300 text-gray-700 text-xs px-2 py-0.5 rounded-full"
                        >
                          {cat}
                        </span>
                      ))}
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
