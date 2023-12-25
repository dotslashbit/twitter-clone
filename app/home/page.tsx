import { createTweet, getTweets } from "@/actions/createTweet";
import TweetForm from "@/components/TweetForm";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const HomePage = async () => {
  const tweets = await getTweets();
  const user = await currentUser();
  console.log(user);
  return (
    <div className="flex flex-col items-center">
      <TweetForm />
      <ul className="mt-4 w-full max-w-md">
        {tweets.map((tweet) => {
          return (
            <li key={tweet.id} className="border-b-2 border-gray-200 py-2">
              <div>
                <div className="flex items-center gap-1">
                  <img
                    src={user?.imageUrl}
                    alt="image url"
                    className="w-10 h-10 rounded-full"
                  />

                  <div className="flex items-center gap-5">
                    <p>{`${user?.firstName} ${user?.lastName}`}</p>
                    <p className="text-sm">@{tweet.username}</p>
                  </div>
                </div>
                <p>{tweet.content}</p>
                <button className="text-blue-500 hover:underline">Like</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
