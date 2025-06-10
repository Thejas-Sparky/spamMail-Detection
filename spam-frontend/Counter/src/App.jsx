import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
      } else {
        setResult({ error: data.error || "Error" });
      }
    } catch (err) {
      setResult({ error: "Server not reachable" });
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", fontFamily: "Arial" }}>
      <h1>Spam Detector</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          cols="50"
          placeholder="Enter your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Checking..." : "Check Spam"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: 20 }}>
          {result.error ? (
            <p style={{ color: "red" }}>{result.error}</p>
          ) : (
            <p>
              Prediction: <b>{result.prediction.toUpperCase()}</b> <br />
              Confidence: {(result.confidence * 100).toFixed(2)}%
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
