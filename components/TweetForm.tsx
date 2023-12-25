import { createTweet } from "@/actions/createTweet";
import React from "react";

const TweetForm = () => {
  return (
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
  );
};

export default TweetForm;
