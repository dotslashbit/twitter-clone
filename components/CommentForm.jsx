"use client";

import { createComment } from "@/actions/createComment";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

const CommentForm = ({ tweetId }) => {
  console.log("this is tweetId", tweetId);
  return (
    <form
      className="max-h-20 max-w-sm w-full mx-auto p-4 border-b border-gray-300 flex items-center mb-5"
      action={async (FormData) => {
        await createComment(FormData, tweetId);
      }}
    >
      <input
        className=" bg-black flex-1 mr-2 px-3 py-2 border-none focus:outline-none"
        type="text"
        name="comment"
        placeholder="Write a comment..."
      />
      <button
        className="bg-blue-500 text-white rounded-full p-1 hover:bg-blue-700"
        type="submit"
      >
        <FontAwesomeIcon icon={faArrowRight} />
      </button>
    </form>
  );
};

export default CommentForm;
