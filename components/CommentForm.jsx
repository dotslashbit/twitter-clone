"use client";

import { createComment } from "@/actions/createComment";
import React from "react";

const CommentForm = ({ tweetId }) => {
  console.log("this is tweetId", tweetId);
  return (
    <form
      action={async (FormData) => {
        await createComment(FormData, tweetId);
      }}
      className="border-blue-500 p-1 rounded-lg shadow-lg bg-white max-w-sm w-full"
    >
      <input
        className="text-black border-2 border-gray-300 p-1 w-full rounded-md mb-2"
        type="text"
        name="comment"
        placeholder="Write a comment..."
      />
      <button
        className="text-white bg-blue-500 hover:bg-blue-700 p-1 rounded-md w-full"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
