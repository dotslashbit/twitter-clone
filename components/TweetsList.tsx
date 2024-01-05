import Link from "next/link";
import CommentForm from "./CommentForm";
import Like from "./Like";
import { createUser } from "@/actions/createUser";
import { getTweets } from "@/actions/createTweet";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { getLikes } from "@/actions/likes";
import { getComments } from "@/actions/createComment";
import RetweetForm from "./RetweetForm";
import { getRetweets } from "@/actions/retweet";
import BookmarkForm from "./BookmarkForm";

const TweetsList = async ({ tweetId }: { tweetId: number }) => {
  const tweets = await getTweets();

  const currentUserData = await currentUser();

  const likes = await getLikes();
  const comments = await getComments();
  const retweets = await getRetweets();

  const tweet = tweets.find((tweet) => tweet.id === tweetId);
  if (!tweet) {
    return null;
  }
  const userId = tweet.userId;
  // console.log("userId", userId);
  const user = await clerkClient.users.getUser(userId);
  // console.log("user", user);

  // await createUser(user?.id);
  const countLikes = (tweetId: number) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId: number) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };

  const countretweets = (tweetId: number) => {
    return retweets.filter((retweet) => retweet.tweetId === tweetId).length;
  };

  return (
    <li className="my-10 flex flex-col items-center">
      <Link href={`/${tweetId}`}>
        <div>
          <div className="flex items-center gap-1">
            <img
              src={user?.imageUrl}
              alt="image url"
              className="w-10 h-10 rounded-full"
            />

            <div className="flex items-center gap-5">
              <Link href={`/profile/${tweet?.username}`}>
                <p className="font-bold">{`${user?.firstName} ${user?.lastName}`}</p>
              </Link>
              <p className="text-sm text-gray-500">@{tweet.username}</p>
            </div>
          </div>
          <p className="text-lg mt-2">{tweet.content}</p>
        </div>
      </Link>
      <CommentForm tweetId={tweetId} />
      <div className="flex gap-5 my-1">
        <p className="text-xs text-gray-500">{countLikes(tweetId)} likes</p>
        <p className="text-xs text-gray-500">
          {countcomments(tweetId)} comments
        </p>
        <p className="text-xs text-gray-500">
          {countretweets(tweetId)} retweets
        </p>
      </div>
      <Like tweetId={tweetId} />
      <RetweetForm tweetId={tweetId} username={currentUserData.username} />
      <BookmarkForm tweetId={tweetId} username={currentUserData.username} />
    </li>
  );
};

export default TweetsList;
