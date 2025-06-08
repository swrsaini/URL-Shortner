import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserUrls } from "../api/user.api";
import UrlRow from "./urlRow";
import AnalyticsCharts from "./AnalyticsCharts";
import { fetchShortUrlAnalytics } from "../api/shortUrlAnalytics.api";

const UserUrls = () => {
  const { data: urls = [], isLoading, isError } = useQuery({
    queryKey: ["userUrls"],
    queryFn: fetchUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
  const [page, setPage] = useState(1);
  const urlsPerPage = 10;
  const totalPages = Math.ceil(urls.length / urlsPerPage);
  const paginatedUrls = urls.slice().reverse().slice((page - 1) * urlsPerPage, page * urlsPerPage);

  // Analytics modal state
  const [selectedUrl, setSelectedUrl] = useState(null);
  const analyticsQuery = useQuery({
    queryKey: ["shortUrlAnalytics", selectedUrl?.short_url],
    queryFn: async () => selectedUrl ? await fetchShortUrlAnalytics(selectedUrl.short_url) : null,
    enabled: !!selectedUrl,
    staleTime: 0,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchOnReconnect: true,
  });
  const analyticsData = analyticsQuery.data;
  console.log("Analytics Data:", analyticsData);
  const isAnalyticsLoading = analyticsQuery.isLoading;
  const isAnalyticsError = analyticsQuery.isError;

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
            <UrlRow key={url._id} url={url} onClick={setSelectedUrl} />
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
      {/* Analytics Modal */}
      {selectedUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center px-2 sm:px-4">
          {/* Overlay: only closes if you click outside the modal, not inside */}
          <div
            className="absolute inset-0 z-40"
            onClick={e => {
              if (e.target === e.currentTarget) setSelectedUrl(null);
            }}
          />
          {/* Modal content: scrollable, responsive, and visually appealing */}
          <div
            className="relative z-50 bg-white rounded-2xl shadow-2xl p-2 sm:p-6 md:p-8 w-full max-w-lg md:max-w-2xl lg:max-w-3xl animate-fade-in flex flex-col"
            style={{ maxHeight: '90vh', overflowY: 'auto' }}
            tabIndex={0}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-3xl font-bold focus:outline-none transition-colors"
              onClick={() => setSelectedUrl(null)}
              aria-label="Close analytics modal"
              tabIndex={1}
            >
              &times;
            </button>
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-center text-blue-700">
              Analytics for: <span className="break-all text-blue-500">{selectedUrl.short_url}</span>
            </h3>
            {isAnalyticsLoading ? (
              <div className="flex flex-col items-center justify-center min-h-[200px]">
                <div className="loader mb-2"></div>
                <span className="text-blue-600 font-semibold">Loading analytics...</span>
              </div>
            ) : isAnalyticsError ? (
              <div className="text-center text-red-500">Failed to load analytics</div>
            ) : analyticsData && (
              <>
                <div className="overflow-x-auto pb-2">
                  <AnalyticsCharts data={analyticsData} />
                </div>
                <div className="mt-6 text-center">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition"
                    onClick={() => setSelectedUrl(null)}
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserUrls;

// Loader CSS (add to your global CSS if not present)
// .loader { border: 4px solid #e0e7ef; border-top: 4px solid #2563eb; border-radius: 50%; width: 32px; height: 32px; animation: spin 1s linear infinite; }
// @keyframes spin { 100% { transform: rotate(360deg); } }
