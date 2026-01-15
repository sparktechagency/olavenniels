import React from "react";
import { imageUrl } from "../../utils/server";

function UserImage({ user }) {
  return (
    <div className="flex items-center gap-2">
      <img
        src={imageUrl(user?.profilePicture)}
        alt={user?.firstName}
        className={"w-10 h-10 rounded-full object-cover"}
      />
      <div>
        <div className="font-medium">{user?.firstName} {user?.lastName}</div>
        <div className="text-xs text-gray-400">{user?.email}</div>
      </div>
    </div>
  );
}

export default UserImage;
