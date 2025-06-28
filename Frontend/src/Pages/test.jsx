import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../Components/header'

function Test() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState({})
  const [aiResult, setAiResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/questions')
        setQuestions(res.data)
      } catch (err) {
        setError('Failed to fetch questions')
      } finally {
        setLoading(false)
      }
    }
    fetchQuestions()
  }, [])

  const handleOptionChange = (e) => {
    setAnswers({ ...answers, [questions[current]._id]: e.target.value })
  }

  const handleTextChange = (e) => {
    setAnswers({ ...answers, [questions[current]._id]: e.target.value })
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (current < questions.length - 1) {
      setCurrent(current + 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    setAiResult(null)
    try {
      const token = localStorage.getItem("jwtToken");

      if (!token) {
        alert("Authentication token missing. Please log in again.");
        return;
      }

      const requestBody = {
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId,
          answer,
        })),
      };
  
      console.log("🟢 Sending request body:", requestBody); // Debugging Log
  
      const res = await fetch("http://localhost:5000/api/user/submit-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });
  
      if (res.ok) {
        const data = await res.json();
        // Ensure aiResult is always an object with a career_recommendations array
        if (Array.isArray(data.recommendations)) {
          setAiResult({ career_recommendations: data.recommendations });
        } else if (Array.isArray(data.career_recommendations)) {
          setAiResult({ career_recommendations: data.career_recommendations });
        } else {
          setAiResult(null);
        }
      } else {
        console.error("🔴 Failed to submit test. Server response:", await res.text());
        alert("Failed to submit test.");
      }
    } catch (error) {
      console.error("🔴 Error submitting responses:", error);
    } finally {
      setSubmitting(false)
    }
  }

  const progress = questions.length > 0 ? ((current + 1) / questions.length) * 100 : 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-2 md:px-4 py-6 md:py-12">
        {!aiResult ? (
          <div className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
            <div className="text-center mb-6 md:mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">Career Assessment</h2>
              <p className="text-gray-500 text-sm md:text-base">Answer the questions to discover your tailored career paths.</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mb-4 md:h-2.5">
              <div className="bg-indigo-600 h-2 md:h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
            <div className="text-center text-xs md:text-sm font-medium text-gray-600 mb-6 md:mb-8">Question {current + 1} of {questions.length}</div>
            {loading && <div className="text-center py-8"><span className="text-indigo-500">Loading...</span></div>}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!loading && !error && questions.length > 0 && (
              <form onSubmit={current === questions.length - 1 ? handleSubmit : handleNext}>
                <div>
                  <p className="text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6 text-center">{questions[current].text}</p>
                  {questions[current].type === 'mcq' ? (
                    <div className="space-y-3 md:space-y-4">
                      {questions[current].options.map((opt, i) => (
                        <label key={i} className={`block p-3 md:p-4 rounded-lg border cursor-pointer transition-all ${answers[questions[current]._id] === opt ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-200' : 'bg-white border-gray-300 hover:border-indigo-400'}`}>
                          <input
                            type="radio"
                            name={`question_${current}`}
                            value={opt}
                            checked={answers[questions[current]._id] === opt}
                            onChange={handleOptionChange}
                            required
                            className="sr-only"
                          />
                          <span className="text-base md:text-lg text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  ) : (
                    <input
                      type="text"
                      className="w-full p-3 md:p-4 border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-base md:text-lg"
                      placeholder="Type your answer here..."
                      value={answers[questions[current]._id] || ''}
                      onChange={handleTextChange}
                      required
                    />
                  )}
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-10 gap-3 md:gap-0">
                  <button type="button" onClick={() => current > 0 && setCurrent(current - 1)} disabled={current === 0} className="px-4 md:px-6 py-2 text-base md:text-lg font-semibold text-gray-700 bg-gray-200 rounded-lg disabled:opacity-50">
                    Back
                  </button>
                  {current < questions.length - 1 ? (
                    <button type="submit" className="px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">
                      Next
                    </button>
                  ) : (
                    <button type="submit" disabled={submitting} className="px-6 md:px-8 py-2 md:py-3 text-base md:text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700">
                      {submitting ? 'Analyzing...' : 'Get My Results'}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-4xl font-extrabold text-gray-800 mb-2 md:mb-3">Your Career Recommendations</h2>
              <p className="text-base md:text-xl text-gray-600">Based on your answers, here are some paths you might excel in.</p>
            </div>
            <div className="space-y-6 md:space-y-8">
              {aiResult && Array.isArray(aiResult.career_recommendations) && aiResult.career_recommendations.map((rec, idx) => (
                <div key={idx} className="bg-white p-4 md:p-8 rounded-2xl shadow-lg border border-gray-200">
                  <h3 className="text-xl md:text-3xl font-bold text-indigo-700 mb-3 md:mb-4">{rec.title}</h3>
                  <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">{rec.description}</p>
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 border-b pb-2">Education & Outlook</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-4">
                        <p><span className="font-bold text-gray-600">Education Required:</span> {rec.education_requirements}</p>
                        <p><span className="font-bold text-gray-600">Job Outlook:</span> {rec.job_outlook}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 border-b pb-2">Career Trajectory</h4>
                      <div className="mt-2 md:mt-4">
                        <p className="font-bold text-gray-600 mb-1 md:mb-2">Potential Career Paths:</p>
                        <div className="flex flex-wrap items-center gap-2">
                          {rec.career_paths.map((path, i) => (
                            <React.Fragment key={i}>
                              <span className="bg-indigo-100 text-indigo-800 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-medium">{path}</span>
                              {i < rec.career_paths.length - 1 && <span className="text-gray-400 font-bold text-lg md:text-xl">→</span>}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3 border-b pb-2">Skills & Opportunities</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-2 md:mt-4">
                        <div>
                          <p className="font-bold text-gray-600 mb-1">Key Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {rec.required_skills.map(skill => <span key={skill} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs md:text-sm">{skill}</span>)}
                          </div>
                        </div>
                        <div>
                          <p className="font-bold text-gray-600 mb-1">Top Companies:</p>
                          <div className="flex flex-wrap gap-2">
                            {rec.best_companies.map(company => <span key={company} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs md:text-sm">{company}</span>)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Test