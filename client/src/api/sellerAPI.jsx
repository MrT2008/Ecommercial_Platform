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
    const userDataString = localStorage.getItem("userData") || localStorage.getItem("user");
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
    const sessionDataString = sessionStorage.getItem("userData") || sessionStorage.getItem("user");
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

// Banner API functions
export const getBanners = async (shopId) => {
  try {
    const response = await fetch(`http://localhost:8080/seller/banner/${shopId}`);
    if (!response.ok) {
      throw new Error(`Không thể lấy banners: ${response.status}`);
    }
    const data = await response.json();
    return data.banners || [];
  } catch (error) {
    console.error("Lỗi khi lấy banners:", error);
    throw error;
  }
};

export const createBanner = async (shopId, bannerData) => {
  try {
    const formData = new FormData();
    formData.append("title", bannerData.title);
    formData.append("type", "banner");

    // Nếu image là File object, sử dụng nó; nếu là data URL, chuyển đổi thành File
    if (bannerData.image instanceof File) {
      formData.append("image", bannerData.image);
    } else if (typeof bannerData.image === "string" && bannerData.image.startsWith("data:")) {
      // Convert data URL to File object
      const res = await fetch(bannerData.image);
      const blob = await res.blob();
      const file = new File([blob], "banner-image.jpg", { type: blob.type });
      formData.append("image", file);
    }

    const response = await fetch(`http://localhost:8080/seller/banner/${shopId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Không thể tạo banner: ${response.status}`);
    }

    const data = await response.json();
    return data.banner;
  } catch (error) {
    console.error("Lỗi khi tạo banner:", error);
    throw error;
  }
};

export const updateBannerStatus = async (shopId, bannerId, isActive) => {
  try {
    const response = await fetch(`http://localhost:8080/seller/banner/${shopId}/${bannerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: isActive ? "active" : "inactive",
      }),
    });

    if (!response.ok) {
      throw new Error(`Không thể cập nhật trạng thái banner: ${response.status}`);
    }

    const data = await response.json();
    return data.banner;
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái banner:", error);
    throw error;
  }
};

export const deleteBanner = async (shopId, bannerId) => {
  try {
    const response = await fetch(`http://localhost:8080/seller/banner/${shopId}/${bannerId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Không thể xóa banner: ${response.status}`);
    }

    return true;
  } catch (error) {
    console.error("Lỗi khi xóa banner:", error);
    throw error;
  }
};
