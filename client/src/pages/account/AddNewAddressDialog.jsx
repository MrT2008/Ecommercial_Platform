import React, { useState } from "react";
import PropTypes from "prop-types";
import SecondaryButton from "../../components/shares/SecondaryButton";
import OutlineButton from "../../components/shares/OutlineButton";

const AddNewAddressDialog = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    isDefault: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4">New Address</h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Fullname"
            value={formData.fullname}
            onChange={handleChange}
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
          />
          <textarea
            name="address"
            placeholder="Specific Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2"
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label htmlFor="isDefault" className="text-sm">
              Set as default
            </label>
          </div>
        </form>
        <div className="flex justify-end gap-4 mt-6">
          <OutlineButton title="Back" onClick={onClose} />
          <SecondaryButton title="OK" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

AddNewAddressDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddNewAddressDialog;