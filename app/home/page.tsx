import { getTweets } from "@/actions/createTweet";
import TweetForm from "@/components/TweetForm";
import { currentUser } from "@clerk/nextjs";
import React from "react";
import { createUser } from "@/actions/createUser";
import TweetsList from "@/components/TweetsList";
import { getRetweets } from "@/actions/retweet";
import RetweetList from "@/components/RetweetList";

type Tweet = {
  id: number;
};

const HomePage = async () => {
  const tweets = await getTweets();
  const user = await currentUser();
  const retweets = await getRetweets();
  console.log("retweets", retweets);

  await createUser(user?.id);

  return (
    <div>
      <div className="flex flex-col items-center">
        <TweetForm />
        <ul className="mt-4 w-full max-w-md">
          {tweets.map((tweet: Tweet) => (
            <TweetsList key={tweet.id} tweetId={tweet.id} />
          ))}
        </ul>
        {/* <ul className="mt-4 w-full max-w-md">
          {retweets.map(
            (retweet) => (
              console.log("retweet", retweet.username),
              (
                <RetweetList
                  key={retweet.id}
                  tweet={retweet.tweet}
                  username={retweet.username}
                />
              )
            )
          )}
        </ul> */}
        <ul>
          {retweets.map((retweet) => (
            <li key={retweet.id} className="flex items-center gap-1">
              {retweet.tweet.content} {retweet.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
