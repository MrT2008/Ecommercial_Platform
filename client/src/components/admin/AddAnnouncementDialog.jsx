import PropTypes from 'prop-types';
import { useState, useRef, useEffect } from 'react';
import SecondaryButton from '../shares/SecondaryButton';
import OutlineButton from '../shares/OutlineButton';
import { sendAnnouncement, editAnnouncement } from '../../api/adminAPI';

const AddAnnouncementDialog = ({ isOpen, onClose, onSave, announcementToEdit }) => {
  const isEditMode = Boolean(announcementToEdit);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const fileInputRef = useRef(null);
  const defaultImage =
    'https://images.ctfassets.net/h67z7i6sbjau/5zteWRcC1qbgLZoClcMmYl/a0391fdc321eddce7de41152108723b5/Brand_Guidelines_hero_2x.jpg?fm=webp&q=85';

  useEffect(() => {
    if (announcementToEdit) {
      setTitle(announcementToEdit.title);
      setContent(announcementToEdit.script);
      setPreviewImage(announcementToEdit.imageURL || defaultImage);
      setImage(null); // Only set file if user re-uploads
    } else {
      setTitle('');
      setContent('');
      setImage(null);
      setPreviewImage(null);
    }
  }, [announcementToEdit, isOpen]);

  const handleSave = async () => {
    if (!title || !content) return;

    const announcementData = {
      title: title,
      script: content,
      imageURL: image ? URL.createObjectURL(image) : (previewImage || defaultImage),
    };

    try {
      let response;
      if (isEditMode) {
        response = await editAnnouncement(announcementToEdit.id, announcementData);
      } else {
        response = await sendAnnouncement(announcementData);
      }
      onClose();
      onSave(response);
      setTitle('');
      setContent('');
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error(`${isEditMode ? 'Edit' : 'Send'} announcement error:`, error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setPreviewImage(null);
    }
  };

  const handleButtonClick = () => fileInputRef.current.click();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--secondary)' }}>
          {isEditMode ? 'Edit Announcement' : 'Add Announcement'}
        </h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            className="w-full p-2 bg-gray-100 rounded border border-gray-200"
            placeholder="Enter announcement title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
          <textarea
            className="w-full p-2 bg-gray-100 rounded border border-gray-200 h-24"
            placeholder="Enter announcement content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Add Image</label>
          <button
            onClick={handleButtonClick}
            className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Upload Image
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />

          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              className="mt-2 rounded max-h-40 object-cover"
            />
          )}
        </div>

        <div className="flex justify-end space-x-2">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title={isEditMode ? 'Update' : 'Save'} onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

AddAnnouncementDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  announcementToEdit: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    script: PropTypes.string,
    imageURL: PropTypes.string,
  }),
};

export default AddAnnouncementDialog;
