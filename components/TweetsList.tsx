import Link from "next/link";
import CommentForm from "./CommentForm";
import Like from "./Like";
import { createUser } from "@/actions/createUser";
import { getTweets } from "@/actions/createTweet";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { getLikes } from "@/actions/likes";
import { getComments } from "@/actions/createComment";

const TweetsList = async ({ tweetId }) => {
  const tweets = await getTweets();

  const likes = await getLikes();
  const comments = await getComments();

  const tweet = tweets.find((tweet) => tweet.id === tweetId);
  const userId = tweet.userId;
  console.log("userId", userId);
  const user = await clerkClient.users.getUser(userId);
  console.log("user", user);

  // await createUser(user?.id);
  const countLikes = (tweetId) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };
  return (
    <li className="my-10">
      <Link href={`/${tweetId}`}>
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
      <CommentForm tweetId={tweetId} />
      <div className="flex gap-5 my-1">
        <p className="text-xs text-gray-500">{countLikes(tweetId)} likes</p>
        <p className="text-xs text-gray-500">
          {countcomments(tweetId)} comments
        </p>
      </div>
      <Like classname="text-blue-500 cursor-pointer" tweetId={tweetId} />
    </li>
  );
};

export default TweetsList;