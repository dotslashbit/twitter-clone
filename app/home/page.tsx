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
          <div key={tweet.id}>
            <Link href={`/${tweet.id}`}>
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
            </Link>
            <CommentForm tweetId={tweet.id} />
            <p>{countLikes(tweet.id)} likes</p>
            <Like tweetId={tweet.id} />
            <p>{countcomments(tweet.id)} comments</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
