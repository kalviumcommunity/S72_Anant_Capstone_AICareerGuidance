import React from 'react'
import Header from '../Components/header'
import Footer from '../Components/footer'

function AboutMe() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <Header />
      <div className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-600 to-indigo-700 text-white py-16 md:py-20 px-2 md:px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">Navigate Your Career Journey with <br className="hidden md:block" /><span className="text-blue-200">AI-Powered Guidance</span></h1>
          <p className="text-base sm:text-lg md:text-2xl max-w-2xl mx-auto mb-8 md:mb-10">Discover your perfect career path through intelligent assessments and personalized recommendations powered by advanced AI technology.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-10 mb-8 md:mb-10">
            <div className="flex flex-col items-center">
              <span className="bg-blue-500 bg-opacity-20 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m9-5a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              </span>
              <span className="text-2xl font-bold">10,000+</span>
              <span className="text-sm opacity-80">Career Paths Discovered</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-blue-500 bg-opacity-20 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </span>
              <span className="text-2xl font-bold">95%</span>
              <span className="text-sm opacity-80">Accuracy Rate</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="bg-blue-500 bg-opacity-20 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
              <span className="text-2xl font-bold">5 min</span>
              <span className="text-sm opacity-80">Assessment Time</span>
            </div>
          </div>
          <a href="/test" className="inline-block bg-white text-blue-700 font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg shadow hover:bg-blue-50 transition text-base md:text-lg">Start Your Journey</a>
        </section>

        {/* Mission & Vision */}
        <section className="bg-white py-10 md:py-16 px-2 md:px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">Our Mission & Vision</h2>
          <p className="text-center text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">Empowering individuals to make informed career decisions through cutting-edge AI technology and personalized guidance.</p>
          <div className="flex flex-col md:flex-row gap-8 md:gap-10 max-w-5xl mx-auto">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Why Career Boat Exists</h3>
              <p className="text-gray-700 mb-6">In today's rapidly evolving job market, choosing the right career path can feel overwhelming. Traditional career counseling often lacks the depth and personalization needed to truly understand an individual's unique strengths, interests, and potential.</p>
              <p className="text-gray-700">Career Boat bridges this gap by combining the power of artificial intelligence with comprehensive career assessments, delivering personalized recommendations that align with your skills, personality, and aspirations.</p>
              <div className="flex gap-8 mt-8 justify-center md:justify-start">
                <div className="flex flex-col items-center">
                  <span className="bg-blue-100 rounded-full p-3 mb-2">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v2m0 16v2m8-8h2M2 12H4m15.364-7.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l1.414 1.414M6.05 6.05L4.636 4.636" /></svg>
                  </span>
                  <span className="font-semibold text-gray-700">Passion-Driven</span>
                  <span className="text-xs text-gray-500">Helping you find work you love</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="bg-green-100 rounded-full p-3 mb-2">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m4 0h-1v-4h-1m-4 0h-1v-4h-1" /></svg>
                  </span>
                  <span className="font-semibold text-gray-700">Innovation</span>
                  <span className="text-xs text-gray-500">Cutting-edge AI technology</span>
                </div>
              </div>
            </div>
            <div className="flex-1 bg-gray-50 rounded-2xl p-6 shadow border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Core Values</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="bg-blue-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  </span>
                  <div>
                    <span className="font-semibold text-gray-700">Personalization</span>
                    <p className="text-xs text-gray-500">Every individual is unique, and so should their career guidance be.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-green-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8" /></svg>
                  </span>
                  <div>
                    <span className="font-semibold text-gray-700">Accessibility</span>
                    <p className="text-xs text-gray-500">Making quality career guidance accessible to everyone, everywhere.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-purple-100 rounded-full p-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
                  </span>
                  <div>
                    <span className="font-semibold text-gray-700">Continuous Learning</span>
                    <p className="text-xs text-gray-500">Constantly improving our AI to provide better recommendations.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-10 md:py-16 px-2 md:px-4">
          <h2 className="text-2xl md:text-4xl font-extrabold text-center text-gray-900 mb-4">How Career Boat Works</h2>
          <p className="text-center text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12">Our AI-powered platform makes career discovery simple, accurate, and personalized to your unique profile.</p>
          <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-10 mb-8 md:mb-10">
            <div className="flex flex-col items-center flex-1">
              <span className="bg-blue-100 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.797.657 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </span>
              <h4 className="font-bold text-lg text-gray-800 mb-1">Create Your Profile</h4>
              <p className="text-gray-600 text-sm">Sign up and complete your basic information to get started on your career discovery journey.</p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="bg-blue-100 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              </span>
              <h4 className="font-bold text-lg text-gray-800 mb-1">Take AI Assessment</h4>
              <p className="text-gray-600 text-sm">Complete our comprehensive 5-minute assessment that analyzes your skills, interests, and personality traits.</p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="bg-blue-100 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
              </span>
              <h4 className="font-bold text-lg text-gray-800 mb-1">Get Personalized Results</h4>
              <p className="text-gray-600 text-sm">Receive detailed career recommendations tailored specifically to your unique profile and aspirations.</p>
            </div>
            <div className="flex flex-col items-center flex-1">
              <span className="bg-blue-100 rounded-full p-4 mb-2">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 17v-2a4 4 0 014-4h10a4 4 0 014 4v2" /></svg>
              </span>
              <h4 className="font-bold text-lg text-gray-800 mb-1">Plan Your Path</h4>
              <p className="text-gray-600 text-sm">Access detailed career roadmaps, skill requirements, and growth opportunities for your chosen paths.</p>
            </div>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 md:p-8 text-center max-w-2xl mx-auto mt-8 md:mt-10">
            <h3 className="text-lg md:text-2xl font-bold text-blue-700 mb-2">Ready to Discover Your Perfect Career?</h3>
            <p className="text-gray-700 mb-3 md:mb-4">Join thousands of users who have already found their ideal career path with Career Boat.</p>
            <a href="/test" className="inline-block bg-blue-600 text-white font-semibold px-6 md:px-8 py-2 md:py-3 rounded-lg shadow hover:bg-blue-700 transition text-base md:text-lg">Start Free Assessment</a>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default AboutMe