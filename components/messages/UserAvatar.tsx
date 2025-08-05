import React from "react";

interface UserAvatarProps {
  name: string;
  online?: boolean;
  size?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  online = false,
  size = 40,
}) => (
  <div className="relative" style={{ width: size, height: size }}>
    <div
      className="bg-purple-100 rounded-full flex items-center justify-center"
      style={{ width: size, height: size }}>
      <span
        className="text-purple-600 font-semibold"
        style={{ fontSize: size / 2 }}>
        {name.charAt(0)}
      </span>
    </div>
    {online && (
      <div
        className="absolute bottom-0 right-0 bg-green-400 rounded-full border-2 border-white"
        style={{ width: size / 4, height: size / 4 }}></div>
    )}
  </div>
);

export default UserAvatar;
