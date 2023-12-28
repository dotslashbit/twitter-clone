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
          <div key={tweet.id} className="my-10">
            <Link href={`/${tweet.id}`}>
              <div>
                <div className="flex items-center gap-1">
                  <img
                    src={user?.imageUrl}
                    alt="image url"
                    className="w-10 h-10 rounded-full"
                  />

                  <div className="flex items-center gap-5">
                    <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
                    <p className="text-sm text-gray-500">@{tweet.username}</p>
                  </div>
                </div>
                <p className="text-lg mt-2">{tweet.content}</p>
              </div>
            </Link>
            <CommentForm tweetId={tweet.id} />
            <div className="flex gap-5 my-1">
              <p className="text-xs text-gray-500">
                {countLikes(tweet.id)} likes
              </p>
              <p className="text-xs text-gray-500">
                {countcomments(tweet.id)} comments
              </p>
            </div>
            <Like classname="text-blue-500 cursor-pointer" tweetId={tweet.id} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
