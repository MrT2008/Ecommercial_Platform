// components/Pagination.jsx
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    // totalItems, 
    // itemsPerPage 
}) => {
    // const indexOfFirstItem = (currentPage - 1) * itemsPerPage + 1;
    // const indexOfLastItem = Math.min(currentPage * itemsPerPage, totalItems);
    
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };
    
    const goToPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    
    return (
        <div className="flex justify-between items-center pt-4">
            {/* <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem}-{indexOfLastItem} of {totalItems} items
            </div> */}
            <div className="flex items-center space-x-2">
                <button 
                    onClick={goToPrevPage} 
                    disabled={currentPage === 1}
                    className={`p-2 rounded-md ${currentPage === 1 ? 'text-gray-500 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                    <FontAwesomeIcon icon={faChevronLeft} className="text-xs" />
                </button>
                
                <div className="flex space-x-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <button
                            key={pageNum}
                            onClick={() => onPageChange(pageNum)}
                            className={`w-8 h-8 flex items-center justify-center rounded-md ${
                                pageNum === currentPage 
                                ? 'text-[#FFA50B] hover:bg-gray-100'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                        >
                            {pageNum}
                        </button>
                    ))}
                </div>
                
                <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-md ${currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700 hover:bg-gray-100'}`}
                >
                    <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                </button>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired
};

export default Pagination;