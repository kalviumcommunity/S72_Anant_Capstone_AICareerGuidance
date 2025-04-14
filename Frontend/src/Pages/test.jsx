import { useState, useEffect } from "react";

const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/questions");
        const data = await res.json();
        console.log(data)
        setQuestions(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion]._id]: selectedOption,
    }));

    setSelectedOption(null); 

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      submitResponses();
    }
  };

  const [careerRecommendations, setCareerRecommendations] = useState(null);

  const submitResponses = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("User not logged in. Please log in first.");
        return;
      }
            const requestBody = {
        userId,
        responses: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };
  
      console.log("🟢 Sending request body:", requestBody); // Debugging Log
  
      const res = await fetch("http://localhost:5000/api/user/submit-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
  
      if (res.ok) {
        const data = await res.json();
        setCareerRecommendations(data.recommendations);
      } else {
        console.error("🔴 Failed to submit test. Server response:", await res.text());
        alert("Failed to submit test.");
      }
    } catch (error) {
      console.error("🔴 Error submitting responses:", error);
    }
  };
    

  if (loading) return <p>Loading questions...</p>;
  if (questions.length === 0) return <p>No questions available.</p>;
return(
<div className="flex text-center justify-center items-center min-h-screen bg-gray-100 bg-[url(https://i.pinimg.com/736x/14/74/89/14748961d5c979e3cdda1b70d766ea6d.jpg)] bg-cover bg-center">
  <div className="max-w-2xl w-full p-8 border-2 border-cyan-800 rounded-lg shadow-lg bg-white/80 backdrop-blur-md">
    {!careerRecommendations ? (
      <>
        {/* Question Counter */}
        <h2 className="text-gray-700 font-semibold text-lg">
          Question {currentQuestion + 1} of {questions.length}
        </h2>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-2.5 my-4">
          <div
            className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>

        {/* Question Text */}
        <h1 className="text-2xl font-bold text-gray-900 my-6">
          {questions[currentQuestion].text}
        </h1>

        {/* Options */}
        {questions[currentQuestion].options.map((option, index) => (
          <label
            key={index}
            className={`block p-4 border rounded-lg my-2 cursor-pointer transition-all duration-200 ${
              selectedOption === option
                ? "bg-blue-200 border-blue-500 scale-105"
                : "border-gray-300 bg-white hover:bg-gray-100"
            }`}
            onClick={() => handleOptionSelect(option)}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={() => handleOptionSelect(option)}
              className="hidden"
            />
            {option}
          </label>
        ))}

        {/* Next/Submit Button */}
        <button
          onClick={handleNext}
          disabled={selectedOption === null}
          className={`mt-6 px-6 py-2 rounded-md font-semibold transition-all duration-200 ${
            selectedOption
              ? "bg-blue-500 text-white hover:bg-blue-600 shadow-md"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
        </button>
      </>
    ) : (
      /* Career Recommendations Section */
      <div className="text-left">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🎯 Career Recommendations
        </h2>
        <p className="text-gray-600 text-sm mb-6">
          Based on your responses, here are some careers that might suit you:
        </p>

        {careerRecommendations.career_recommendations.map((career, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white/80 backdrop-blur-md shadow-md mb-4">
            <h3 className="text-lg font-semibold text-blue-600">{career.title}</h3>
            <p className="text-gray-700 text-sm mt-1">{career.description}</p>
            <p className="text-gray-600 text-sm mt-2">
              <strong>Skills Required:</strong> {career.required_skills.join(", ")}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              <strong>Top Companies:</strong> {career.best_companies.join(", ")}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              <strong>Education:</strong> {career.education_requirements}
            </p>
          </div>
        ))}

        {/* Retake Test Button */}
        <button
          onClick={() => setCareerRecommendations(null)}
          className="mt-6 px-6 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 shadow-md transition-all duration-200"
        >
          Retake Test
        </button>
      </div>
    )}
  </div>
</div>
)
};

export default TestPage;
