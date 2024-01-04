import {
  bookmarkTweet,
  isTweetBookmarked,
  unbookmarkTweet,
} from "@/actions/bookmark";

const BookmarkForm = async ({
  tweetId,
  username,
}: {
  tweetId: number;
  username: string;
}) => {
  const isBookmarked = await isTweetBookmarked(username, tweetId);
  return (
    <form action={isBookmarked ? unbookmarkTweet : bookmarkTweet}>
      <input type="hidden" name="tweetId" value={tweetId} />
      <input type="hidden" name="username" value={username} />
      <button type="submit" className="text-xs text-gray-500">
        {isBookmarked ? "Unbookmark" : "Bookmark"}
      </button>
    </form>
  );
};

export default BookmarkForm;
