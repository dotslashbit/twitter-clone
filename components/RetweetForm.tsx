import { retweet } from "@/actions/retweet";
import React from "react";

const RetweetForm = async ({
  tweetId,
  username,
}: {
  tweetId: number;
  username: string;
}) => {
  return (
    <form action={retweet}>
      <input type="hidden" name="tweetId" value={tweetId} />
      <input type="hidden" name="username" value={username} />
      <button>Retweet</button>
    </form>
  );
};

export default RetweetForm;
