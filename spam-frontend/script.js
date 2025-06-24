document.getElementById("spamForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const messageInput = document.getElementById("messageInput");
  const submitButton = document.getElementById("submitButton");
  const resultBox = document.getElementById("resultBox");

  const message = messageInput.value.trim();
  if (!message) return;

  // Disable form and show loading
  submitButton.disabled = true;
  submitButton.textContent = "Checking...";
  resultBox.innerHTML = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (response.ok) {
      resultBox.innerHTML = `
        <p class="result-success">
          Prediction: <strong>${data.prediction.toUpperCase()}</strong><br>
          Confidence: ${(data.confidence * 100).toFixed(2)}%<br>
          Logistic regression works well among other algorithms for this project!!
        </p>`;
    } else {
      resultBox.innerHTML = `<p class="result-error">${data.error || "Error"}</p>`;
    }
  } catch (error) {
    resultBox.innerHTML = `<p class="result-error">Server not reachable</p>`;
  }

  submitButton.disabled = false;
  submitButton.textContent = "Check Spam";
});
