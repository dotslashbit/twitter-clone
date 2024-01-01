import { getComments } from "@/actions/createComment";
import { getTweets } from "@/actions/createTweet";
import { getLikes } from "@/actions/likes";
import { headers } from "next/headers";
import { clerkClient } from "@clerk/nextjs";

type Tweet = {
  id: number;
  content: string;
  // Add other properties of a tweet as needed
};

const TweetDetailPage = async () => {
  const tweets = await getTweets();
  const comments = await getComments();
  const likes = await getLikes();
  const headersList = headers();
  const pathname = headersList.get("next-url");
  const tweetId = pathname ? Number(pathname.split("/")[1]) : null;

  console.log(likes);

  const tweet = tweets.find((tweet: Tweet) => tweet.id === tweetId);

  const commentsForCurrentTweet = (tweetId: number) => {
    return comments.filter((comment) => comment.tweetId === tweetId);
  };

  const countLikes = (tweetId: number) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId: number) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };

  if (tweet === undefined) {
    return <div>loading...</div>;
  }
  if (tweetId === null || tweet === undefined) {
    return <div>loading...</div>;
  }
  const tweetCreator = await clerkClient.users.getUser(tweet.userId);
  return (
    <div>
      <div className="flex items-center gap-1">
        <img
          src={tweetCreator.imageUrl}
          alt="image url"
          className="w-10 h-10 rounded-full"
        />

        {/* <div className="flex items-center gap-5">
          <p>{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="text-sm">@{tweet.username}</p>
        </div> */}
        <p className="text-white">@{tweetCreator.username}</p>
      </div>
      <p>{tweet?.content}</p>
      {/* {console.log(tweetId)} */}
      {/* <CommentForm tweetId={tweetId} /> */}
      <p>{countLikes(tweetId)} likes</p>
      <p>{countcomments(tweetId)} comments</p>
      <ul className="mt-4 w-full max-w-md">
        {commentsForCurrentTweet(tweetId).map((comment) => {
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
