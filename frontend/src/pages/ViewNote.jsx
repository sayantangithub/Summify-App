import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ViewNote() {
  const { id } = useParams();
  const [password, setPassword] = useState("");
  const [note, setNote] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [unlockLoading, setUnlockLoading] = useState(false);

  const unlockNote = async () => {
    if (!password.trim()) {
      setError("Please enter password");
      return;
    }

    try {
      setError("");
      setUnlockLoading(true);

      const response = await axios.post(
        `http://localhost:3000/api/notes/${id}`,
        { password },
      );

      setNote(response.data.data.text);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid password");
    } finally {
      setUnlockLoading(false);
    }
  };

  const summarizeNote = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `http://localhost:3000/api/notes/${id}/summarize`,
      );

      setSummary(response.data.data.summary);
    } catch (err) {
      console.log(err);
      setError("Failed to summarize");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        {!note ? (
          <>
            <h2 className="text-xl font-bold mb-3 text-center">Unlock Note</h2>

            <input
              type="password"
              placeholder="Enter password"
              className="w-full border p-2 rounded mb-3"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              onClick={unlockNote}
              disabled={unlockLoading}
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
            >
              {unlockLoading ? "Unlocking..." : "Unlock"}
            </button>

            {error && (
              <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
            )}
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-3 text-center">Your Note</h2>

            <p className="bg-gray-50 p-3 rounded mb-3 whitespace-pre-wrap">
              {note}
            </p>

            <button
              onClick={summarizeNote}
              disabled={loading}
              className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 disabled:bg-gray-400"
            >
              {loading ? "Generating..." : "Summarize this note"}
            </button>

            {summary && (
              <div className="mt-4 bg-yellow-50 p-3 rounded">
                <h3 className="font-semibold mb-2">Summary</h3>
                <p>{summary}</p>
              </div>
            )}

            {error && (
              <p className="text-red-500 mt-3 text-sm text-center">{error}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ViewNote;
