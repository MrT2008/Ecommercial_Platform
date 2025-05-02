import { useState, useEffect } from "react";
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddNewCardDialog from "../../pages/account/AddNewCardDialog";

const AccountAddress = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userId = storedUser?.id;
  const [cards, setCards] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  // 📦 Fetch API khi load page
  useEffect(() => {
    fetch(`http://localhost:8080/buyer/${userId}/payment/`)
      .then((res) => res.json())
      .then((data) => {
        const serverCards = data.paymentMethodList.map((item) => ({
          name: "Card Holder", // Không có từ API nên có thể cho nhập sau
          number: item.bankAccountNumber,
          bank: item.bankName,
          isDefault: item.inUsed,
        }));
        setCards(serverCards);
      })
      .catch((err) => {
        console.error("Failed to fetch payment methods:", err);
      });
  }, [userId]);

  // Mở dialog thêm mới
  const openAddDialog = () => {
    setEditingCard(null);
    setIsDialogOpen(true);
  };

  // Mở dialog chỉnh sửa
  const openEditDialog = (card, index) => {
    setEditingCard({ ...card, index });
    setIsDialogOpen(true);
  };

  // Lưu thẻ mới hoặc cập nhật thẻ cũ
  const handleSaveCard = (formData) => {
    const newCard = {
      name: formData.name,
      number: formData.number,
      bank: formData.bank,
      isDefault: formData.isDefault,
    };

    setCards((prev) => {
      const updated = prev.map((card) => ({
        ...card,
        isDefault: formData.isDefault ? false : card.isDefault,
      }));

      if (editingCard && editingCard.index !== undefined) {
        updated[editingCard.index] = newCard;
        return updated;
      } else {
        return [...updated, newCard];
      }
    });

    setIsDialogOpen(false);
    setEditingCard(null);
  };

  // Xóa thẻ
  const handleDelete = (index) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      setCards((prev) => prev.filter((_, i) => i !== index));
    }
  };

  // Đặt làm default
  const handleSetDefault = (index) => {
    setCards((prev) =>
      prev.map((card, i) => ({
        ...card,
        isDefault: i === index,
      }))
    );
  };

  return (
    <div className="min-h-screen flex">
      <Sidebar />

      <div className="w-4/5 p-6 py-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Credit Cards</h2>
          <SecondaryButton title="Add new card" onClick={openAddDialog} />
        </div>

        <div className="space-y-6">
          {cards.map((card, index) => (
            <div
              key={index}
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
                <button
                  className="text-blue-500"
                  onClick={() => openEditDialog(card, index)}
                >
                  edit
                </button>

                <button
                  className="text-red-500"
                  onClick={() => handleDelete(index)}
                >
                  delete
                </button>

                <button
                  disabled={card.isDefault}
                  className={`px-4 py-2 rounded border transition ${
                    card.isDefault
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "text-current border-current hover:bg-gray-100"
                  }`}
                  style={{
                    color: card.isDefault ? "gray" : "var(--main)",
                    borderColor: card.isDefault ? "gray" : "var(--main)",
                  }}
                  onClick={() => {
                    if (!card.isDefault) handleSetDefault(index);
                  }}
                >
                  Set as default
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddNewCardDialog
        isOpen={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
          setEditingCard(null);
        }}
        onSave={handleSaveCard}
        cardData={editingCard}
      />
    </div>
  );
};

export default AccountAddress;
