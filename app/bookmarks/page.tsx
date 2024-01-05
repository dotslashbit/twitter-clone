import { getBookmarks } from "@/actions/bookmark";
import { getTweetById, getTweets } from "@/actions/createTweet";
import TweetsList from "@/components/TweetsList";
import { currentUser } from "@clerk/nextjs";
import React from "react";

const BookmarksPage = async () => {
  const currentUserData = await currentUser();
  const username = currentUserData.username;

  const bookmarkTweetIds = await getBookmarks(username);
  console.log("bookmarkTweetIds", bookmarkTweetIds);
  const tweets = await getTweets();
  console.log("tweets", tweets);
  const bookmarkTweets = tweets.filter((tweet) =>
    bookmarkTweetIds.includes(tweet.id)
  );
  console.log("bookmarkTweets", bookmarkTweets);
  const bookmarkTweetUserIds = bookmarkTweets.map((tweet) => tweet.userId);
  console.log("bookmarkTweetUserIds", bookmarkTweetUserIds);
  return (
    <ul>
      {bookmarkTweetIds.map((tweetId) => {
        return <TweetsList key={tweetId} tweetId={tweetId} />;
      })}
    </ul>
  );
};

export default BookmarksPage;
