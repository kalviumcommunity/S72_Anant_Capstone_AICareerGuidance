require('dotenv').config()
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `You are an expert career advisor with deep knowledge of various career paths, industry trends, and educational requirements. Your task is to analyze user responses and provide personalized career recommendations in the following structured JSON format:

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
}

### **Guidelines for the AI:**
1. **Analyze User Preferences**  
   - Consider their interests, skills, and preferred work environment.

2. **Ensure Diversity in Recommendations**  
   - Provide at least 3 different career recommendations covering different industries.
   - Suggest both traditional and modern career paths.

3. **Include Career Growth Information**  
   - Mention entry-level roles, mid-career roles, and senior-level career paths.

4. **Consider Educational Requirements**  
   - Specify if a degree is required or if alternative pathways (certifications, self-learning) exist.

5. **Job Market Demand & Salary Trends**  
   - Mention whether the field is growing and include estimated salary ranges.

For now, generate dummy data.
`;

async function run() {
    try {
        const result = await model.generateContent(prompt);
        let responseText = await result.response.text(); 
        console.log("Raw Response:", responseText);

        responseText = responseText.replace(/```json|```/g, "").trim();
        const jsonData = JSON.parse(responseText);
        console.log("Career Recommendations:", jsonData);

        return jsonData; 
    } catch (error) {
        console.error("Error generating content:", error.message);
    }
}
run()

module.exports=run
