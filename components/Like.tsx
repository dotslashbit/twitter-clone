// components/Like.tsx
"use client";
import { addLikes, getLikes } from "@/actions/likes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Like = ({ tweetId }: { tweetId: number }) => {
  const handleLike = async () => {
    console.log("Like button clicked");
    try {
      await addLikes(tweetId);
    } catch (error) {
      console.error("Error adding like:", error);
      // Handle error as needed
    }
  };
  // const handleLike = async () => {
  //   console.log("Like button clicked");
  //   try {
  //     await addLikes(tweetId);
  //   } catch (error) {
  //     console.error("Error adding like:", error);
  //     // Handle error as needed
  //   }
  // };

  return (
    <div className="text-blue-500 cursor-pointer">
      {/* <p>1</p> */}
      <button
        className="flex items-center text-blue-500 hover:text-blue-700 focus:outline-none"
        onClick={handleLike}
      >
        <FontAwesomeIcon icon={faHeart} className="mr-1 text-sm" />
      </button>
    </div>
  );
};

export default Like;
