import { createTweet, getTweets } from "@/actions/createTweet";
import React from "react";

const HomePage = async () => {
  const tweets = await getTweets();
  return (
    <div className="flex flex-col items-center">
      <form action={createTweet}>
        <input className="text-black" type="text" name="tweet" />
        <button className="text-white" type="submit">
          Submit
        </button>
      </form>
      <ul>
        {tweets.map((tweet) => {
          return <li key={tweet.id}>{tweet.content}</li>;
        })}
      </ul>
    </div>
  );
};

export default HomePage;
