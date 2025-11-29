import gradio as gr
from openai import OpenAI

# Initialize OpenAI client (you’ll need your API key)
client = OpenAI(api_key="YOUR_API_KEY_HERE")

def explain_code(code):
    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # Fast + smart
            messages=[
                {"role": "system", "content": "You are an expert software tutor who explains code clearly and step-by-step."},
                {"role": "user", "content": f"Explain the following code in detail with logic, purpose, and line-by-line breakdown:\n\n{code}"}
            ]
        )
        return response.choices[0].message.content
    except Exception as e:
        return f"Error: {e}"

# Simple, clean UI
ui = gr.Interface(
    fn=explain_code,
    inputs=gr.Textbox(label="💻 Paste your code here", lines=12, placeholder="Example: for i in range(5): print(i)"),
    outputs=gr.Textbox(label="🧠 Explanation", lines=15),
    title="Code Explainer AI",
    description="Get a clear, detailed explanation of any code you paste — Python, Java, C, etc."
)

ui.launch()

