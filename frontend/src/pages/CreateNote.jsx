import React from "react";
import { useState } from "react";
import axios from "axios";
import { FiCopy } from "react-icons/fi";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const FRONTEND_URL = import.meta.env.VITE_FRONTEND_URL;

const CreateNote = () => {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError("Note cannot be empty");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const { data } = await axios.post(`${API_BASE_URL}/api/notes`, {
        text,
      });

      // assuming backend returns:

      const noteId = data.data._id;

      setResult({
        url: `${FRONTEND_URL}/notes/${noteId}`,
        password: data.data.password,
      });

      setText("");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to create note. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (value, type) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedField(type);

      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch (error) {
      console.error("Clipboard copy failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Private Note
        </h1>

        <textarea
          className="w-full border rounded p-2 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          rows="4"
          placeholder="Enter your note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold
            bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600
            hover:from-blue-600 hover:via-indigo-600 hover:to-purple-700
            transition-all duration-300
            shadow-md hover:shadow-lg
            active:scale-95
            ${loading && "opacity-70 cursor-not-allowed"}`}
        >
          {loading ? "Creating..." : "Create Note"}
        </button>

        {error && (
          <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
        )}

        {result && (
          <div className="mt-4 bg-gray-50 p-4 rounded space-y-4">
            {/* URL */}
            <div>
              <p className="text-sm font-semibold mb-1">Share URL:</p>
              <div className="relative flex items-center justify-between bg-white border rounded px-3 py-2">
                <span className="text-xs text-gray-700 truncate">
                  {result.url}
                </span>

                <button
                  onClick={() => copyToClipboard(result.url, "url")}
                  className="relative ml-2 p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 active:scale-95"
                >
                  <FiCopy className="w-4 h-4" />

                  {copiedField === "url" && (
                    <span className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-md">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Password */}
            <div>
              <p className="text-sm font-semibold mb-1">Password:</p>
              <div className="relative flex items-center justify-between bg-white border rounded px-3 py-2">
                <span className="text-xs text-gray-700">{result.password}</span>

                <button
                  onClick={() => copyToClipboard(result.password, "password")}
                  className="relative ml-2 p-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-all duration-200 active:scale-95"
                >
                  <FiCopy className="w-4 h-4" />

                  {copiedField === "password" && (
                    <span className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded shadow-md">
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
