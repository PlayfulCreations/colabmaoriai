import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  generateText,
  translateText,
  summarizeText,
  analyzeSentiment,
} from "../../services/api";

const AITools: React.FC = () => {
  const { user } = useAuth();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [aiType, setAiType] = useState<"generate" | "translate" | "summarize" | "sentiment">("generate");
  const [loading, setLoading] = useState(false);
  const [targetLang, setTargetLang] = useState("fr");
  const [error, setError] = useState<string | null>(null);

  const handleRun = async () => {
    if (!user) return;
    setError(null);
    setLoading(true);
    setOutput("");
    try {
      if (aiType === "generate") {
        const res = await generateText(input, user.token);
        setOutput(res.generated);
      } else if (aiType === "translate") {
        const res = await translateText(input, targetLang, user.token);
        setOutput(res.translated);
      } else if (aiType === "summarize") {
        const res = await summarizeText(input, user.token);
        setOutput(res.summary);
      } else if (aiType === "sentiment") {
        const res = await analyzeSentiment(input, user.token);
        setOutput(res.sentiment);
      }
    } catch (err: any) {
      setError(err.message || "Error with AI service");
    }
    setLoading(false);
  };

  return (
    <section className="mb-8">
      <h3 className="text-xl font-semibold mb-3">AI Tools</h3>
      <div className="flex flex-col md:flex-row gap-4 items-start mb-2">
        <select
          className="border rounded px-2 py-1"
          value={aiType}
          onChange={e => setAiType(e.target.value as typeof aiType)}
        >
          <option value="generate">Text Generation</option>
          <option value="translate">Translation</option>
          <option value="summarize">Summarization</option>
          <option value="sentiment">Sentiment Analysis</option>
        </select>
        {aiType === "translate" && (
          <select
            className="border rounded px-2 py-1"
            value={targetLang}
            onChange={e => setTargetLang(e.target.value)}
          >
            <option value="fr">French</option>
            {/* Add more languages/models in backend and here */}
          </select>
        )}
      </div>
      <textarea
        className="w-full border rounded px-2 py-1 mb-2"
        rows={3}
        placeholder={`Enter text for ${aiType}...`}
        value={input}
        onChange={e => setInput(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="bg-accent text-white px-4 py-2 rounded hover:bg-opacity-90"
          onClick={handleRun}
          disabled={loading || !input}
        >
          {loading ? "Running..." : "Run"}
        </button>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded"
          onClick={() => {
            setInput("");
            setOutput("");
            setError(null);
          }}
        >
          Clear
        </button>
      </div>
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {output && (
        <div className="mt-4 bg-gray-50 border rounded p-3">
          <strong>Output:</strong>
          <pre className="whitespace-pre-wrap">{output}</pre>
        </div>
      )}
    </section>
  );
};

export default AITools;
