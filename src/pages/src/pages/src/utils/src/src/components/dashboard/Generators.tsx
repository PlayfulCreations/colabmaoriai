import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const Generators: React.FC = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    setResult("");
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) throw new Error("Failed to generate text");
      const res = await response.json();
      setResult(res.generated);
    } catch (err: any) {
      setError(err.message || "Failed to generate text");
    }
    setLoading(false);
  };

  return (
    <section>
      <h3 className="text-xl font-semibold mb-3">Text Generator</h3>
      <textarea
        className="w-full border rounded px-2 py-1 mb-2"
        rows={3}
        placeholder="Write a prompt (e.g. Generate a Māori proverb about learning)"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleGenerate}
          disabled={loading || !prompt}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          onClick={() => {
            setPrompt("");
            setResult("");
            setError(null);
          }}
        >
          Clear
        </button>
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {result && (
        <div className="mt-4 bg-gray-50 border rounded p-3 whitespace-pre-line">
          <strong>Result:</strong>
          <pre>{result}</pre>
        </div>
      )}
    </section>
  );
};

export default Generators;
