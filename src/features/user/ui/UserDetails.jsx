import React from 'react';

function UserDetails({ selectedItem }) {
  return (
    <div className="w-full rounded-xl overflow-hidden">
      {/* Header with image & name */}
      <div className="bg-[var(--secondary-color)]/50 relative flex flex-col items-center justify-center pb-6 pt-8">

        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
          <img
            src={selectedItem?.userImage}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Role */}
        <h2 className="text-lg font-semibold">{selectedItem?.name}</h2>
        <p className="text-sm text-gray-700">User</p>
      </div>

      {/* User Details Section */}
      <div className="bg-white px-6 py-6 space-y-4">
        <div>
          <p className="text-gray-500 text-sm">Name</p>
          <p className="text-black font-medium">{selectedItem?.name}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Email</p>
          <p className="text-gray-600">{selectedItem?.email}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Country</p>
          <div className="flex items-center gap-2">
            <span role="img" aria-label="flag">
              🇧🇩
            </span>
            <p className="text-black font-medium">{selectedItem?.country}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Subscription</p>
          <span className="px-3 py-1 border border-yellow-500 text-yellow-600 text-sm rounded-full inline-block">
            {selectedItem?.userType}
          </span>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
