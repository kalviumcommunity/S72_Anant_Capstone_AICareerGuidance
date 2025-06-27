import React from "react";
import "../Styles/Styles.css";
import Header from "../Components/header";
import { NavLink } from "react-router-dom";
import Footer from "../Components/footer";


function Landing() {

  


  return (
    <div>
      <Header />
      <div className="w-full bg-[url(../assets/hero.jpg)] bg-cover py-20 md:py-36 px-4 md:px-10 flex flex-col items-center justify-center">
        <p className="text-xs md:text-sm uppercase tracking-wide bg-blue-100 text-blue-600 rounded-full px-4 md:px-5 py-1 w-fit text-center mb-6 md:mb-8">
          AI-POWERED CAREER GUIDANCE
        </p>
        <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-tight">
          <span className="text-black">Discover Your Perfect</span> <br />
          <span className="text-blue-500"> Career Path</span>
        </h3>
        <div className="pt-8 md:pt-12 flex flex-col sm:flex-row gap-4 md:gap-8">
          <NavLink to="/test">
            <button className="bg-blue-600 text-white px-5 md:px-6 py-2 md:py-3 rounded-md hover:bg-blue-700 w-full sm:w-auto">
              Start Assessment
            </button>
          </NavLink>
          <NavLink to="/about">
            <button className="bg-white text-gray-700 border border-gray-300 px-5 md:px-6 py-2 md:py-3 rounded-md hover:bg-gray-100 w-full sm:w-auto">
              Learn More
            </button>
          </NavLink>
        </div>
      </div>

      <div className="w-full bg-white text-center">
        <h3 className="text-2xl md:text-3xl text-black font-bold pt-8 md:pt-10 pb-4 md:pb-6">
          How It Works
        </h3>
        <p className="text-gray-500 mt-2 text-sm md:text-base max-w-2xl mx-auto">
          Our data-driven approach combines AI analysis with career expertise to help you make confident decisions about your future.
        </p>

        <div className="mt-5 flex flex-col md:flex-row justify-center gap-4 md:gap-6 pb-10 md:pb-20">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl shadow-blue-300 transition duration-300 flex flex-col items-center text-center m-3 md:m-7 w-full md:w-1/3">
            <h3 className="mt-2 md:mt-4 text-base md:text-lg font-semibold">AI Assessment</h3>
            <p className="text-gray-500 mt-2 text-xs md:text-base">
              Complete our research-backed assessment that analyzes your unique traits and preferences.
            </p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl shadow-blue-300 transition duration-300 flex flex-col items-center text-center m-3 md:m-7 w-full md:w-1/3">
            <h3 className="mt-2 md:mt-4 text-base md:text-lg font-semibold">Market Insights</h3>
            <p className="text-gray-500 mt-2 text-xs md:text-base">
              Get valuable data on salary expectations, job growth, and required education for each path.
            </p>
          </div>
        
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-lg hover:shadow-xl shadow-blue-300 transition duration-300 flex flex-col items-center text-center m-3 md:m-7 w-full md:w-1/3">
            <h3 className="mt-2 md:mt-4 text-base md:text-lg font-semibold">Personalized Matches</h3>
            <p className="text-gray-500 mt-2 text-xs md:text-base">
              Receive tailored career recommendations that align with your skills, interests, and values.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Landing;
