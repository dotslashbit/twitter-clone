import { createTweet, getTweets } from "@/actions/createTweet";
import { getLikes } from "@/actions/likes";
import Like from "@/components/Like";
import TweetForm from "@/components/TweetForm";
import CommentForm from "@/components/CommentForm";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { getComments } from "@/actions/createComment";
import Link from "next/link";
import { createUser } from "@/actions/createUser";
import TweetsList from "@/components/TweetsList";

const HomePage = async () => {
  const tweets = await getTweets();
  const user = await currentUser();

  const likes = await getLikes();
  const comments = await getComments();

  await createUser(user?.id);

  const countLikes = (tweetId) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };

  return (
    <div className="flex flex-col items-center">
      <TweetForm />
      <ul className="mt-4 w-full max-w-md">
        {tweets.map((tweet) => (
          <TweetsList key={tweet.id} tweetId={tweet.id} />
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
