import { getComments } from "@/actions/createComment";
import { getTweets } from "@/actions/createTweet";
import { getFollowers, getFollowing, onFollow } from "@/actions/follow";
import { getLikes } from "@/actions/likes";
import TweetList from "@/components/TweetList";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const ProfilePage = async () => {
  const user = await currentUser();
  const tweets = await getTweets();
  const likes = await getLikes();
  const comments = await getComments();
  const followers = await getFollowers(user.username);
  const following = await getFollowing(user.username);

  return (
    <>
      <div className="flex flex-col items-center p-8  text-gray-800">
        <img
          className="w-48 h-48 rounded-full object-cover"
          src={user.imageUrl}
          alt="user image"
        />
        <div className="mt-4 text-center text-white">
          <div className="flex gap-1 font-bold">
            <p className="text-lg">{user?.firstName}</p>
            <p className="text-lg">{user?.lastName}</p>
          </div>
          <p className="text-xl">@{user?.username}</p>
          <div className="flex gap-4">
            <p className="text-lg">Followers: {followers.length}</p>
            <p className="text-lg">Following: {following.length}</p>
          </div>
        </div>
        <form action={onFollow}>
          <input type="hidden" name="followingId" value={user?.id} />
          <button type="submit">FOLLOW</button>
        </form>
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
    </>
  );
};

export default ProfilePage;
