import axios from "axios";

const API_URL = "http://localhost:8080";

const api = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

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