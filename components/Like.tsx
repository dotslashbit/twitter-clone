// components/Like.tsx
"use client";
import { addLikes, getLikes } from "@/actions/likes";

const Like = ({ tweetId }) => {
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
    <div>
      {/* <p>1</p> */}
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Like;
