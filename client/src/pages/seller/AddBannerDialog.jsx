import PropTypes from 'prop-types';
import { useState } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import OutlineButton from '../../components/shares/OutlineButton';

const AddBannerDialog = ({ isOpen, onClose, onSave, editBanner = null }) => {
  const [title, setTitle] = useState(editBanner ? editBanner.title : '');
  const [image, setImage] = useState(editBanner ? editBanner.image : null);

  const handleSave = () => {
    const bannerData = {
      id: editBanner ? editBanner.id : Date.now(), // Generate ID if new banner
      title,
      image,
      isActive: editBanner ? editBanner.isActive : true
    };

    onSave(bannerData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle('');
    setImage(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-orange-400 mb-8">
          {editBanner ? 'Edit Banner' : 'Add Banner'}
        </h2>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Title</label>
          <input
            className="w-full p-3 bg-gray-100 rounded border-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 font-medium">Add Image</label>
          <div>
            {image && (
              <div className="mb-2">
                <img 
                  src={image} 
                  alt="Banner preview" 
                  className="h-24 object-cover rounded"
                />
              </div>
            )}
            <label className="inline-block border border-gray-300 rounded p-3 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                </svg>
                Upload Image
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

AddBannerDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddBannerDialog;