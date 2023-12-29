"use client";
import { getProfile, getTweetsForProfile } from "@/actions/getProfile";
import { getLikes } from "@/actions/likes";
import { getComments } from "@/actions/createComment";
import TweetList from "@/components/TweetList";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [tweetsLoading, setTweetsLoading] = useState(true);
  const [likesLoading, setLikesLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

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

  useEffect(() => {
    const fetchLikes = async () => {
      const likes = await getLikes(username);
      setLikes(likes);
      setLikesLoading(false);
    };

    fetchLikes();
  }, [username]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments(username);
      setComments(comments);
      setCommentsLoading(false);
    };

    fetchComments();
  }, [username]);

  if (userLoading || tweetsLoading || likesLoading || commentsLoading) {
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
            <TweetList
              tweet={tweet}
              user={user}
              likes={likes}
              comments={comments}
              tweetId={tweet.id}
              key={tweet.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
