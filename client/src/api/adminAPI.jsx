
import api from "./axios";

export const getAllShops = async () => {
  try {
    const response = await api.get("/manager/shops");
    if (response.status === 200) {
      const data = response.data;
      const shops = data.shops || []; 
      return shops
    }
    return [];
  } catch (error) {
    console.error("Error fetching all shops:", error);
    return [];
  }
}

export const getShopById = async (shopId) => {
    try {
        const response = await api.get(`/manager/shops/${shopId}`);
        if (response.status === 200) {
            const data = response.data;
            const shop = data.shop || null; 
            return shop
        }
        return null;
    } catch (error) {
        console.error("Error fetching shop by ID:", error);
        return null;
    }
}

export const getAllPendingShops = async () => {
  try {
    const response = await api.get("/manager/shops/pendings");
    if (response.status === 200) {
      const data = response.data;
      const shops = data.shops || []; 
      return shops
    }
    return [];
  } catch (error) {
    console.error("Error fetching all pending shops:", error);
    return [];
  }
}

export const approveShop = async (shopId) => {
  try {
    const response = await api.put(`/manager/shops/approve/${shopId}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error approving shop:", error);
    return false;
  }
}

export const rejectShop = async (shopId) => {
  try {
    const response = await api.put(`/manager/shops/reject/${shopId}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error rejecting shop:", error);
    return false;
  }
}

export const getAllBannedShops = async () => {
  try {
    const response = await api.get("/manager/shops/banned");
    if (response.status === 200) {
      const data = response.data;
      const shops = data.shops || []; 
      return shops
    }
    return [];
  } catch (error) {
    console.error("Error fetching all banned shops:", error);
    return [];
  }
}

export const banShop = async (shopId, banReason) => {
  try {
    const response = await api.put(`/manager/shops/ban/${shopId}`, {
        reason: banReason,
        }
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error banning shop:", error);
    return false;
  }
}

export const unbanShop = async (shopId) => {
  try {
    const response = await api.put(`/manager/shops/unban/${shopId}`);
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error("Error unbanning shop:", error);
    return false;
  }
}

export const getAllAnouncements = async () => { // Fetch all announcements that are not deleted
    try {
        const response = await api.get("/manager/announcements");
        if (response.status === 200) {
        const data = response.data;
        const announcements = data.announcements || [];
         // Filter out deleted announcements
        const filteredAnnouncements = announcements.filter(announcement => announcement.isActive);
        return filteredAnnouncements;
        }
        return [];
    } catch (error) {
        console.error("Error fetching all announcements:", error);
        return [];
    }
}

export const sendAnnouncement = async (announcement) => {
    try {
        const response = await api.post("/manager/announcements/new", announcement);
        console.log("Announcement response:", response.data);
        return response.data.announcement;
    } catch (error) {
        console.error("Error sending announcement:", error);
    }
}
export const deleteAnnouncement = async (announcementId) => {
    try {
        const response = await api.put(`/manager/announcements/delete/${announcementId}`);
        if (response.status === 200) {
            console.log("Announcement deleted successfully:", response.data);
            return true;
        }
        return false;
    } catch (error) {
        console.error("Error deleting announcement:", error);
        return false;
    }
}

export const editAnnouncement = async (announcementId, announcement) => {
    try {
        const response = await api.put(`/manager/announcements/edit/${announcementId}`, announcement);
        console.log("Announcement edited successfully:", response.data);
        return response.data.editedAnnouncement;
    } catch (error) {
        console.error("Error editing announcement:", error);
        return false;
    }
}