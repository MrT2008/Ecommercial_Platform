// components/ReviewList.jsx
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import TitleSection from "../shares/TitleSection";
import PropTypes from 'prop-types';
import Pagination from "../shares/Pagination";

const ReviewList = ({ reviews }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 3;
    
    // Calculate the reviews to display on the current page
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
    
    // Calculate total number of pages
    const totalPages = Math.ceil(reviews.length / reviewsPerPage);
    
    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    
    return (
        <div>
            {/* TitleSection remains outside the border */}
            <div className="mb-6">
                <TitleSection title="Reviews" />
            </div>

            {/* Only the review list and pagination are inside the bordered container */}
            <div className="border-1 border-gray-400 rounded p-6 space-y-6">
                {currentReviews.map((review) => (
                <div key={review.id} className="border-b border-gray-300 pb-6 last:border-b-0">
                    <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-3">
                        <span className="font-medium text-blue-800">
                        {review.user.charAt(0)}
                        </span>
                    </div>
                    <div>
                        <h4 className="font-medium">{review.user}</h4>
                        <div className="flex items-center">
                        <div className="flex text-yellow-400">
                            {Array(review.rating)
                            .fill()
                            .map((_, i) => (
                                <FontAwesomeIcon key={i} icon={faStar} className="text-xs" />
                            ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">{review.date}</span>
                        </div>
                    </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                </div>
                ))}

                {/* Pagination controls */}
                {totalPages > 1 && (
                <div className="pt-4">
                    <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                    totalItems={reviews.length}
                    itemsPerPage={reviewsPerPage}
                    />
                </div>
                )}
            </div>
            </div>
    );
};

ReviewList.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            user: PropTypes.string.isRequired,
            rating: PropTypes.number.isRequired,
            date: PropTypes.string.isRequired,
            comment: PropTypes.string.isRequired
        })
    ).isRequired
};

export default ReviewList;