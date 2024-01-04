import { bookmarkTweet } from "@/actions/bookmark";

const BookmarkForm = async ({
  tweetId,
  username,
}: {
  tweetId: number;
  username: string;
}) => {
  return (
    <form action={bookmarkTweet}>
      <input type="hidden" name="tweetId" value={tweetId} />
      <input type="hidden" name="username" value={username} />
      <button type="submit" className="text-xs text-gray-500">
        Bookmark
      </button>
    </form>
  );
};

export default BookmarkForm;
