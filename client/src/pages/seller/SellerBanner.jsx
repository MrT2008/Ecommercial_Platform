import { useState } from 'react';
import SecondaryButton from '../../components/shares/SecondaryButton';
import Sidebar from '../../components/seller/sellerSidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import AddBannerDialog from "../../pages/seller/AddBannerDialog";

const SellerBanner = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [banners, setBanners] = useState([
    {
      id: 1,
      image:
        'https://mega.com.vn/media/news/1406_hinh-nen-meo-4k-pc85.jpg',
      title: 'Flash Sale Alert – Grab Your Smartphone Now!',
      isActive: true,
    },
    {
      id: 2,
      image:
        'https://mega.com.vn/media/news/1406_hinh-nen-meo-4k-pc85.jpg',
      title: 'Flash Sale Alert – Grab Your Smartphone Now!',
      isActive: true,
    },
  ]);

  const handleDelete = (id) => {
    setBanners(banners.filter((b) => b.id !== id));
  };

  const handleToggle = (id) => {
    setBanners(
      banners.map((b) =>
        b.id === id ? { ...b, isActive: !b.isActive } : b
      )
    );
  };

  const handleOpenDialog = (banner = null) => {
    setEditingBanner(banner);
    setIsDialogOpen(true);
  };

  const handleSaveBanner = (bannerData) => {
    if (editingBanner) {
      // Update existing banner
      setBanners(banners.map(b => b.id === bannerData.id ? bannerData : b));
    } else {
      // Add new banner
      setBanners([...banners, bannerData]);
    }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-6 py-12 px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#FFA50B]">Marketing Banner</h2>
          <SecondaryButton title="Add new banner" onClick={() => handleOpenDialog()} />
        </div>

        <div className="space-y-6">
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="border-2 border-blue-200 rounded overflow-hidden"
            >
              <div className="relative">
                <img
                  src={banner.image}
                  alt="banner"
                  className="w-full h-[400px] object-cover rounded"
                />
                <button
                  className="text-[#EA4335] h-[50px] w-[50px] absolute top-3 right-3 bg-white p-2 rounded-full"
                  title="Delete"
                  onClick={() => handleDelete(banner.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                {/* <button
                  className="text-white h-[50px] w-[50px] absolute top-3 right-16 bg-blue-500 p-2 rounded-full"
                  title="Edit"
                  onClick={() => handleOpenDialog(banner)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button> */}
              </div>
              <div className="bg-gray-800 text-white p-3 flex justify-between items-center">
                <span className="text-sm">Title: {banner.title}</span>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={banner.isActive}
                    onChange={() => handleToggle(banner.id)}
                  />
                  <div className="relative w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full">
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${banner.isActive ? 'translate-x-5' : ''}`} />
                  </div>
                </label>
              </div>
            </div>
          ))}
        </div>
        
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