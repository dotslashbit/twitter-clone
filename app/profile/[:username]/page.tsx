"use client";
import { getProfile, getTweetsForProfile } from "@/actions/getProfile";
import TweetList from "@/components/TweetList";
import TweetsList from "@/components/TweetsList";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [tweetsLoading, setTweetsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userProfile = await getProfile(username);
      setUser(userProfile);
      setUserLoading(false);
    };

    fetchUser();
  }, [username]); // dependency array includes username to refetch when it changes

  useEffect(() => {
    const fetchTweets = async () => {
      const tweets = await getTweetsForProfile(username);
      setTweets(tweets);
      setTweetsLoading(false);
    };

    fetchTweets();
  }, [username]);

  if (userLoading || tweetsLoading) {
    return <div>Loading...</div>;
  }
  console.log("tweetsssssss", tweets);
  return (
    <div className="flex flex-col items-center p-8  text-gray-800">
      <img
        className="w-48 h-48 rounded-full object-cover"
        src={user.profileImg}
        alt="user image"
      />
      <div className="mt-4 text-center text-white">
        <div className="flex gap-1 font-bold">
          <p className="text-lg">{user.firstName}</p>
          <p className="text-lg">{user.lastName}</p>
        </div>
        <p className="text-xl">@{user.username}</p>
      </div>
      <ul className="mt-4 w-full max-w-md">
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <TweetList tweet={tweet} user={user} key={tweet.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
