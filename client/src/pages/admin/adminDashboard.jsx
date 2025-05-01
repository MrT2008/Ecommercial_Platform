import { useState } from 'react';
import PropTypes from 'prop-types';
import Sidebar from '../../components/admin/adminSidebar';
import TitlePage from '../../components/shares/TitlePage';
import { getAllShops } from '../../api/adminAPI';
// Mock data file (normally would be in a separate file)
const shops = await getAllShops();
const totalShops = shops.length;
const mockData = {
    users: {
        title: "List of users",
        metrics: [
            { label: "Total Users", value: "12,400" },
            { label: "Total Shops", value: totalShops },
        ]
    },
    sales: {
        title: "Sales Analysis",
        metrics: [
            { label: "Total Sales", value: "200,000,000" },
            { label: "Total Products Sold", value: "100" }
        ]
    }
};

// Card component
const MetricCard = ({ data }) => {
    const title = data?.title || "";
    const metrics = data?.metrics || [];

    return (
        <div className="bg-white rounded-lg shadow-sm p-6 w-full min-w-[250px]">
            <h2 className="text-orange-400 font-medium text-sm mb-8">{title}</h2>
            <div className="flex justify-between">
                {metrics.map((metric, index) => (
                    <div key={index} className="flex flex-col">
                        <span className="text-sm text-gray-700 mb-2">{metric.label}</span>
                        <span className="text-blue-900 text-xl font-medium">{metric.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Props validation
MetricCard.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        metrics: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.string.isRequired
            })
        ).isRequired
    }).isRequired
};

// Dashboard with both cards
export default function Dashboard() {
    return (

        <div>

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="w-4/5 p-6">
                    <TitlePage title={"Admin Dashboard"} />

                    <div className="flex mt-6 gap-6">
                        <div className="w-1/3">
                            <MetricCard data={mockData.users} />
                        </div>
                        <div className="w-1/3">
                            <MetricCard data={mockData.sales} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}