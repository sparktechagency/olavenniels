import React from "react";
import StatusCard from "./components/StatusCard";
import earning from "../../../assets/earning.png";
import book from "../../../assets/book.png";
import user from "../../../assets/user.png";
import blockUser from "../../../assets/block-user.png";
import UserGrowthChart from "./charts/UserGrowthChart";
import SubscriptionGrowth from "./charts/SubscriptionGrowth";
import EarningGrowth from "./charts/EarningGrowth";
const Dashboard = () => {
  const data = [
    {
      title: "Total Earnings",
      number: 340,
      icon: earning,
      link: "/",
    },
    {
      title: "Total Book",
      number: 120,
      icon: book,
      link: "/book-management",
    },
    {
      title: "Total Users",
      number: 120,
      icon: user,
      link: "/all-user",
    },
    {
      title: "Block Accounts",
      number: 213,
      icon: blockUser,
      link: "/block-accounts",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {data?.map((stats, i) => (
          <StatusCard key={i} stats={stats} />
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-[var(--primary-color)] border border-gray-200/40 rounded-lg shadow mt-6">
        <div className="w-full h-[420px] p-4 grid grid-cols-2 gap-4">
          <UserGrowthChart />
          <SubscriptionGrowth />
        </div>
      </div>
      <div className="bg-[var(--primary-color)] h-[420px] p-2 border border-gray-200/40 rounded-lg shadow mt-6">
        <EarningGrowth />
      </div>
    </div>
  );
};

export default Dashboard;
