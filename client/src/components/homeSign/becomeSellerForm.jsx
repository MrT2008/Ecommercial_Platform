import React from "react";
import Button from "../shares/Button";
import { useState } from "react";
import { createShop } from "../../api/buyerAPI";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const BecomeSellerForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        shopName: "",
        email: "",
        phoneNumber: "",
        bankName: "",
        accountNumber: "",
        streetAddress: ""
    });
    const { user } = useAuth(); 
    const handleCreateShop = async (e) => {
        e.preventDefault();
        const buyerID = user.id;
        const { shopName, email, phoneNumber, bankName, accountNumber, streetAddress } = formData;
        if (!shopName || !email || !phoneNumber || !bankName || !accountNumber || !streetAddress) {
            alert("Please fill in all fields.");
            return;
        }
        const data = {
            name: shopName,
            email: email,
            phone: phoneNumber,
            bankName: bankName,
            address: streetAddress,
            bankAccount: accountNumber,
        };
        const success = await createShop( data, buyerID );
        if (success) {
            console.log("Shop created successfully!", data, buyerID);
            setFormData({
                shopName: "",
                email: "",
                phoneNumber: "",
                bankName: "",
                accountNumber: "",
                streetAddress: ""
            });
            // alert("Successfully create shop.");
            // navigate(`/shop/${buyerID}/${shopID}`);
            navigate(`/shop`);
        }
        else {
            alert("Failed to create shop. Please try again");
            return;
        }
    }   

    return (
        <div className="flex flex-col justify-center w-full md:w-3/4 lg:w-1/2 mx-auto px-4">
        <div className="flex justify-center pb-6 md:pb-10 flex-wrap">
            <h2 className="font-bold text-3xl md:text-4xl pr-1 text-center">Become a Seller</h2>
        </div>
        <form className="flex flex-col justify-center items-start w-full mx-auto"
            onSubmit={handleCreateShop}
        >
            {/* Shop Info Section */}
            <div className="w-full mb-6">
                <label className="w-full text-lg font-semibold mb-2 block">Enter your shop information</label>
                <input
                    type="text"
                    placeholder="Shop Name"
                    className="mt-2 mb-2 py-2 border-b w-full outline-0"
                    value={formData.shopName}
                    onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="mt-2 mb-2 py-2 border-b w-full outline-0"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {formData.email && !/\S+@\S+\.\S+/.test(formData.email) && (
                    <p className="text-red-500 text-sm">Please enter a valid email address.</p>
                )}
                <input
                    type="text"
                    placeholder="Phone Number"
                    className="mt-2 mb-2 py-2 border-b w-full outline-0"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                />
                {formData.phoneNumber && !/^[0-9]{10,11}$/.test(formData.phoneNumber) && (
                    <p className="text-red-500 text-sm">Please enter a valid phone number.</p>
                )}
            </div>

            {/* Bank Info Section */}
            <div className="w-full mb-6">
                <label className="w-full text-lg font-semibold mb-2 block">Default Bank Account</label>
                <input
                    type="text"
                    placeholder="Bank"
                    className="mt-2 mb-2 py-2 border-b w-full outline-0"
                    value={formData.bankName}
                    onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Account Number"
                    className="mt-2 mb-2 py-2 border-b w-full outline-0"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                />
            </div>

            {/* Address Section */}
            <div className="w-full mb-6">
                <label className="w-full text-lg font-semibold mb-2 block">Default Shop Address</label>
                <input
                    type="text"
                    placeholder="Default Address"
                    className="mt-2 mb-2 py-2 border-b w-full outline-0"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                />
            </div>

            <Button
                type="submit"
                text="Create Seller Account"
                otherClassName="yellow text-sm w-full rounded-lg py-4 font-bold text-md"
            />
        </form>

    </div>
)}

export default BecomeSellerForm;