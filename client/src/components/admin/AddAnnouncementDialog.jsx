import PropTypes from 'prop-types';
import { useState } from 'react';
import SecondaryButton from '../shares/SecondaryButton';
import OutlineButton from '../shares/OutlineButton';

// Announcement Modal Component

const AddAnnouncementDialog = ({ isOpen, onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
  
    const handleSave = () => {
      onSave({ title, content, image });
      setTitle('');
      setContent('');
      setImage(null);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-full max-w-md p-6">
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--secondary)" }} >Add Announcement</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full p-2 bg-gray-100 rounded border border-gray-200"
              placeholder="Hunting for discount code 8/3"
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
            <button className="flex items-center border border-gray-300 rounded px-4 py-2 text-sm hover:bg-gray-50">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Upload Image
            </button>
          </div>
          
          <div className="flex justify-end space-x-2">
            <OutlineButton title={"Cancel"} onClick={onClose}></OutlineButton>
            <SecondaryButton title={"Save"} onClick={handleSave}></SecondaryButton>
          </div>
        </div>
      </div>
    );
  };
  
  AddAnnouncementDialog.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired
  };
  
  
  
export default AddAnnouncementDialog;