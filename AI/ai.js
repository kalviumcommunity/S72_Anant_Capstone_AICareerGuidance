const { GoogleGenerativeAI } = require("@google/generative-ai");

function buildPrompt(userAnswers) {
  let prompt = "You are an AI career counselor. Based on the following user responses, provide career recommendations. The recommendations should be in a JSON array format, where each object in the array has 'career' (string) and 'description' (string) fields. Provide at least 3 recommendations.\n\nUser Responses:\n";

  for (const key in userAnswers) {
    if (userAnswers.hasOwnProperty(key)) {
      prompt += `${key}: ${userAnswers[key]}\n`;
    }
  }

  prompt += "\nProvide only the JSON array, no other text or explanation.";
  return prompt;
}

async function run(userAnswers, apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const prompt = buildPrompt(userAnswers);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("AI Raw Response:", text);

    // Attempt to parse the JSON, handle potential issues
    try {
      const parsedResult = JSON.parse(text);
      return parsedResult;
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      console.error("AI response was not valid JSON:", text);
      // Fallback for non-JSON responses or errors
      return [{ career: "Error", description: "Could not parse AI response. Please try again." }];
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

module.exports = run;