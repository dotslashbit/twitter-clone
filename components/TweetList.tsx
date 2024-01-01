import React from "react";
import Like from "./Like";

const TweetList = ({ tweet, user, tweetId, likes, comments }) => {
  console.log("tweet", tweetId);
  const countLikes = (tweetId) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };

  return (
    <li>
      <div className="flex items-center gap-4 text-white">
        <img className="w-10 h-10" src={user.profileImg} alt="profile image" />
        <div className="flex gap-1 font-bold">
          <p className="text-lg">{user.firstName}</p>
          <p className="text-lg">{user.lastName}</p>
        </div>
        <p>@{user.username}</p>
      </div>

      <p className="ml-14 text-white">{tweet.content}</p>
      <div className="flex gap-5 my-1">
        <p className="text-xs text-gray-500">{countLikes(tweetId)} likes</p>
        <p className="text-xs text-gray-500">
          {countcomments(tweetId)} comments
        </p>
      </div>
      <Like tweetId={tweetId} />
    </li>
  );
};

export default TweetList;
