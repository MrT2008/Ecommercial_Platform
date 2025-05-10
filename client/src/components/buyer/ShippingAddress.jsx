import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TitlePage from "../../components/shares/TitlePage"; 
import PropTypes from "prop-types";
import { useState } from "react";
import AddressDialog from "../../pages/buyer/AddressDialog"; 

const ShippingAddress = ({  initialRecipientName, initialPhoneNumber, initialDeliveryAddress  }) => {

    const [showDialog, setShowDialog] = useState(false);
    const [recipientName, setRecipientName] = useState(initialRecipientName);
    const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
    const [deliveryAddress, setDeliveryAddress] = useState(initialDeliveryAddress);

    const handleEditClick = () => {
        setShowDialog(true);
    };

    return (
        <div className="p-6 border m-8 rounded-lg shadow-sm">
            <div className="flex items-center mb-4">
                <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "var(--secondary)" }} className="text-2xl mr-2" />
                <TitlePage title="Shipping address" />
                <div className="ml-auto text-gray-500 hover:text-gray-700 text-2xl">
                    <button title="Edit" onClick={handleEditClick}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </div>
                {showDialog && (
                <AddressDialog
                onClose={() => setShowDialog(false)}
                onUpdateAddress={(newAddress) => {
                    setRecipientName(newAddress.name);
                    setPhoneNumber(newAddress.phone);
                    setDeliveryAddress(newAddress.address);
                    setShowDialog(false); // đóng dialog sau khi chọn
                }}
            />
            
            )}
            </div>

            <div className="ml-8 space-y-2">
                <div className="flex items-center">
                    <label className="font-semibold text-base w-40">Recipient Name:</label> 
                    <p>{recipientName}
                        {/* type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1" */}
                    </p>
                </div>

                <div className="flex items-center">
                    <label className="font-semibold text-base w-40">Phone Number:</label>
                    <p>{phoneNumber}
                        {/* type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1" */}
                    </p>
                </div>

                <div className="flex items-center">
                    <label className="font-semibold text-base w-40">Delivery Address:</label>
                    <p>{deliveryAddress}
                        {/* type="text"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1" */}
                    </p>
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
    initialRecipientName: PropTypes.string.isRequired,
    initialPhoneNumber: PropTypes.string.isRequired,
    initialDeliveryAddress: PropTypes.string.isRequired,
};

export default ShippingAddress;







