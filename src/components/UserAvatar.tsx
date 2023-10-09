import { User } from "next-auth";
import React from "react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import Image from "next/image";

type Props = {
  user: User;
};

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar className="w-full h-full">
      {user.image ? (
        <div>
          <Image src={user.image} alt="user profile" fill />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
