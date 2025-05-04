import api from "./axios";

export const createShop = async (shopData, buyerID) => {
  try {
    const response = await api.post(`/buyer/${buyerID}/shop/create`, shopData)
    if ((response.status === 201)||(response.status === 200)) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error creating shop:", error);
    return false;
  }
}
export const addToCart = async (buyerID, productID, quantity) => {
  try {
    const response = await api.post(`/buyer/${buyerID}/product/addToCart`, {
      productId: productID,
      quantity,
    });
    console.log("Response from addToCart:", response.data);
    return response.data
  } catch (error) {
    console.error("Error adding to cart:", error);
    return null;
  }
}

export const getCartById = async (buyerID) => {
  try {
    const response = await api.get(`/buyer/${buyerID}/cart`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return null;
  }
}

//Manage account
export function getBuyerId() {
  try {
    const raw = localStorage.getItem("user");  // key bạn dùng khi login
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user.id || user.buyerId || null;
  } catch (err) {
    console.error("buyerAPI.getBuyerId error:", err);
    return null;
  }
}

export const viewPendingOrders = async () => {
  const buyerID = getBuyerId();
  if (!buyerID) throw new Error("No buyerId");
  const res = await api.get(`/buyer/${buyerID}/order/pending`);
  return res.data.orders || [];
};

export const viewProcessingOrders = async () => {
  const buyerID = getBuyerId();
  if (!buyerID) throw new Error("No buyerId");
  const res = await api.get(`/buyer/${buyerID}/order/processing`);
  return res.data.orders || [];
};

export const viewCompletedOrders = async () => {
  const buyerID = getBuyerId();
  if (!buyerID) throw new Error("No buyerId");
  const res = await api.get(`/buyer/${buyerID}/order/completed`);
  return res.data.orders || [];
};

export const viewCancelledOrders = async () => {
  const buyerID = getBuyerId();
  if (!buyerID) throw new Error("No buyerId");
  const res = await api.get(`/buyer/${buyerID}/order/cancelled`);
  return res.data.orders || [];
};

// Edit Profile
export const updateProfile = async (buyerID, payload) => {
  // api là instance axios đã config baseURL + headers chung
  const response = await api.put(`/buyer/${buyerID}/editProfile`, payload);
  // axios tự động set application/json và stringify payload nếu là object
  if (response.status !== 200 && response.status !== 201) {
    throw new Error(response.statusText);
  }
  return response.data;
};

//Account Address
export const getShippingInfo = async (buyerID) => {
  const res = await api.get(`/buyer/${buyerID}/shippingInfo`);
  return res.data.userShippingInfo;
};

export const addShippingInfo = async (buyerID, payload) => {
  const res = await api.post(`/buyer/${buyerID}/shippingInfo`, payload);
  return res.data;
};

export const updateShippingInfo = async (buyerID, payload) => {
  const res = await api.put(`/buyer/${buyerID}/shippingInfo/edit`, payload);
  return res.data;
};

export const removeShippingInfo = async (buyerID, payload) => {
  const res = await api.put(
    `/buyer/${buyerID}/shippingInfo/remove`,
    { id: payload.id }
  );
  return res.data;
};

export const setDefaultShippingInfo = async (buyerID, payload) => {
  const res = await api.put(`/buyer/${buyerID}/shippingInfo/setdefault`, payload);
  return res.data;
};

export const updateCart = async (buyerID, productID, quantity) => {
  try {
    const response = await api.put(`/buyer/${buyerID}/cart/update`, {
      productId: productID,
      quantity,
    });
    return true;
  } catch (error) {
    console.error("Error updating cart:", error);
    return false;
  }
}

export const removeFromCart = async (buyerID, productID) => {
  try {
    const response = await api.put(`/buyer/${buyerID}/cart/remove`, {
      productId: productID,
    });
    return true;
  } catch (error) {
    console.error("Error removing from cart:", error);
    return false;
  }
}

export const getShippingInfo = async (buyerID) => {
  try {
    const response = await api.get(`/buyer/${buyerID}/shippingInfo`);
    return response.data;
  } catch (error) {
    console.error("Error fetching shipping info:", error);
    return null;
  }
}

export const proceedWithCheckout = async (buyerID, paymentMethod, productId) => {
  try {
    const response = await api.post(`/buyer/${buyerID}/checkout`, {
      paymentMethod,
      productId,
    });
    return response.data;
  } catch (error) {
    console.error("Error proceeding with checkout:", error);
    return null;
  }
}

export const getAllOrdersByStatus = async (buyerID, status) => {
  try {
    const response = await api.get(`/buyer/${buyerID}/order/${status}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by status:", error);
    return null;
  }
}

//Manage account
export function getBuyerId() {
  try {
    const raw = localStorage.getItem("user");  // key bạn dùng khi login
    if (!raw) return null;
    const user = JSON.parse(raw);
    return user.id || user.buyerId || null;
  } catch (err) {
    console.error("buyerAPI.getBuyerId error:", err);
    return null;
  }
}