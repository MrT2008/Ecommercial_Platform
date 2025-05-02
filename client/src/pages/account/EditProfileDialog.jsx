import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';

const EditProfileDialog = ({ isOpen, onClose, onSave, user }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ fullName: '', email: '', phone: '' });

  useEffect(() => {
    if (user) {
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setErrors({ fullName: '', email: '', phone: '' }); // Reset errors when user changes
    }
  }, [user]);

  const validateForm = () => {
    const newErrors = { fullName: '', email: '', phone: '' };
    let isValid = true;

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (phone && !/^\d{10,15}$/.test(phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Invalid phone number (10-15 digits)';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const updatedUserInfo = {
      fullName,
      email,
      phone: phone || null, // Send null if phone is empty
    };
    onSave(updatedUserInfo); // Pass updated info back to parent component
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">Edit Profile</h2>

        <div className="my-4">
          <label className="block mb-1">Full Name</label>
          <input
            className={`w-full p-2 bg-gray-100 rounded ${errors.fullName ? 'border-red-500 border' : ''}`}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
          {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
        </div>

        <div className="my-4">
          <label className="block mb-1">Email</label>
          <input
            className={`w-full p-2 bg-gray-100 rounded ${errors.email ? 'border-red-500 border' : ''}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="my-4">
          <label className="block mb-1">Phone Number (Optional)</label>
          <input
            className={`w-full p-2 bg-gray-100 rounded ${errors.phone ? 'border-red-500 border' : ''}`}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
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
  user: PropTypes.shape({
    fullName: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    imageURL: PropTypes.string,
  }),
};

export default EditProfileDialog;