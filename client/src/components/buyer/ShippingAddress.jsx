import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TitlePage from "../../components/shares/TitlePage"; 
import PropTypes from "prop-types";
const ShippingAddress = ({ recipientName, phoneNumber, deliveryAddress }) => {
    return (
        <div className="p-6 border m-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "var(--secondary)" }} className="text-2xl mr-2" />
                <TitlePage title="Shipping address" />
                <div className="ml-auto text-gray-500 hover:text-gray-700 text-2xl">
                    <button title="Edit">
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
            </div>

            <div className="ml-8 space-y-2">
                <div className="flex items-center">
                    <label className="font-semibold text-base w-40">Recipient Name:</label>
                    <input
                        type="text"
                        defaultValue={recipientName}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1"
                    />
                </div>

                <div className="flex items-center">
                    <label className="font-semibold text-base w-40">Phone Number:</label>
                    <input
                        type="text"
                        defaultValue={phoneNumber}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1"
                    />
                </div>

                <div className="flex items-center">
                    <label className="font-semibold text-base w-40">Delivery Address:</label>
                    <input
                        type="text"
                        defaultValue={deliveryAddress}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1"
                    />
                </div>

                {/* <div className="flex justify-end mt-3">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-1.5 px-4 rounded text-sm">
                        Save
                    </button>
                </div> */}
            </div>
        </div>
    );
};
// validation
ShippingAddress.propTypes = {
    recipientName: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    deliveryAddress: PropTypes.string.isRequired,
};
export default ShippingAddress;
