"use client";
import { getProfile, getTweetsForProfile } from "@/actions/getProfile";
import { getLikes } from "@/actions/likes";
import { getComments } from "@/actions/createComment";
import TweetList from "@/components/TweetList";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Tweet = {
  id: number;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
};

type User = {
  id: string;
  username: string;
  profileImg: string;
  firstName: string | null;
  lastName: string | null;
};

type Comment = {
  id: number;
  userId: string;
  tweetId: number;
  content: string;
  createdAt: Date;
};

type Like = {
  id: number;
  userId: string;
  tweetId: number;
  createdAt: Date;
};

const ProfilePage = () => {
  const pathname = usePathname();
  const username = pathname.split("/")[2];
  const [user, setUser] = useState<User | null>(null);
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [likes, setLikes] = useState<Like[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
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
      const likes = await getLikes();
      setLikes(likes);
      setLikesLoading(false);
    };

    fetchLikes();
  }, [username]);

  useEffect(() => {
    const fetchComments = async () => {
      const comments = await getComments();
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
        src={user?.profileImg}
        alt="user image"
      />
      <div className="mt-4 text-center text-white">
        <div className="flex gap-1 font-bold">
          <p className="text-lg">{user?.firstName}</p>
          <p className="text-lg">{user?.lastName}</p>
        </div>
        <p className="text-xl">@{user?.username}</p>
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
