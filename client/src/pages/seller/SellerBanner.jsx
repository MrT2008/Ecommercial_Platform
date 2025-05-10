import { useState, useEffect } from "react";
import SecondaryButton from "../../components/shares/SecondaryButton";
import Sidebar from "../../components/seller/sellerSidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import AddBannerDialog from "../../pages/seller/AddBannerDialog";
import {
  getSellerId,
  getBanners,
  createBanner,
  updateBannerStatus,
  deleteBanner,
} from "../../api/sellerAPI";
import { toast } from "react-toastify";

const SellerBanner = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const shopId = getSellerId();

  // Fetch banners when component mounts
  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const fetchedBanners = await getBanners(shopId);
      setBanners(fetchedBanners);
    } catch (error) {
      toast.error("Không thể tải banner: " + error.message);
      console.error("Lỗi khi tải banners:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteBanner(shopId, id);
      toast.success("Đã xóa banner thành công");
      loadBanners();
    } catch (error) {
      toast.error("Không thể xóa banner: " + error.message);
      console.error("Lỗi khi xóa banner:", error);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await updateBannerStatus(shopId, id, !currentStatus);
      toast.success("Đã cập nhật trạng thái banner");
      loadBanners();
    } catch (error) {
      toast.error("Không thể cập nhật trạng thái banner: " + error.message);
      console.error("Lỗi khi cập nhật trạng thái banner:", error);
    }
  };

  const handleOpenDialog = (banner = null) => {
    setEditingBanner(banner);
    setIsDialogOpen(true);
  };

  const handleSaveBanner = async (bannerData) => {
    try {
      await createBanner(shopId, bannerData);
      toast.success("Đã lưu banner thành công");
      loadBanners();
    } catch (error) {
      toast.error("Không thể lưu banner: " + error.message);
      console.error("Lỗi khi lưu banner:", error);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-6 py-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Banner Marketing</h2>
          <SecondaryButton title="Thêm banner mới" onClick={() => handleOpenDialog()} />
        </div>

        {loading ? (
          <div className="text-center py-10">Đang tải...</div>
        ) : banners.length === 0 ? (
          <div className="text-center py-10">Chưa có banner nào. Thêm banner đầu tiên của bạn!</div>
        ) : (
          <div className="space-y-6">
            {banners.map((banner) => (
              <div key={banner.id} className="border-2 border-blue-200 rounded overflow-hidden">
                <div className="relative">
                  <img
                    src={banner.imageURL}
                    alt="banner"
                    className="w-full h-[400px] object-cover rounded"
                  />
                  <button
                    className="text-[#EA4335] h-[50px] w-[50px] absolute top-3 right-3 bg-white p-2 rounded-full"
                    title="Xóa"
                    onClick={() => handleDelete(banner.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
                  <span className="text-sm">Tiêu đề: {banner.title}</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={banner.isActive}
                      onChange={() => handleToggle(banner.id, banner.isActive)}
                    />
                    <div className="relative w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full">
                      <div
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                          banner.isActive ? "translate-x-5" : ""
                        }`}
                      />
                    </div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        )}

        <AddBannerDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setEditingBanner(null);
          }}
          onSave={handleSaveBanner}
          editBanner={editingBanner}
        />
      </div>
    </div>
  );
};

export default SellerBanner;
