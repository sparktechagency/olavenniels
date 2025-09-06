import React, { Suspense, lazy, useEffect, useState } from "react";
import StatusCard from "./components/StatusCard";
import book from "../../../assets/book.png";
import user from "../../../assets/user.png";
import blockUser from "../../../assets/block-user.png";
import { useStatusQuery } from "../../../Redux/Apis/service/statusApis";
import SmallLoader from "../../Loader/SmallLoader";
import { useGetProfileDataQuery } from "../../../Redux/Apis/service/profileApis";
const SubscriptionGrowth = lazy(() => import("./charts/SubscriptionGrowth"));
const EarningGrowth = lazy(() => import("./charts/EarningGrowth"));
const UserGrowthChart = lazy(() => import("./charts/UserGrowthChart"));

const Dashboard = () => {
  const { data: profileData, isLoading: isProfileLoading } = useGetProfileDataQuery();
  const { data: status, isLoading } = useStatusQuery({})
  const [role, setRole] = useState('')

  useEffect(() => {
    const role = profileData?.admin?.role;
    if (role === 'SUPER_ADMIN') {
      setRole(role)
    }
  }, [isProfileLoading])
  const data = [
    {
      title: "Total Book",
      number: status?.sumOfBooks,
      icon: book,
      link: "/book-management",
    },
    {
      title: "Total Users",
      number: status?.total,
      icon: user,
      link: "/all-user",
    },
    {
      title: "Block Accounts",
      number: status?.blocked,
      icon: blockUser,
      link: "/block-accounts",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="w-full h-[150px] rounded-lg bg-[var(--primary-color)]" />
            ))
          }
        </div>
        <div className='w-full h-[350px] bg-[var(--primary-color)]' />
        <div className='w-full h-[350px] bg-[var(--primary-color)]' />
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((stats, i) => (
          <StatusCard key={i} stats={stats} />
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-[var(--primary-color)] border border-gray-200/40 rounded-lg shadow mt-6">
        <div className={`w-full h-[420px] p-4 grid gap-4 ${role === 'SUPER_ADMIN' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          <Suspense fallback={<SmallLoader />}>
            <UserGrowthChart />
          </Suspense>
          {role === 'SUPER_ADMIN' && <Suspense fallback={<SmallLoader />}>
            <SubscriptionGrowth />
          </Suspense>}
        </div>
      </div>
      {role === 'SUPER_ADMIN' && <div className="bg-[var(--primary-color)] h-[420px] p-2 border border-gray-200/40 rounded-lg shadow mt-6">
        <Suspense fallback={<SmallLoader />}>
          <EarningGrowth />
        </Suspense>
      </div>}
    </div>
  );
};

export default Dashboard;
