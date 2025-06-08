import React from "react";
import { useQuery } from "@tanstack/react-query";
import UrlForm from "../components/UrlForm";
import UserUrls from "../components/userUrls";
import AnalyticsCharts from "../components/AnalyticsCharts";
import { fetchUserAnalytics } from "../api/analytics.api";

const Dashboard = () => {
  const { data: analyticsData, isLoading, isError } = useQuery({
    queryKey: ["userAnalytics"],
    queryFn: fetchUserAnalytics,
    refetchInterval: 60000, // Refetch every 60 seconds
  });
  return (
    <div className="w-screen h-auto mt-30 flex flex-col justify-center gap-8">
      <UrlForm />
      
      <UserUrls />
    </div>
  );
};

export default Dashboard;
