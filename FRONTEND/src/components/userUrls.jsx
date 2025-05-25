import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../utils/axiosInstance";
import { fetchUserUrls } from "../api/user.api";
import UrlRow from "./urlRow";

const UserUrls = () => {
  const { data: urls = [], isLoading, isError } = useQuery({
    queryKey: ["userUrls"],
    queryFn: fetchUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  const [page, setPage] = useState(1);
  const urlsPerPage = 10;
  const totalPages = Math.ceil(urls.length / urlsPerPage);
  const paginatedUrls = urls.slice((page - 1) * urlsPerPage, page * urlsPerPage);

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className="loader mb-2"></div>
      <span className="text-blue-600 font-semibold">Loading...</span>
    </div>
  );
  if (isError) return <div className="text-center text-red-500">Failed to fetch URLs</div>;
  if (!urls.length) return <div className="text-center">No URLs found.</div>;

  return (
    <div className="w-full max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Your Shortened URLs</h2>
      <table className="w-full min-w-[900px] table-auto border-collapse">
        <thead>
          <tr className="bg-blue-100">
            <th className="px-4 py-2 text-left">Short URL</th>
            <th className="px-4 py-2 text-left">Original URL</th>
            <th className="px-4 py-2 text-center">Clicks</th>
            <th className="px-4 py-2 text-center">Copy</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUrls.map((url) => (
            <UrlRow key={url._id} url={url} />
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="px-3 py-1 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Prev
          </button>
          <span className="px-2 py-1 font-semibold">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="px-3 py-1 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};


export default UserUrls;

// Loader CSS (add to your global CSS if not present)
// .loader { border: 4px solid #e0e7ef; border-top: 4px solid #2563eb; border-radius: 50%; width: 32px; height: 32px; animation: spin 1s linear infinite; }
// @keyframes spin { 100% { transform: rotate(360deg); } }
