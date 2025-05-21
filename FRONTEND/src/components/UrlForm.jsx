import axios from "axios";
import React, { useState } from "react";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleOnClick = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await createShortUrl(url);
      setShortUrl(data);
    } catch (error) {
      console.error("Error shortening URL:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleOnClick}
      className="flex flex-col items-center gap-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow"
    >
      <h2 className="text-gray-700 m-4 font-bold text-2xl text-center">URL SHORTENER</h2>

      <label className="self-start text-gray-700 font-medium" htmlFor="url">
        Enter Your URL
      </label>
      <input
        id="url"
        name="url"
        type="url"
        placeholder="Enter a URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'Shortening...' : 'Short URL'}
      </button>

      {shortUrl && (
        <div className="mt-4 text-center">
          <p className="text-gray-700 font-medium">Short URL:</p>
          <a
            href={shortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline break-all"
          >
            {shortUrl}
          </a>
        </div>
      )}
    </form>
  );
};

export default UrlForm;
