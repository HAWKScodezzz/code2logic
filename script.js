console.log("✅ script.js loaded");

document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM ready");

  const btn = document.getElementById("explain-btn");
  const codeBox = document.getElementById("code-input");
  const output = document.getElementById("output");

  if (!btn) {
    console.error("❌ Button not found in DOM");
    return;
  }

  btn.addEventListener("click", async () => {
    console.log("🎯 Button clicked");

    const code = codeBox.value.trim();
    if (!code) {
      output.innerText = "⚠️ Please enter some code first!";
      return;
    }

    output.innerText = "⏳ Fetching from backend...";

    try {
      const res = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      console.log("📡 Response received:", res);
      const data = await res.json();
      console.log("📦 JSON parsed:", data);

      output.innerText = JSON.stringify(data, null, 2);
    } catch (err) {
      console.error("❌ Error in fetch:", err);
      output.innerText = "❌ Backend fetch failed.";
    }
  });
});



