import React from 'react';
import { Link } from 'react-router-dom';

function StatusCard({ stats }) {
  return (
    <Link to={stats?.link}> <div
      style={{
        backgroundColor: 'var(--primary-color)',
      }}
      className="rounded-lg border border-gray-200/40 shadow-md p-6"
    >
      <div className="flex items-center justify-center gap-2">
        {stats?.icon && (
          <div className="w-10 h-10">
            <img
              src={stats?.icon}
              alt={stats?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-white line-clamp-1">{stats?.title}</h1>
          <h1 className="text-xl font-normal leading-0 text-white">{stats?.number}</h1>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default StatusCard;
