import Sidebar from '../../components/admin/adminSidebar';
import TitlePage from '../../components/shares/TitlePage';
import AnnouncementCard from '../../components/admin/AnnouncementCard';
import SecondaryButton from "../../components/shares/SecondaryButton";
import AddAnnouncementDialog from "../../components/admin/AddAnnouncementDialog";
import { useState, useEffect } from 'react';
import { getAllAnouncements, deleteAnnouncement, editAnnouncement } from '../../api/adminAPI';

const AnnouncementsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAnnouncements = async () => {
    try {
      const response = await getAllAnouncements();
      console.log("Fetched announcements:", response);
      const sortedAnnouncements = response.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setAnnouncements(sortedAnnouncements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  

  const handleSendSuccess = (announcement) => {
    setAnnouncements(prev => {
      // If announcement already exists (e.g. edited), replace it; if not, add it
      const exists = prev.some(a => a.id === announcement.id);
      return exists
      ? prev.map(a => a.id === announcement.id ? announcement : a)
      : [announcement, ...prev];
    });
  };

  const handleEditSuccess = (announcement) => {
    if (!announcement || !announcement.id) return;
  
    setAnnouncements(prev => 
      prev.map(a => a.id === announcement.id ? announcement : a)
    );
  };
  
  
  
  const handleDeleteSuccess = (announcementId) => {
    setAnnouncements(prev => prev.filter(a => a.id !== announcementId));
  }

  
  

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="w-4/5 p-6">
        <div className="flex justify-between items-center mb-4">
          <TitlePage title={"Announcements"} />
          <SecondaryButton onClick={handleOpenDialog} title="Add Announcement" />
        </div>

        {/* Add Announcement Dialog */}
        <AddAnnouncementDialog
          isOpen={isDialogOpen}
          onClose={handleCloseDialog}
          onSave={handleSendSuccess}
        />

        <div className="bg-white border border-gray-200 rounded-lg p-4">
          {loading ? (
            <p className="text-gray-500">Loading announcements...</p>
          ) : announcements.length === 0 ? (
            <p className="text-gray-500">No announcements found.</p>
          ) : (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id }
                announcement={announcement}
                onDeleteSuccess={handleDeleteSuccess}
                onSendSuccess={handleSendSuccess}
                onEditSuccess={handleEditSuccess}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementsPage;
