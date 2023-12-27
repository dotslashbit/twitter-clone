import { getComments } from "@/actions/createComment";
import { getTweets } from "@/actions/createTweet";
import { getLikes } from "@/actions/likes";
import CommentForm from "@/components/CommentForm";
import { headers } from "next/headers";

const TweetDetailPage = async () => {
  const headersList = headers();
  const pathname = headersList.get("next-url");
  const tweetId = pathname ? Number(pathname.split("/")[1]) : null;
  const tweets = await getTweets();
  const comments = await getComments();
  const likes = await getLikes();

  const tweet = tweets.find((tweet) => tweet.id === tweetId);

  const commentsForCurrentTweet = (tweetId) => {
    return comments.filter((comment) => comment.tweetId === tweetId);
  };

  const countLikes = (tweetId) => {
    return likes.filter((like) => like.tweetId === tweetId).length;
  };

  const countcomments = (tweetId) => {
    return comments.filter((comment) => comment.tweetId === tweetId).length;
  };

  console.log(tweet);
  return (
    <div>
      <div className="flex items-center gap-1">
        {/* <img
          src={tweet?.u}
          alt="image url"
          className="w-10 h-10 rounded-full"
        /> */}

        {/* <div className="flex items-center gap-5">
          <p>{`${user?.firstName} ${user?.lastName}`}</p>
          <p className="text-sm">@{tweet.username}</p>
        </div> */}
        <p className="text-white">@{tweet?.username}</p>
      </div>
      <p>{tweet?.content}</p>
      <CommentForm tweetId={tweetId} />
      <p>{countLikes(tweetId)} likes</p>
      <p>{countcomments(tweetId)} comments</p>
      <ul className="mt-4 w-full max-w-md">
        {commentsForCurrentTweet(tweetId).map((comment) => {
          return (
            <div key={comment.id}>
              <p>{comment.content}</p>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default TweetDetailPage;
