import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/header';

function Profile() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const [profilePic, setProfilePic] = useState('/default-profile.png');
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  useEffect(() => {
    const fetchProfilePic = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (token) {
          const res = await axios.get('https://s72-anant-capstone-aicareerguidance.onrender.com/api/user/profile-pic', {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.data.profilePicUrl) {
            setProfilePic(`https://s72-anant-capstone-aicareerguidance.onrender.com${res.data.profilePicUrl}`);
            localStorage.setItem('profilePicUrl', `https://s72-anant-capstone-aicareerguidance.onrender.com${res.data.profilePicUrl}`);
          } else {
            setProfilePic('/default-profile.png');
          }
        } else {
          setProfilePic('/default-profile.png');
        }
      } catch (err) {
        setProfilePic('/default-profile.png');
      }
    };

    const fetchTests = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) {
          setError('You must be logged in to view your test history.');
          setLoading(false);
          return;
        }
        const res = await axios.get('https://s72-anant-capstone-aicareerguidance.onrender.com/api/user/tests', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTests(res.data.tests || []);
      } catch (err) {
        setError('Failed to fetch test history.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfilePic();
    fetchTests();
  }, []);

  const handleTestClick = (test) => {
    setSelectedTest(test);
  };

  const handleBackToList = () => {
    setSelectedTest(null);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadMsg('');
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      setUploadMsg('Please select an image to upload.');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    const formData = new FormData();
    formData.append('profilePicture', selectedFile);
    try {
      const token = localStorage.getItem('jwtToken');
      const res = await axios.post('https://s72-anant-capstone-aicareerguidance.onrender.com/api/user/upload-profile-pic', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        },
      });
      setProfilePic(`https://s72-anant-capstone-aicareerguidance.onrender.com${res.data.profilePicUrl}`);
      localStorage.setItem('profilePicUrl', `https://s72-anant-capstone-aicareerguidance.onrender.com${res.data.profilePicUrl}`);
      setUploadMsg('Profile picture updated successfully!');
      setSelectedFile(null);
    } catch (error) {
      setUploadMsg('Failed to upload profile picture.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      <div className="max-w-3xl mx-auto px-2 md:px-4 py-6 md:py-10">
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col items-center mb-8 md:mb-10 border border-gray-200">
          <div className="relative mb-4">
            <img src={profilePic} alt="Profile" className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-400 shadow-lg" />
            <label htmlFor="profile-upload" className="absolute bottom-2 right-2 bg-indigo-600 text-white rounded-full p-2 cursor-pointer shadow-md hover:bg-indigo-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm-2 2v3a2 2 0 002 2h3" /></svg>
              <input id="profile-upload" type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
            </label>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">Welcome to Your Profile</h1>
          <p className="text-gray-500 mb-4 text-center text-sm md:text-base">Update your profile picture and review your assessment history.</p>
          <button
            onClick={handleFileUpload}
            disabled={uploading}
            className={`mt-2 px-4 md:px-6 py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
          {uploadMsg && <p className={`mt-2 text-sm ${uploadMsg.includes('success') ? 'text-green-600' : 'text-red-500'}`}>{uploadMsg}</p>}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 border border-gray-200">
          {selectedTest ? (
            <div>
              <button onClick={handleBackToList} className="mb-6 px-3 md:px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700">← Back to Test History</button>
              <h2 className="text-xl md:text-2xl font-bold text-indigo-700 mb-4">Results for Test on {new Date(selectedTest.date).toLocaleDateString()}</h2>
              <div className="space-y-6 md:space-y-8">
                {selectedTest.recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-indigo-50 p-4 md:p-6 rounded-2xl shadow border border-indigo-100">
                    <h3 className="text-lg md:text-xl font-bold text-indigo-800 mb-2">{rec.title}</h3>
                    <p className="text-gray-700 mb-4 text-sm md:text-base">{rec.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Education Required</h4>
                        <p className="text-gray-600 text-sm md:text-base">{rec.education_requirements}</p>
                        <h4 className="font-semibold text-gray-700 mt-3 mb-1">Job Outlook</h4>
                        <p className="text-gray-600 text-sm md:text-base">{rec.job_outlook && rec.job_outlook.join(', ')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">Potential Career Paths</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.career_paths.map((path, i) => (
                            <span key={i} className="bg-indigo-200 text-indigo-900 px-2 py-1 rounded text-xs font-medium">{path}</span>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-700 mt-3 mb-1">Key Skills</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.required_skills.map((skill, i) => (
                            <span key={i} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">{skill}</span>
                          ))}
                        </div>
                        <h4 className="font-semibold text-gray-700 mt-3 mb-1">Top Companies</h4>
                        <div className="flex flex-wrap gap-2">
                          {rec.best_companies.map((company, i) => (
                            <span key={i} className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs">{company}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">Your Past Assessments</h2>
              {loading && <p>Loading test history...</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && !error && tests.length > 0 ? (
                <div className="grid gap-4 md:gap-6 md:grid-cols-2">
                  {tests.map((test, idx) => (
                    <div key={idx} className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 md:p-6 hover:shadow-xl transition">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs md:text-sm text-gray-500">
                          {new Date(test.date).toLocaleDateString()}
                        </span>
                        <span className="bg-indigo-100 text-indigo-700 px-2 md:px-3 py-1 rounded-full text-xs font-semibold">
                          {test.recommendations && test.recommendations[0]?.title}
                        </span>
                      </div>
                      <div className="mb-2">
                        {test.recommendations && test.recommendations.slice(0, 2).map((rec, i) => (
                          <span
                            key={i}
                            className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium mr-2 mb-1"
                          >
                            {rec.title}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => handleTestClick(test)}
                        className="mt-2 px-3 md:px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-xs md:text-sm font-semibold transition"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No test history found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;