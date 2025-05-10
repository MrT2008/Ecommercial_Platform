import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';
import { getSellerId } from "../../api/sellerAPI";
const AddProductDialog = ({ isOpen, onClose, onSave, product }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [status, setStatus] = useState('Active');
  const [category, setCategory] = useState([]);
  const [image, setImage] = useState(null);

  const [allCategories, setAllCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);  useEffect(() => {
    // Initialize form values based on product prop
    if (product) {
      console.log("Initializing form with product data:", product);
      setName(product.name || '');
      setDescription(product.description || '');
      setPrice(product.price?.toString() || '');
      // Handle both 'discount' or 'saled' property names
      const discountValue = product.discount || product.saled || '';
      setDiscount(typeof discountValue === 'string' ? 
        discountValue.replace('%', '') : 
        discountValue?.toString() || '');
      // Handle both 'quantity' or 'stock' property names
      setQuantity(product.quantity || product.stock || 0);
      setStatus(product.status || 'Active');
      // Handle both 'category' or 'categories' property names
      setCategory(Array.isArray(product.categories) ? product.categories : 
                  product.category ? product.category : []);
      // Handle image property which might be under different names
      setImage(product.image || product.thumbnailURL || null);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setDiscount('');
      setQuantity(0);
      setStatus('Active');
      setCategory([]);
      setImage(null);
    }

    const fetchCategories = async () => {
      try {
        const userId = getSellerId();
        const shopRes = await fetch(`http://localhost:8080/seller/getShop/${userId}`);
        const shopData = await shopRes.json();
        const shopId = shopData.data.shop.id;

        const res = await fetch(`http://localhost:8080/seller/${shopId}/getCategory`);
        const data = await res.json();
        setAllCategories(data.categories || []);
      } catch (err) {
        console.error("Lỗi khi fetch categories:", err);
      }
    };

    fetchCategories();
  }, [product]); // Add product as dependency so it refreshes when product changes


  const handleCategoryChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setCategory(value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSave = () => {
    try {
      // Create product object with current form values
      const productData = {
        id: product?.id, // Pass the ID for editing existing products
        name: name,
        price: parseFloat(price),
        description: description,
        categories: category, // Match the property name used in AllProduct.jsx
        quantity: parseInt(quantity),
        stock: parseInt(quantity), // Include both property names for compatibility
        discount: discount,
        saled: discount, // Include both property names for compatibility
        status: status,
        image: image,
        thumbnailURL: image
      };
      
      console.log("Saving product with data:", productData);
      
      // Call the onSave function passed from parent component
      onSave(productData);
      
    } catch (err) {
      console.error("Error preparing product data:", err);
      alert("There was a problem preparing the product data. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">
          {product ? 'Edit Product' : 'Add Product'}
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Name</label>
            <input className="w-full p-2 bg-gray-100 rounded" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1">Image</label>
            {image && (
              <div className="mb-2">
                <img src={image} alt="Product preview" className="h-24 object-cover rounded mb-2" />
              </div>
            )}
            <label className="inline-block border border-gray-300 rounded p-3 cursor-pointer w-full">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex items-center gap-2 justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Upload Image
              </div>
            </label>
          </div>
        </div>

        <div className="my-4">
          <label className="block mb-1">Description</label>
          <textarea className="w-full p-2 bg-gray-100 rounded h-20" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="grid grid-cols-4 gap-4 mb-4">
          <input placeholder="Price" className="p-2 bg-gray-100 rounded" value={price} onChange={(e) => setPrice(e.target.value)} />
          <input type="number" placeholder="Discount (%)" className="p-2 bg-gray-100 rounded" value={discount} onChange={(e) => setDiscount(e.target.value)} />
          <input type="number" placeholder="Quantity" className="p-2 bg-gray-100 rounded" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          <select className="p-2 bg-gray-100 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="mb-6 relative">
          <label className="block mb-1">Category</label>

          <button
            type="button"
            onClick={() => setShowCategories(!showCategories)}
            className="w-full bg-gray-100 rounded p-2 flex justify-between items-center"
          >
            <span className="text-left truncate text-gray-600">
              {category.length > 0 ? category.join(', ') : 'Select the category'}
            </span>
            <span>{showCategories ? '▲' : '▼'}</span>
          </button>

          {showCategories && (
            <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded shadow w-full max-h-48 overflow-y-auto p-2 flex flex-col gap-2">
              {allCategories.map((cat) => (
                <label key={cat.id || cat.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={cat.name}
                    checked={category.includes(cat.name)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setCategory([...category, cat.name]);
                      } else {
                        setCategory(category.filter((c) => c !== cat.name));
                      }
                    }}
                  />
                  <span>{cat.name}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

AddProductDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  product: PropTypes.object,
};

export default AddProductDialog;
