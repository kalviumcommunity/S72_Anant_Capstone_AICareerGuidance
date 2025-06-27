const { GoogleGenerativeAI } = require("@google/generative-ai");

function buildPrompt(userAnswers) {
  let prompt = "You are an AI career counselor. Based on the following user responses, provide career recommendations. The recommendations should be in a JSON array format, where each object in the array has the following fields:\n- 'title' (string, required)\n- 'description' (string, required)\n- 'education_requirements' (string, required)\n- 'best_companies' (array of strings, required)\n- 'career_paths' (array of strings, required)\n- 'required_skills' (array of strings)\n- 'job_outlook' (array of strings)\n\nProvide at least 3 recommendations.\n\nUser Responses:\n";

  for (const key in userAnswers) {
    if (userAnswers.hasOwnProperty(key)) {
      prompt += `${key}: ${userAnswers[key]}\n`;
    }
  }

  prompt += "\nIMPORTANT: Provide ONLY the JSON array, no other text, explanation, or markdown formatting outside the JSON.";
  return prompt;
}

async function run(userAnswers) {
  apiKey=process.env.API_KEY
  const genAI = new GoogleGenerativeAI(apiKey);
  console.log(apiKey)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const prompt = buildPrompt(userAnswers);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    // Extract only the JSON part by finding the first '[' and last ']' characters
    const startIndex = text.indexOf('[');
    const endIndex = text.lastIndexOf(']');

    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      text = text.substring(startIndex, endIndex + 1).trim();
    } else if (text.startsWith('```json') && text.endsWith('```')) {
      // Fallback for cases where the AI might still use markdown fences but no leading/trailing text
      text = text.substring('```json\n'.length, text.lastIndexOf('```')).trim();
    }
    console.log("AI Raw Response:", text);

    // Attempt to parse the JSON, handle potential issues
    try {
      const parsedResult = JSON.parse(text);
      console.log("Parsed Result:", parsedResult);
      return { career_recommendations: parsedResult };
    } catch (jsonError) {
      console.error("JSON parsing error:", jsonError);
      console.error("AI response was not valid JSON:", text);
      // Fallback for non-JSON responses or errors
      return { career_recommendations: [{ career: "Error", description: "Could not parse AI response. Please try again." }] };
    }
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
}

module.exports = { run };