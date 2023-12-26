import { createTweet, getTweets } from "@/actions/createTweet";
import { getLikes } from "@/actions/likes";
import Like from "@/components/Like";
import TweetForm from "@/components/TweetForm";
import CommentForm from "@/components/CommentForm";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { getComments } from "@/actions/createComment";

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

  // console.log(user);
  return (
    <div className="flex flex-col items-center">
      <TweetForm />
      <ul className="mt-4 w-full max-w-md">
        {tweets.map((tweet) => {
          return (
            <li key={tweet.id} className="border-b-2 border-gray-200 py-2">
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
                <CommentForm tweetId={tweet.id} />
                <p>{countLikes(tweet.id)} likes</p>
                <p>{countcomments(tweet.id)} comments</p>
                <Like tweetId={tweet.id} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HomePage;
