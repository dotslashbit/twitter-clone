import { getProfile } from "@/actions/getProfile";
import { getLikes } from "@/actions/likes";
import { getComments } from "@/actions/createComment";
import TweetList from "@/components/TweetList";
import { getFollowers, getFollowing, onFollow } from "@/actions/follow";
import { getTweets } from "@/actions/createTweet";

type Tweet = {
  id: number;
  userId: string;
  username: string;
  content: string;
  createdAt: Date;
};

type User = {
  id: string;
  username: string;
  imageUrl: string;
  firstName: string | null;
  lastName: string | null;
};

type Comment = {
  id: number;
  userId: string;
  tweetId: number;
  content: string;
  createdAt: Date;
};

type Like = {
  id: number;
  userId: string;
  tweetId: number;
  createdAt: Date;
};

type Follower = {
  id: number;
  followerId: string;
  followingId: string;
  createdAt: Date;
};

type Following = {
  id: number;
  followerId: string;
  followingId: string;
  createdAt: Date;
};

const ProfilePage = async ({ params }) => {
  const tweets = await getTweets();
  console.log("searchParams", params);
  const username = params[":username"];
  const user = await getProfile(username);
  const followers = await getFollowers(user.username);
  const following = await getFollowing(user.username);
  const likes = await getLikes();
  const comments = await getComments();

  console.log("tweetsssssss", tweets);
  return (
    <div className="flex flex-col items-center p-8  text-gray-800">
      <img
        className="w-48 h-48 rounded-full object-cover"
        src={user.imageUrl}
        alt="user image"
      />
      <div className="mt-4 text-center text-white">
        <div className="flex gap-1 font-bold">
          <p className="text-lg">{user?.firstName}</p>
          <p className="text-lg">{user?.lastName}</p>
        </div>
        <p className="text-xl">@{user?.username}</p>
        <div className="flex gap-4">
          <p className="text-lg">Followers: {followers.length}</p>
          <p className="text-lg">Following: {following.length}</p>
        </div>
      </div>
      <form action={onFollow}>
        <input type="hidden" name="followingId" value={user?.id} />
        <button type="submit">FOLLOW</button>
      </form>
      <ul className="mt-4 w-full max-w-md">
        {tweets.map((tweet) => (
          <li key={tweet.id}>
            <TweetList
              tweet={tweet}
              user={user}
              likes={likes}
              comments={comments}
              tweetId={tweet.id}
              key={tweet.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
