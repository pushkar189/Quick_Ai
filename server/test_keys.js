import 'dotenv/config';
import OpenAI from 'openai';

console.log("Testing Gemini API Key...");
const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/"
});

AI.chat.completions.create({
    model: "gemini-2.0-flash",
    messages: [ { role: "user", content: "Hello, reply with 1 word." } ],
    max_tokens: 10,
})
  .then(res => console.log("Gemini OK! Reply:", res.choices[0].message.content))
  .catch(err => {
      console.log("Gemini Error:", err.message);
      if (err.response) {
          console.log("Status:", err.response.status);
      }
  });
