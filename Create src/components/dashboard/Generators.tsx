import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { generateText } from "../../services/api";
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
      const res = await generateText(prompt, user.token);
      setResult(res.generated);
    } catch (err: any) {
      setError(err.message || "Failed to generate text");
    }
    setLoading(false);
  };
  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-3">Text Generator</h3>
      <textarea
        className="w-full border rounded px-2 py-1 mb-2"
        rows={2}
        placeholder="Enter a prompt for text generation..."
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
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
        <div className="mt-4 bg-gray-50 border rounded p-3">
          <strong>Generated Text:</strong>
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </section>
  );
};
export default Generators;
