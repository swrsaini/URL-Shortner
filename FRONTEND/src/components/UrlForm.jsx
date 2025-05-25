import React, { useState } from "react";
import { useSelector } from "react-redux";
import { createShortUrl } from "../api/shortUrl.api";

const UrlForm = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copy,setCopy] = useState(false)
  const [slug, setSlug] = useState('');
  const [message, setMessage] = useState('');
  const auth = useSelector(state => state.auth);

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
    <>
    <div className="flex flex-col items-center gap-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow">
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

      {auth.isAuthenticated && (
        <>
          <label className="self-start text-gray-700 font-medium" htmlFor="slug">
            Custom Slug (optional)
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="Enter a custom slug (optional)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        {loading ? 'Shortening...' : 'Short URL'}
      </button>

      {message && <div className="text-red-500 text-center w-full">{message}</div>}
    </form>
    {shortUrl && (
        <div className="flex justify-between px-10 py-4 gap-4 items-center mt-4 text-center w-full rounded-2xl   bg-blue-100">
          <div className="flex flex-col justify-center">
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
          <button 
            onClick={async()=>{
              navigator.clipboard.writeText(shortUrl)
              setCopy(true)
              setTimeout(()=>{
                setCopy(false)
              }, 1000)
            }} 
            className= {`px-4 py-2 bg-blue-600 ${copy ? 'bg-green-500' : 'bg-blue-600'} text-white rounded-2xl cursor-pointer active:bg-blue-300 transition-bg-blue-300 duration-300`}>{!copy ? 'Copy' : 'Copied'}</button>
        </div>
      )}
      </div>
    </>
  );
};

export default UrlForm;
