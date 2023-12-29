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
  console.log(user?.id);

  await createUser(user?.id);

  const countLikes = (tweetId) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };

  return (
    <div>
      <nav className="flex items-center justify-between flex-wrap p-6">
        <svg
          width="50"
          height="50"
          viewBox="0 0 300 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M178.57 127.15 290.27 0h-26.46l-97.03 110.38L89.34 0H0l117.13 166.93L0 300.25h26.46l102.4-116.59 81.8 116.59h89.34M36.01 19.54H76.66l187.13 262.13h-40.66"
          />
        </svg>
      </nav>

      <div className="flex flex-col items-center">
        <TweetForm />
        <ul className="mt-4 w-full max-w-md">
          {tweets.map((tweet) => (
            <TweetsList key={tweet.id} tweetId={tweet.id} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
