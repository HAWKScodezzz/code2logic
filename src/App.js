import React, { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setOutput("");
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else if (data.line_explanations) {
        const explanationText = data.line_explanations
          .map((line) => `Line ${line.line}: ${line.explanation}`)
          .join("\n");

        setOutput(`${explanationText}\n\nSummary: ${data.short_summary}`);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("❌ Could not connect to backend. Make sure Flask is running.");
    }
  };

  return (
    <div className="app">
      <h1>⚡ Code2Logic ⚙️</h1>
      <textarea
        placeholder="Enter your code here..."
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleAnalyze}>Analyze</button>
      {error && <p className="error-text">{error}</p>}
      <div className="output-box">
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;

