import React from "react";
import Button from "../shares/Button";

const BecomeSellerForm = () => {
    return (
        <div className="flex flex-col justify-center w-full md:w-3/4 lg:w-1/2 mx-auto px-4">
        <div className="flex justify-center pb-6 md:pb-10 flex-wrap">
            <h2 className="font-bold text-3xl md:text-4xl pr-1 text-center">Become a Seller</h2>
        </div>
        <form className="flex flex-col justify-center items-start w-full mx-auto">
            <label className="w-full text-lg font-semibold">Enter your shop information</label>
            <input
            type="text"
            placeholder="Shop Name"
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
            name="username"
            />
    
            <input
            type="email"
            placeholder="Email"
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
            name="email"
            />

            <input
            type="text"
            placeholder="Phone Number"
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
            name="phoneNumber"
            />

            <label className="w-full mt-2 text-lg">Default Bank Account</label>
            <input
            type="text"
            placeholder="Bank"
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
            name="Bank"
            />

            <input
            type="text"
            placeholder="Account Number"
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
            name="accountNumber"
            />

            <label className="w-full text-lg">Default Shop Address</label>
            <input
            type="text"
            placeholder="Default Address"
            className="mt-2 mb-2 py-2 border-b-2 w-full outline-0"
            name="streetAddress"
            />

            <Button
            type="submit"
            text="Create Seller Account"
            otherClassName="yellow text-sm w-full rounded-lg py-4 font-bold mt-4 text-xl"
            />
            

        </form>
    </div>
)}

export default BecomeSellerForm;