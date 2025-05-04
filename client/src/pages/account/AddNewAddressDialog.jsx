import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';

const AddNewAddressDialog = ({ isOpen, onClose, onSave, addressData }) => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  useEffect(() => {
    if (addressData) {
      setFullName(addressData.name || '');
      setPhoneNumber(addressData.phone || '');
      setAddress(addressData.address || '');
      setIsDefault(addressData.isDefault || false);
    } else {
      setFullName('');
      setPhoneNumber('');
      setAddress('');
      setIsDefault(false);
    }
  }, [addressData, isOpen]);

  const handleSave = () => {
    const newAddress = {
      id:          addressData?.id,        // Đưa id nếu đang edit
      fullName,
      phoneNumber,
      address,
      isDefault,
    };
    onSave(newAddress);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">
          {addressData ? 'Edit Address' : 'Add New Address'}
        </h2>

        <div className="mb-4">
          <label className="block mb-1">Full Name</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Phone Number</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1">Address</label>
          <textarea
            className="w-full p-2 bg-gray-100 rounded h-24"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
              className="w-4 h-4"
            />
            Set as default address
          </label>
        </div>

        <div className="flex justify-end gap-2">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

AddNewAddressDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  addressData: PropTypes.shape({
    id:         PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    name:       PropTypes.string,
    phone:      PropTypes.string,
    address:    PropTypes.string,
    isDefault:  PropTypes.bool,
  }),
};

export default AddNewAddressDialog;
