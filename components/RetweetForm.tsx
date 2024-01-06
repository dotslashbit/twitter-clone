import { retweet } from "@/actions/retweet";
import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
      <button>
        <FontAwesomeIcon icon={faRetweet} color="grey" />
      </button>
    </form>
  );
};

export default RetweetForm;
