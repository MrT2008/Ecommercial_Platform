import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';

const EditInfShopDialog = ({ isOpen, onClose, onSave, shop }) => {
  const [shopName, setShopName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');

  useEffect(() => {
    if (shop) {
      setShopName(shop.name || '');
      setEmail(shop.email || '');
      setPhoneNumber(shop.phone || '');
      setAddress(shop.address || '');
      setBankName(shop.bankName || '');
      setBankAccount(shop.bankAccount || '');
    }
  }, [shop]);

  const handleSave = () => {
    const updatedShopInfo = {
      name: shopName,
      email,
      phoneNumber,
      address,
      bankName: bankName,
      bankAccount: bankAccount,
    };

    onSave(updatedShopInfo); // Pass updated info back to parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">Edit Shop Info</h2>

        <div className="my-4">
          <label className="block mb-1">Shop Name</label>
          <input className="w-full p-2 bg-gray-100 rounded" value={shopName} onChange={(e) => setShopName(e.target.value)} />
        </div>

        <div className="my-4">
          <label className="block mb-1">Email</label>
          <input className="w-full p-2 bg-gray-100 rounded" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="my-4">
          <label className="block mb-1">Phone Number</label>
          <input className="w-full p-2 bg-gray-100 rounded" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
        </div>

        <div className="my-4">
          <label className="block mb-1">Address</label>
          <input className="w-full p-2 bg-gray-100 rounded" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div className="my-4">
          <label className="block mb-1">Bank Name</label>
          <input className="w-full p-2 bg-gray-100 rounded" value={bankName} onChange={(e) => setBankName(e.target.value)} />
        </div>

        <div className="my-4">
          <label className="block mb-1">Bank Account</label>
          <input className="w-full p-2 bg-gray-100 rounded" value={bankAccount} onChange={(e) => setBankAccount(e.target.value)} />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

EditInfShopDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  shop: PropTypes.object, // Shop info to edit
};

export default EditInfShopDialog;
