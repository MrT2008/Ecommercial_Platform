// src/api/sellerAPI.jsx

export const getSellerId = () => {
    // PHƯƠNG PHÁP 1: Lấy từ React Router (URL)
    try {
      const match = window.location.pathname.match(/\/seller\/(\d+)/);
      if (match && match[1]) {
        return match[1];
      }
    } catch (e) {
      console.error("Không thể lấy sellerId từ URL:", e);
    }
  
    // PHƯƠNG PHÁP 2: Lấy từ localStorage
    try {
      const userDataString = localStorage.getItem('userData') || localStorage.getItem('user');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        if (userData && (userData.shopId || userData.id)) {
          return userData.shopId || userData.id;
        }
      }
    } catch (e) {
      console.error("Không thể lấy sellerId từ localStorage:", e);
    }
  
    // PHƯƠNG PHÁP 3: Lấy từ sessionStorage
    try {
      const sessionDataString = sessionStorage.getItem('userData') || sessionStorage.getItem('user');
      if (sessionDataString) {
        const sessionData = JSON.parse(sessionDataString);
        if (sessionData && (sessionData.sellerId || sessionData.id)) {
          return sessionData.sellerId || sessionData.id;
        }
      }
    } catch (e) {
      console.error("Không thể lấy sellerId từ sessionStorage:", e);
    }
  
    // Mặc định trả về 1 nếu không tìm thấy
    console.warn("Không tìm thấy sellerId, sử dụng giá trị mặc định: 1");
    return 1;
  };
  

export const getShopIdFromUserId = async (userId) => {
    try {
      const res = await fetch(`http://localhost:8080/seller/getShop/${userId}`);
      if (!res.ok) {
        throw new Error(`Không thể lấy shop: ${res.status}`);
      }
  
      const data = await res.json();
      return data.data.shop.id; // Trả về shopId
    } catch (err) {
      console.error("Lỗi khi lấy shopId từ userId:", err);
      throw err;
    }
  };
  