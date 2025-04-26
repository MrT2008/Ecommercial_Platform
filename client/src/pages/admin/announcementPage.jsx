import Sidebar from '../../components/admin/adminSidebar';
import TitlePage from '../../components/shares/TitlePage';
import AnnouncementCard from '../../components/admin/AnnouncementCard';
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddAnnouncementDialog from "../../components/admin/AddAnnouncementDialog";
import { useState } from 'react';
// Main Announcements Page Component
const AnnouncementsPage = () => {
  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Sample announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: "Welcome #8/3 Close the deal with up to 20% off",
      promotion: "Fried chicken, milk tea, cakes, everything",
      dealText: "Top deals with discounts up to 20%",
      date: "10:41 8-03-2025",
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      title: "Hunt for 830k discount code, super cute deal",
      promotion: "Add 200k discount code only today",
      dealText: "Top deals with discounts up to 50%",
      date: "10:41 10-03-2025",
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      title: "Welcome #8/3 Close the deal with up to 20% off",
      promotion: "Fried chicken, milk tea, cakes, everything",
      dealText: "Top deals with discounts up to 20%",
      date: "10:41 8-03-2025",
      image: "/api/placeholder/80/80"
    },
    {
      id: 4,
      title: "Hunt for 830k discount code, super cute deal",
      promotion: "Add 200k discount code only today",
      dealText: "Top deals with discounts up to 50%",
      date: "10:41 10-03-2025",
      image: "/api/placeholder/80/80"
    }
  ]);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleSaveAnnouncement = (newAnnouncement) => {
    // In a real app, you would send this to an API
    // For now, we'll just add it to our local state
    const currentDate = new Date();
    const formattedDate = `${currentDate.getHours()}:${currentDate.getMinutes()} ${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    setAnnouncements([
      ...announcements,
      {
        id: announcements.length + 1,
        title: newAnnouncement.title,
        promotion: "New promotion", // This would come from the form in a real app
        dealText: "New deal details", // This would come from the form in a real app
        date: formattedDate,
        image: "/api/placeholder/80/80" // This would be the uploaded image in a real app
      }
    ]);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <TitlePage title={"Announcements"} />
          <SecondaryButton onClick={handleOpenDialog} title="Add Announcement"  />
          {/* Add Announcement Dialog */}
          <AddAnnouncementDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            onSave={handleSaveAnnouncement}
          />
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {announcements.map(announcement => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
        </div>


      </div>
    </div>
  );
};

export default AnnouncementsPage;