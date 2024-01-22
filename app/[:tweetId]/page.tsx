import { getComments } from "@/actions/createComment";
import { getTweets } from "@/actions/createTweet";
import { getLikes } from "@/actions/likes";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs";
import { getRetweets } from "@/actions/retweet";

type Tweet = {
  id: number;
  content: string;
  // Add other properties of a tweet as needed
};

type Comment = {
  id: number;
  tweetId: number;
  content: string;
  // Add other properties of a comment as needed
};

type Like = {
  tweetId: number;
  // Add other properties of a comment as needed
};

const TweetDetailPage = async ({ params }) => {
  const tweets = await getTweets();
  const comments = await getComments();
  const likes = await getLikes();
  const retweets = await getRetweets();
  console.log("searchParams", params);
  const tweetId = Number(params[":tweetId"]);
  console.log("tweetId", tweetId);
  // const headersList = headers();
  // const pathname = headersList.get("next-url");
  // const tweetId = pathname ? Number(pathname.split("/")[1]) : null;

  console.log(likes);

  const tweet = tweets.find((tweet: Tweet) => tweet.id === tweetId);

  const commentsForCurrentTweet = (tweetId: number) => {
    return comments.filter((comment: Comment) => comment.tweetId === tweetId);
  };

  const countLikes = (tweetId: number) => {
    return likes.filter((like: Like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId: number) => {
    return comments.filter((comment: Comment) => comment.tweetId === tweetId)
      .length;
  };

  const countretweets = (tweetId: number) => {
    return retweets.filter((retweet) => retweet.tweetId === tweetId).length;
  };

  const tweetCreator = await clerkClient.users.getUser(tweet.userId);
  console.log(tweetCreator);
  return (
    <div className="flex justify-center items-center flex-col">
      <div className="flex items-center gap-1">
        <img
          src={tweetCreator.imageUrl}
          alt="image url"
          className="w-10 h-10 rounded-full"
        />

        <div className="flex items-center gap-5">
          <p>{`${tweetCreator?.firstName} ${tweetCreator?.lastName}`}</p>
          <p className="text-sm">@{tweet.username}</p>
        </div>
      </div>
      <p>{tweet?.content}</p>
      {/* {console.log(tweetId)} */}
      {/* <CommentForm tweetId={tweetId} /> */}
      <p>{countLikes(tweetId)} likes</p>
      <p>{countcomments(tweetId)} comments</p>
      <p>{countretweets(tweetId)} retweets</p>
      <ul className="mt-4 w-full max-w-md">
        {commentsForCurrentTweet(tweetId).map((comment: Comment) => {
          return (
            <li key={comment.id}>
              <p>{comment.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TweetDetailPage;
