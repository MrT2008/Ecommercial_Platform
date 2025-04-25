import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

// Announcement Card Component
const AnnouncementCard = ({ announcement }) => {
    return (
        <div className="flex items-center py-4 border-b border-gray-100 last:border-b-0">
            {/* Announcement Image */}
            <div className="w-16 h-16 mr-4 overflow-hidden rounded-lg">
                <img
                    src={announcement.image}
                    alt={announcement.title}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Announcement Details */}
            <div className="flex-1">
                <h3 className="font-medium text-base mb-1">{announcement.title}</h3>

                <div className="flex items-center mb-1">
                    <span className="flex items-center text-sm mr-4">
                        {announcement.script}
                    </span>
                    {/* <span className="flex items-center text-sm">
                        <span className="mr-1">🔝</span> {announcement.dealText}
                    </span> */}
                </div>

                {/* <div className="flex items-center text-sm text-gray-600">
                    <span className="flex items-center mr-4">
                        <span className="mr-1">⌚</span> Close orders at live.
                        <span className="ml-1 text-blue-500">🛒 Shop now</span>
                    </span>
                </div> */}

                <div className="text-sm text-gray-500 mt-1">
                    {announcement.time}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
                <button className="edit-btn border border-blue-300 text-blue-500 rounded px-4 py-1 text-sm flex items-center justify-center hover:bg-blue-50">
                    <FontAwesomeIcon icon={faPen} className="mr-1" /> Edit
                </button>
                <button className="delete-btn border border-red-500 text-red-500 rounded px-4 py-1 text-sm flex items-center justify-center hover:bg-red-50">
                    <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                </button>
            </div>

        </div>
    );
};

AnnouncementCard.propTypes = {
    announcement: PropTypes.shape({
      announcementID: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      script: PropTypes.string.isRequired,
      time: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }).isRequired,
  };
export default AnnouncementCard;