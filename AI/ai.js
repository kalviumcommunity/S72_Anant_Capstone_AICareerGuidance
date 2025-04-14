require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function runAI(userResponses) {
  const prompt = `Analyze the following user responses and provide career recommendations:

  ${JSON.stringify(userResponses, null, 2)}

  Follow the structured JSON format:

  {
    "career_recommendations": [
      {
        "title": "Software Engineer",
        "description": "Designs and develops software applications.",
        "education_requirements": "Bachelor's in Computer Science or a related field",
        "best_companies": ["Google", "Netflix", "Amazon"],
        "career_paths": ["Junior Developer", "Software Engineer", "Senior Software Engineer", "Software Architect"],
        "required_skills": ["Problem-Solving", "Programming", "Data Structures & Algorithms"],
        "job_outlook": "High demand due to increasing reliance on technology."
      }
    ]
  }`;

  try {
    const result = await model.generateContent(prompt);
    let responseText = await result.response.text();
    responseText = responseText.replace(/```json|```/g, "").trim();
    return JSON.parse(responseText);
  } catch (error) {
    console.error("Error generating content:", error.message);
    return { error: "Failed to generate career recommendations" };
  }
}

module.exports = runAI;