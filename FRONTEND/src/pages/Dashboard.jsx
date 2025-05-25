import React from "react";
import UrlForm from "../components/UrlForm";
import UserUrls from "../components/userUrls";

const Dashboard = () => {
  return (
    <div className="w-screen h-auto mt-30  flex flex-col justify-center">
      <UrlForm />
      <UserUrls/>
    </div>
  );
};

export default Dashboard;
