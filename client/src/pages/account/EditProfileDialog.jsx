import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';

const EditProfileDialog = ({ isOpen, onClose, onSave, user }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone || '');
    }
  }, [user]);

  const handleSave = () => {
    const updatedUserInfo = {
      username,
      email,
      phone: phoneNumber,
    };
    onSave(updatedUserInfo); // Pass updated info back to parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">Edit Profile</h2>

        <div className="my-4">
          <label className="block mb-1">Username</label>
          <input
            className="w-full p-2 bg-gray-100 rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label className="block mb-1">Email</label>
          <input
            className="w-full p-2 bg-gray-100 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="my-4">
          <label className="block mb-1">Phone Number</label>
          <input
            className="w-full p-2 bg-gray-100 rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

EditProfileDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  user: PropTypes.object, // User info to edit
};

export default EditProfileDialog;