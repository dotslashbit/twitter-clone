import {
  bookmarkTweet,
  isTweetBookmarked,
  unbookmarkTweet,
} from "@/actions/bookmark";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        {isBookmarked ? (
          <FontAwesomeIcon icon={faBookmark} color="grey" />
        ) : (
          <FontAwesomeIcon icon={faBookmark} color="cyan" />
        )}
      </button>
    </form>
  );
};

export default BookmarkForm;
