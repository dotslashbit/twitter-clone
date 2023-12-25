import { createTweet, getTweets } from "@/actions/createTweet";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const HomePage = async () => {
  const tweets = await getTweets();
  const user = await currentUser();
  console.log(user);
  return (
    <div className="flex flex-col items-center">
      <form
        action={createTweet}
        className="border-blue-500 p-4 rounded-lg shadow-lg bg-white max-w-md w-full"
      >
        <input
          className="text-black border-2 border-gray-300 p-2 w-full rounded-md mb-3"
          type="text"
          name="tweet"
          placeholder="What is happening?"
        />
        <button
          className="text-white bg-blue-500 hover:bg-blue-700 p-2 rounded-md w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
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
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
