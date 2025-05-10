import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import SecondaryButton from "../../components/shares/SecondaryButton";
import OutlineButton from "../../components/shares/OutlineButton";

const AddBannerDialog = ({ isOpen, onClose, onSave, editBanner = null }) => {
  const [title, setTitle] = useState(editBanner ? editBanner.title : "");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(editBanner ? editBanner.imageURL : null);

  useEffect(() => {
    if (editBanner) {
      setTitle(editBanner.title);
      setImagePreview(editBanner.imageURL);
    } else {
      setTitle("");
      setImage(null);
      setImagePreview(null);
    }
  }, [editBanner, isOpen]);

  const handleSave = () => {
    const bannerData = {
      id: editBanner ? editBanner.id : Date.now(), // Generate ID if new banner
      title,
      image,
      isActive: editBanner ? editBanner.isActive : true,
    };

    onSave(bannerData);
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setTitle("");
    setImage(null);
    setImagePreview(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Lưu trữ File object cho việc gửi lên server
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result); // Lưu trữ data URL cho việc hiển thị preview
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-lg p-6">
        <h2 className="text-2xl font-bold text-orange-400 mb-8">
          {editBanner ? "Chỉnh sửa Banner" : "Thêm Banner mới"}
        </h2>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Tiêu đề</label>
          <input
            className="w-full p-3 bg-gray-100 rounded border-0"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-8">
          <label className="block mb-2 font-medium">Thêm hình ảnh</label>
          <div>
            {imagePreview && (
              <div className="mb-2">
                <img
                  src={imagePreview}
                  alt="Banner preview"
                  className="h-24 object-cover rounded"
                />
              </div>
            )}
            <label className="inline-block border border-gray-300 rounded p-3 cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
                  />
                </svg>
                Tải lên ảnh
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <OutlineButton title="Hủy" onClick={onClose} />
          <SecondaryButton title="Lưu" onClick={handleSave} disabled={!title || !imagePreview} />
        </div>
      </div>
    </div>
  );
};

AddBannerDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  editBanner: PropTypes.object,
};

export default AddBannerDialog;
