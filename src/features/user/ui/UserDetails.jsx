import React from 'react';
import { imageUrl } from '../../../utils/server';

function UserDetails({ selectedItem }) {
  return (
    <div className="w-full rounded-xl overflow-hidden">
      {/* Header with image & name */}
      <div className="bg-[var(--secondary-color)]/50 relative flex flex-col items-center justify-center pb-6 pt-8">

        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md mb-3">
          <img
            src={imageUrl(selectedItem?.profilePicture)}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name & Role */}
        <h2 className="text-md font-semibold">{selectedItem?.firstName + ' ' + selectedItem?.lastName}</h2>
        <p className="text-sm text-gray-700">User</p>
      </div>

      {/* User Details Section */}
      <div className="bg-amber-50 px-6 py-6 space-y-4">
        <div>
          <p className="text-black text-md">Name</p>
          <p className="text-gray-600 font-medium">{selectedItem?.firstName + ' ' + selectedItem?.lastName}</p>
        </div>

        <div>
          <p className="text-black text-md">Email</p>
          <p className="text-gray-600">{selectedItem?.email}</p>
        </div>

        <div>
          <p className="text-black text-md">Bio</p>
          <p className="text-gray-600">{selectedItem?.bio || 'No bio'}</p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
