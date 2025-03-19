import React from "react";
import "../Styles/Styles.css";
import Header from "../Components/header";
import { NavLink } from "react-router-dom";
import Footer from "../Components/footer";

function Landing() {
  return (
    <div>
      <Header />
      <div className="w-full bg-[url(../assets/hero.jpg)] bg-cover py-35 px-10 flex flex-col items-center justify-center">
        <p className="text-xs uppercase tracking-wide bg-blue-100 text-blue-600 rounded-full px-5 py-1 w-fit text-center mb-8">
          AI-POWERED CAREER GUIDANCE
        </p>
        <h3 className="text-8xl font-bold text-center">
          <span className="text-black">Discover Your Perfect</span> <br />
          <span className="text-blue-500"> Career Path</span>
        </h3>
        <div className="pt-15">
          <NavLink to="/test">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 mx-5">
              Start Assesment
            </button>
          </NavLink>
          <NavLink to="/about">
            <button className="bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-md hover:bg-gray-100">
              Learn More
            </button>
          </NavLink>
        </div>
      </div>

      <div className="w-full bg-white text-center">
        <h3 className="text-3xl text-black font-bold pt-10 pb-6">
          How It Works
        </h3>
        <p class="text-gray-500 mt-2">
          Our data-driven approach combines AI analysis with career expertise to
          help you make confident decisions about your future.
        </p>

        <div class="mt-5 flex justify-between gap-6 pb-20">
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl shadow-blue-300 transition duration-300 flex flex-col items-center text-center m-7">
            <h3 class="mt-4 text-lg font-semibold">AI Assessment</h3>
            <p class="text-gray-500 mt-2">
              Complete our research-backed assessment that analyzes your unique
              traits and preferences.
            </p>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl shadow-blue-300 transition duration-300 flex flex-col items-center text-center m-7">
            <h3 class="mt-4 text-lg font-semibold">Market Insightst</h3>
            <p class="text-gray-500 mt-2">
            Get valuable data on salary expectations, job growth, and required education for each path.
            </p>
          </div>
        
          <div class="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl shadow-blue-300 transition duration-300 flex flex-col items-center text-center m-7">
            <h3 class="mt-4 text-lg font-semibold">Personalized Matches</h3>
            <p class="text-gray-500 mt-2">
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
