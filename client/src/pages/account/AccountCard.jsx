import { useState, useEffect } from "react";
import Sidebar from "../../components/account/accountSidebar";
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddNewCardDialog from "../../pages/account/AddNewCardDialog";

const AccountAddress = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  // Nếu API cần userId là số
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
          id: item.id,
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
  const handleSaveCard = async (formData) => {
    try {
      console.log("Saving card with data:", formData);
      console.log("User ID:", userId);
      
      if (editingCard && editingCard.index !== undefined) {
        // Xử lý chỉnh sửa thẻ
        console.log("Editing card:", editingCard);
        await fetch(`http://localhost:8080/buyer/${userId}/payment/remove`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: cards[editingCard.index].id
          })
        });
        
        await fetch(`http://localhost:8080/buyer/${userId}/payment/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bankName: formData.bank,
            bankAccountNumber: formData.number,
            inUsed: formData.isDefault
          })
        });
      } else {
        // Thêm thẻ mới
        console.log("Adding new card");
        const response = await fetch(`http://localhost:8080/buyer/${userId}/payment/`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            bankName: formData.bank,
            bankAccountNumber: formData.number,
            inUsed: formData.isDefault
          })
        });
        
        const result = await response.json();
        console.log("API response:", result);
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to add payment method');
        }
      }
      
      // Cập nhật UI tạm thời
      setCards((prev) => {
        const updated = prev.map((card) => ({
          ...card,
          isDefault: formData.isDefault ? false : card.isDefault,
        }));

        if (editingCard && editingCard.index !== undefined) {
          const newCard = {
            number: formData.number,
            bank: formData.bank,
            isDefault: formData.isDefault
          };
          updated[editingCard.index] = newCard;
          return updated;
        } else {
          return [
            ...updated, 
            {
              number: formData.number,
              bank: formData.bank,
              isDefault: formData.isDefault
            }
          ];
        }
      });
      
      // Fetch lại dữ liệu từ server sau khi thêm/sửa
      setTimeout(() => {
        fetch(`http://localhost:8080/buyer/${userId}/payment/`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Refreshed payment data:", data);
            const serverCards = data.paymentMethodList.map((item) => ({
              id: item.id,
              number: item.bankAccountNumber,
              bank: item.bankName,
              isDefault: item.inUsed,
            }));
            setCards(serverCards);
          })
          .catch((err) => {
            console.error("Failed to refresh payment methods:", err);
          });
      }, 500); // Đợi 500ms để đảm bảo API đã xử lý xong
    } catch (error) {
      console.error("Error saving payment method:", error);
      alert("Không thể lưu thẻ thanh toán: " + error.message);
    }
    
    setIsDialogOpen(false);
    setEditingCard(null);
  };

  // Xóa thẻ
  const handleDelete = async (index) => {
    if (window.confirm("Are you sure you want to delete this card?")) {
      try {
        console.log("Deleting card:", cards[index]);
        const response = await fetch(`http://localhost:8080/buyer/${userId}/payment/remove`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            paymentId: cards[index].id
          })
        });
        
        const result = await response.json();
        console.log("Delete API response:", result);
        
        if (!response.ok) {
          throw new Error(result.message || 'Failed to delete payment method');
        }
        
        // Cập nhật UI tạm thời
        setCards((prev) => prev.filter((_, i) => i !== index));
        
        // Fetch lại dữ liệu từ server sau khi xóa
        setTimeout(() => {
          fetch(`http://localhost:8080/buyer/${userId}/payment/`)
            .then((res) => res.json())
            .then((data) => {
              console.log("Refreshed payment data after delete:", data);
              const serverCards = data.paymentMethodList.map((item) => ({
                id: item.id,
                number: item.bankAccountNumber,
                bank: item.bankName,
                isDefault: item.inUsed,
              }));
              setCards(serverCards);
            })
            .catch((err) => {
              console.error("Failed to refresh payment methods after delete:", err);
            });
        }, 500);
      } catch (error) {
        console.error("Error deleting payment method:", error);
        alert("Không thể xóa thẻ thanh toán: " + error.message);
      }
    }
  };

  // Đặt làm default
  const handleSetDefault = async (index) => {
    try {
      console.log("Setting card as default:", cards[index]);
      const response = await fetch(`http://localhost:8080/buyer/${userId}/payment/setdefault`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentId: cards[index].id
        })
      });
      
      const result = await response.json();
      console.log("Set default API response:", result);
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to set default payment method');
      }
      
      // Cập nhật UI tạm thời
      setCards((prev) =>
        prev.map((card, i) => ({
          ...card,
          isDefault: i === index,
        }))
      );
      
      // Fetch lại dữ liệu từ server sau khi đặt default
      setTimeout(() => {
        fetch(`http://localhost:8080/buyer/${userId}/payment/`)
          .then((res) => res.json())
          .then((data) => {
            console.log("Refreshed payment data after set default:", data);
            const serverCards = data.paymentMethodList.map((item) => ({
              id: item.id,
              number: item.bankAccountNumber,
              bank: item.bankName,
              isDefault: item.inUsed,
            }));
            setCards(serverCards);
          })
          .catch((err) => {
            console.error("Failed to refresh payment methods after set default:", err);
          });
      }, 500);
    } catch (error) {
      console.error("Error setting default payment method:", error);
      alert("Không thể đặt thẻ thanh toán làm mặc định: " + error.message);
    }
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
                  {card.bank}
                  {card.isDefault && (
                    <span className="text-sm text-orange-500 font-semibold">
                      default
                    </span>
                  )}
                </p>
                <p>{card.number}</p>
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