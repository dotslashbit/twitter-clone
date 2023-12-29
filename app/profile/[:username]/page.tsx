"use client";
import { getProfile } from "@/actions/getProfile";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = await getProfile(username);
      setUser(userProfile);
      setLoading(false);
    };

    fetchUser();
  }, [username]); // dependency array includes username to refetch when it changes

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center p-8  text-gray-800">
      <img
        className="w-48 h-48 rounded-full object-cover"
        src={user.profileImg}
        alt="user image"
      />
      <div className="mt-4 text-center">
        <p className="text-2xl font-bold">{user.username}</p>
        <p className="text-lg">{user.firstName}</p>
        <p className="text-lg">{user.lastName}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
