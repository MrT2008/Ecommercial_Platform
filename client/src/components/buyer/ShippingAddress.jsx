import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import TitlePage from "../../components/shares/TitlePage"; 
import PropTypes from "prop-types";
import ManageAddressDialog from "../../pages/buyer/ManageAddressDialog";

const ShippingAddress = ({ onAddressChange }) => {
    const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState({
        name: "Nguyen Kieu Phuong",
        phone: "(+84) 987 776 668",
        address: "Đường Trần Đại Nghĩa, Linh Xuân, Thủ Đức, Phường Linh Xuân, Thành Phố Thủ Đức, TP. Hồ Chí Minh",
        isDefault: true,
        id: 1
    });

    // Notify parent component when address changes
    useEffect(() => {
        if (onAddressChange) {
            onAddressChange(selectedAddress);
        }
    }, [selectedAddress, onAddressChange]);

    const handleAddressSelected = (address) => {
        setSelectedAddress(address);
    };

    return (
        <>
            <div className="p-6 border m-8 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                    <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: "var(--secondary)" }} className="text-2xl mr-2" />
                    <TitlePage title="Shipping address" />
                    <div className="ml-auto text-gray-500 hover:text-gray-700 text-2xl">
                        <button title="Edit" onClick={() => setIsAddressDialogOpen(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                    </div>
                </div>

                <div className="ml-8 space-y-2">
                    <div className="flex items-center">
                        <label className="font-semibold text-base w-40">Recipient Name:</label>
                        <input
                            type="text"
                            value={selectedAddress.name}
                            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1"
                            readOnly
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="font-semibold text-base w-40">Phone Number:</label>
                        <input
                            type="text"
                            value={selectedAddress.phone}
                            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1"
                            readOnly
                        />
                    </div>

                    <div className="flex items-center">
                        <label className="font-semibold text-base w-40">Delivery Address:</label>
                        <input
                            type="text"
                            value={selectedAddress.address}
                            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 text-base flex-1 py-1"
                            readOnly
                        />
                    </div>
                </div>
            </div>
            
            {/* Address Management Dialog */}
            <ManageAddressDialog
                isOpen={isAddressDialogOpen}
                onClose={() => setIsAddressDialogOpen(false)}
                onSelectAddress={handleAddressSelected}
                defaultAddressId={selectedAddress?.id}
            />
        </>
    );
};

// validation
ShippingAddress.propTypes = {
    onAddressChange: PropTypes.func
};

export default ShippingAddress;