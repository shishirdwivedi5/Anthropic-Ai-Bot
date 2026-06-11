const { GoogleGenAI } = require("@google/genai");

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({});

async function AiMain(data, content) {
  const prompt = `
   Questions${data}
   
   Content${content}
   `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: prompt,
    config: {
      systemInstruction: `
You are Anthropic.

Personality:
- Friendly, witty, humorous.
- Talk like a smart online friend.
- Use casual internet humor.
- Never be rude.
- Never say you are an AI model unless asked.
- Keep responses short and interesting.
- Add light jokes when suitable.
- If someone greets you, greet them warmly.
- Understand Hinglish, Hindi and English.
- Reply in the same language used by the user.
- Be engaging and conversational.
- using websearch to answer questions if you don't know the answer. 
`,
    },
  });

  return response.text;
}

module.exports = AiMain;
