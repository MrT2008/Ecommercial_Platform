import React, { useState } from "react";
import PropTypes from "prop-types";
import SecondaryButton from "../../components/shares/SecondaryButton";
import OutlineButton from "../../components/shares/OutlineButton";

const ReviewDialog = ({ isOpen, onClose, onSave, order }) => {
  if (!isOpen || !order) return null;

  const [reviews, setReviews] = useState(
    order.items.map((item) => ({
      itemId: item.name,
      content: "",
      rating: 0,
      image: null,
    }))
  );

  const handleRatingChange = (index, rating) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].rating = rating;
    setReviews(updatedReviews);
  };

  const handleContentChange = (index, content) => {
    const updatedReviews = [...reviews];
    updatedReviews[index].content = content;
    setReviews(updatedReviews);
  };

  const handleImageUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedReviews = [...reviews];
      updatedReviews[index].image = URL.createObjectURL(file);
      setReviews(updatedReviews);
    }
  };

  const handleSave = () => {
    onSave(reviews);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-[700px]">
        <h2 className="text-xl font-bold text-[#FFA50B] mb-4">Review</h2>
        <div className="overflow-y-auto max-h-[60vh]">
        {order.items.map((item, index) => (
          <div key={index} className="mb-6 shadow-md p-4 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">Type: {item.type}</p>
                <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
              </div>
              <div className="ml-auto">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-xl ${
                      star <= reviews[index].rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                    onClick={() => handleRatingChange(index, star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <textarea
              placeholder="Content"
              value={reviews[index].content}
              onChange={(e) => handleContentChange(index, e.target.value)}
              className="w-full h-24 border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-[#FFA50B] focus:border-[#FFA50B]"
            />
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Add Image</label>
                <div className="flex items-center gap-4">
                    <label className="border rounded px-4 py-2 flex items-center gap-2 cursor-pointer">
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(index, e)}
                    />
                    <div className="flex items-center gap-2 justify-center">
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
                        Upload Image
                    </div>
                    </label>
                    {reviews[index].image && (
                    <img
                        src={reviews[index].image}
                        alt="Uploaded"
                        className="w-12 h-12 object-cover rounded"
                    />
                    )}
                </div>
                </div>
          </div>
        ))}
        </div>
        <div className="flex justify-end gap-4">
          <OutlineButton title="Cancel" onClick={onClose} />
          <SecondaryButton title="Save" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

ReviewDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

export default ReviewDialog;