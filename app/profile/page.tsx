import { createProfile } from "@/actions/createProfile";
import React from "react";

const CreateProfilePage = async () => {
  return (
    <form action={createProfile}>
      <input type="text" placeholder="username" name="username" />
      <input type="text" placeholder="bio..." name="bio" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateProfilePage;
