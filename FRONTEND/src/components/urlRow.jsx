import React from "react";

const UrlRow = ({ url }) => {
  const [copied, setCopied] = React.useState(false);
  const shortUrlFull = `http://localhost:3000/${url.short_url.replace(/^\//, '')}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortUrlFull);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <tr className="border-b hover:bg-blue-50 transition">
      <td className="px-4 py-2">
        <a
          href={shortUrlFull}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline break-all font-semibold hover:text-blue-800"
        >
          {shortUrlFull}
        </a>
      </td>
      <td className="px-4 py-2 break-all text-gray-700">{url.full_url}</td>
      <td className="px-4 py-2 text-center font-mono text-lg">{url.clicks}</td>
      <td className="px-4 py-2 text-center">
        <button
          onClick={handleCopy}
          className={`px-3 py-1 rounded bg-blue-500 text-white font-semibold shadow hover:bg-blue-700 transition ${copied ? 'bg-green-500' : ''}`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </td>
    </tr>
  );
};

export default UrlRow;