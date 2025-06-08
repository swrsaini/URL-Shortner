import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copy, setCopy] = useState(false);
  const [slug, setSlug] = useState("");
  const [message, setMessage] = useState("");
  const auth = useSelector((state) => state.auth);

  const handleOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createShortUrl(url, slug);
      setShortUrl(data);
      setMessage("");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setMessage(error.response.data.error);
      } else {
        setMessage("Error shortening URL");
      }
      setShortUrl("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-8 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-lg flex flex-col items-center">
      <form onSubmit={handleOnClick} className="w-full flex flex-col gap-5">
        <h2 className="text-blue-700 font-extrabold text-3xl text-center mb-2 tracking-tight drop-shadow">
          URL Shortener
        </h2>
        <div className="flex flex-col gap-2">
          <label className="text-gray-700 font-semibold" htmlFor="url">
            Enter Your URL
          </label>
          <input
            id="url"
            name="url"
            type="url"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-lg shadow-sm"
          />
        </div>
        {auth.isAuthenticated && (
          <div className="flex flex-col gap-2">
            <label className="text-gray-700 font-semibold" htmlFor="slug">
              Custom Slug (optional)
            </label>
            <input
              id="slug"
              name="slug"
              type="text"
              placeholder="e.g. my-custom-link"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-800 text-lg shadow-sm"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white text-lg font-bold rounded-lg shadow hover:bg-blue-700 transition disabled:bg-blue-300"
          disabled={loading}
        >
          {loading ? "Shortening..." : "Shorten URL"}
        </button>
        {message && (
          <div className="text-red-500 text-center font-semibold w-full bg-red-50 border border-red-200 rounded-lg py-2 px-3 mt-2">
            {message}
          </div>
        )}
      </form>
      {shortUrl && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6 w-full bg-blue-100 border border-blue-200 rounded-xl px-6 py-4 shadow-inner">
          <div className="flex flex-col items-center sm:items-start">
            <span className="text-gray-700 font-semibold mb-1">Short URL:</span>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline break-all font-bold text-lg hover:text-blue-900 transition"
            >
              {shortUrl}
            </a>
          </div>
          <button
            onClick={async () => {
              navigator.clipboard.writeText(shortUrl);
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 1000);
            }}
            className={`px-6 py-2 rounded-lg font-bold shadow transition text-white text-lg ${copy ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"}`}
            type="button"
          >
            {!copy ? "Copy" : "Copied!"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UrlForm;
