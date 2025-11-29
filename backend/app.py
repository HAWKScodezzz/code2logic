from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)

# Replace with your actual OpenAI API key
openai.api_key = "YOUR_API_KEY"

@app.route('/analyze', methods=['POST'])
def analyze_code():
    data = request.get_json()
    code = data.get("code", "")

    prompt = f"""
You are an expert software engineer and code explainer.
1️⃣ First, detect what programming language this code is written in.
2️⃣ Then, explain what the code does step by step, in a clear and human way.
3️⃣ Finally, give a short summary of the overall logic or purpose.

Code:
{code}

Format like this:
🧩 Language: ...
🔹 Step 1: ...
🔹 Step 2: ...
🔹 Step 3: ...
🧠 Summary: ...
"""

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # or gpt-4 if you have access
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7,
        )

        explanation = response["choices"][0]["message"]["content"]
        return jsonify({"result": explanation})

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)


