import React, { useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi";

const CreateNote = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPassword, setCopiedPassword] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Note cannot be empty");
      return;
    }

    try {
      setError("");
      setResult(null);

      const response = await axios.post("http://localhost:3000/api/notes", {
        text,
      });

      const noteId = response.data.data._id;

      setResult({
        url: `http://localhost:5173/notes/${noteId}`, // FRONTEND URL
        password: response.data.data.password,
      });

      setText("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const copyToClipboard = async (text, type) => {
    try {
      await navigator.clipboard.writeText(text);

      if (type === "url") {
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }

      if (type === "password") {
        setCopiedPassword(true);
        setTimeout(() => setCopiedPassword(false), 2000);
      }
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Private Note
        </h1>

        <textarea
          className="w-full border rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
          placeholder="Enter your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-lg text-white font-semibold 
             bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600
             shadow-md hover:shadow-lg
             hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700
             transition-all duration-300
             active:scale-95"
        >
          Create Note
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
        )}

        {result && (
          <div className="mt-4 bg-gray-50 p-4 rounded space-y-4">
            {/* URL Section */}
            <div>
              <p className="text-sm font-semibold mb-1">Share URL:</p>
              <div className="relative flex items-center justify-between bg-white border rounded px-3 py-2">
                <span className="text-xs text-gray-700 truncate">
                  {result.url}
                </span>

                <button
                  onClick={() => copyToClipboard(result.url, "url")}
                  className="ml-2 p-2 rounded-md bg-blue-500 text-white 
                     hover:bg-blue-600 transition-all duration-200 active:scale-95 relative"
                >
                  <FiCopy className="w-4 h-4" />

                  {copiedUrl && (
                    <span
                      className="absolute -top-8 right-0 bg-black text-white 
                             text-xs px-2 py-1 rounded shadow-md animate-fade"
                    >
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Password Section */}
            <div>
              <p className="text-sm font-semibold mb-1">Password:</p>
              <div className="relative flex items-center justify-between bg-white border rounded px-3 py-2">
                <span className="text-xs text-gray-700">{result.password}</span>

                <button
                  onClick={() => copyToClipboard(result.password, "password")}
                  className="ml-2 p-2 rounded-md bg-green-500 text-white 
                     hover:bg-green-600 transition-all duration-200 active:scale-95 relative"
                >
                  <FiCopy className="w-4 h-4" />

                  {copiedPassword && (
                    <span
                      className="absolute -top-8 right-0 bg-black text-white 
                             text-xs px-2 py-1 rounded shadow-md animate-fade"
                    >
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNote;
