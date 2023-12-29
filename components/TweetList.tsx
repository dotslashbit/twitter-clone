import React from "react";

const TweetList = ({ tweet, user }) => {
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
    </li>
  );
};

export default TweetList;
