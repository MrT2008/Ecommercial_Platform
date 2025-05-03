import Sidebar from '../../components/admin/adminSidebar';
import { useEffect, useState } from 'react';
import SecondaryButton from "../../components/shares/SecondaryButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ModeratorRole = () => {
  const [moderators, setModerators] = useState([]);
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await fetch('http://localhost:8080/manager/moderators/');
        const data = await response.json();
        if (data.moderators) {
          setModerators(data.moderators);
        }
      } catch (error) {
        console.error("Lỗi khi lấy danh sách moderator:", error);
      }
    };
  
    fetchModerators();
  }, []);

  const handleAddModerator = () => {
    if (formData.fullName && formData.email && formData.password) {
      setModerators([...moderators, {
        fullName: formData.fullName,
        email: formData.email,
      }]);
      setFormData({ fullName: "", email: "", password: "" });
    }
  };

  const handleDelete = (index) => {
    const updated = [...moderators];
    updated.splice(index, 1);
    setModerators(updated);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-4/5 p-6 py-12 px-8">
        <h2 className="text-2xl font-bold mb-6 text-[#FFA50B] ">Moderator Role</h2>
        <div className="flex flex-row gap-6">
          {/* Form Section */}
          <div className="bg-white p-6 shadow rounded-md w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-6">Add Role</h2>
            <input
              type="text"
              placeholder="Nguyễn Văn A"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full p-3 border rounded mb-2"
            />
            <input
              type="email"
              placeholder="rimell11@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-3 border rounded mb-2"
            />
            <input
              type="password"
              placeholder="*************"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full p-3 border rounded mb-4"
            />
            <div className="flex justify-end">
              <SecondaryButton title="Save" onClick={handleAddModerator} />
            </div>
          </div>

          {/* List Section */}
          <div className="flex-grow bg-white p-6 shadow rounded-md">
            <h2 className="text-lg font-semibold mb-1">Role List</h2>
            <table className="w-full text-left">
              <thead>
                <tr className="text-center">
                  <th className="p-2">No.</th>
                  <th className="p-2">Full Name</th>
                  <th className="p-2">Email</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {moderators.map((mod, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-[#F7F6FF]" : "bg-white"} text-center`}
                  >
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{mod.fullName}</td>
                    <td className="p-2">{mod.email}</td>
                    <td className="p-2">
                      <button
                        className="text-[#EA4335] border border-[#EA4335] px-3 py-1 rounded"
                        onClick={() => handleDelete(index)}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-1" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorRole;
