import Sidebar from '../../components/admin/sellerSidebar';
import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import SecondaryButton from "../../components/shares/SecondaryButton";


const AllProduct = () => {
    const [products] = useState([
        {
        id: 1,
        name: 'Hat',
        quantity: 1,
        price: 4.95,
        discount: '0%',
        status: 'Active',
        category: ['Fashion', 'Summer'],
        },
        {
        id: 2,
        name: 'Another Hat',
        quantity: 1,
        price: 4.95,
        discount: '33%',
        status: 'Inactive',
        category: ['Rep11'],
        },
        {
        id: 3,
        name: 'HatHat Hat',
        quantity: 1,
        price: 4.95,
        discount: '0%',
        status: 'Active',
        category: ['Fashion', 'Summer'],
        },
    ]);
    
  return (
    <div className="flex">
      <Sidebar />

      <div className="w-4/5 p-6">
        {/* Title and Add Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">All Products</h2>
          <SecondaryButton title ="Add new product"/>
        </div>

        {/* Table */}
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
                className={`text-center ${
                  index % 2 === 0 ? 'bg-[#f9f9f9]' : 'bg-white'
                }`}
              >
                <td className="p-2">{index + 1}</td>
                <td className="p-2 flex items-center justify-center gap-2">
                  <img
                    src="https://via.placeholder.com/32"
                    alt="product"
                    className="rounded-full w-8 h-8"
                  />
                  <span>{p.name}</span>
                </td>
                <td className="p-2">{p.quantity}</td>
                <td className="p-2">${p.price.toFixed(2)}</td>
                <td className="p-2">{p.discount}</td>
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
                    {p.category.map((cat, idx) => (
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
                    <button className="text-[#5F33E1]" title="Edit">
                        <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-[#EA4335]" title="Delete">
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
  );
};

export default AllProduct;