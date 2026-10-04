import React from "react";
import { UserProfile } from "@clerk/clerk-react";
import Title from "../components/Title";
import usePageTitle from "../hooks/usePageTitle";

const Profile = () => {
  usePageTitle("My Profile");

  return (
    <div className="pt-12">
      <Title text1="My" text2="profile" color="lilac" note="it's all about you" subtitle="Manage your name, email, password and connected accounts." />
      <div className="flex justify-center">
        <UserProfile routing="hash" />
      </div>
    </div>
  );
};

export default Profile;
