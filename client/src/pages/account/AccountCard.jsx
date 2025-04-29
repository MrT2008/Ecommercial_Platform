import React, { useState } from "react"; 
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddNewCardDialog from "../../pages/account/AddNewCardDialog"; 

const AccountAddress = () => {
  const [cards, setAddresses] = useState([ 
    {
      name: "Nguyen Kieu Phuong",
      number: "987777666",
      bank:"MB Bank",
      isDefault: true,
    },
    {
      name: "Nguyen Kieu Phuong",
      number: "987777666",
      bank:"MB Bank",
      isDefault: false,
    },
    {
      name: "Nguyen Kieu Phuong",
      number: "987777666",
      bank:"MB Bank",
      isDefault: false,
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddCard = (newCard) => {
    setAddresses((prev) => [...prev, { ...newCard }]);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-10 px-8 max-w-5xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Credit Cards</h2>
          <SecondaryButton title="Add new card" onClick={() => setIsDialogOpen(true)} />
        </div>

        {/* Address List */}
        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={index} // Sử dụng index làm key
              className="bg-white p-6 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="font-bold flex items-center gap-2">
                  {card.name}
                  {card.isDefault && (
                    <span className="text-sm text-orange-500 font-semibold">
                      default
                    </span>
                  )}
                </p>
                <p>{card.number}</p>
                <p>{card.bank}</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-blue-500" onClick={() => alert("Edit address")}>
                  edit
                </button>
                <button className="text-red-500" onClick={() => alert("Delete address")}>
                  delete
                </button>
                <button
                  className={`px-4 py-2 rounded border transition ${
                    card.isDefault
                      ? "bg-gray-200 text-gray-600 hover:bg-gray-300"
                      : "text-current border-current hover:bg-gray-100"
                  }`}
                  style={{
                    color: card.isDefault ? "gray" : "var(--main)",
                    borderColor: card.isDefault ? "gray" : "var(--main)",
                    backgroundColor: card.isDefault ? "transparent" : "transparent",
                  }}
                  onClick={() => {
                    if (!card.isDefault) alert("Set as default");
                  }}
                >
                  {card.isDefault ? "Set as Default" : "Set as default"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Add New Address Dialog */}
      <AddNewCardDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleAddCard}
      />
    </div>
  );
};

export default AccountAddress;