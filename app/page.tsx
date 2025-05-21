// app/page.tsx
// This is the main landing page for the Career Finder application.
// It uses Next.js and Tailwind CSS for styling, and includes an inline survey section.

'use client'; // Required for using React state and event handlers

import { useState } from 'react'; // Corrected import statement
import { ChevronRight, HelpCircle, Lightbulb, BarChart3, Zap, Search, Rocket, MessageSquare, CheckSquare, ArrowRightCircle } from 'lucide-react';

// Define the main functional component for the landing page
export default function LandingPage() {
  // State for the survey (simplified example)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Sample survey questions
  const surveyQuestions = [
    {
      id: 1,
      text: "What type of work environment do you prefer?",
      options: ["Collaborative team setting", "Independent and focused", "Fast-paced and dynamic", "Structured and predictable"],
      type: "radio",
    },
    {
      id: 2,
      text: "Which of these activities do you enjoy the most?",
      options: ["Solving complex problems", "Creating new things", "Helping and guiding others", "Organizing and planning"],
      type: "radio",
    },
    {
      id: 3,
      text: "Briefly describe what 'a fulfilling career' means to you. (Optional)",
      type: "textarea",
      placeholder: "e.g., Making a positive impact, continuous learning, financial stability..."
    },
    {
      id: 4,
      text: "Are you looking for a career that involves more analytical thinking or creative expression?",
      options: ["Primarily Analytical", "Primarily Creative", "A good balance of both"],
      type: "radio",
    }
  ];

  const handleStartSurvey = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    setSurveyStarted(true);
    const surveySection = document.getElementById('survey-section');
    if (surveySection) {
      surveySection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAnswerOption = (questionId: number, option: string) => { // Added type for option
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < surveyQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // TODO: Implement submission logic and display results
      alert("Survey completed! (Results display coming soon)");
      // For now, just log answers
      console.log("Survey Answers:", answers);
    }
  };

  const currentQuestion = surveyQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-slate-900 text-white font-sans">
      {/* Header Navigation */}
      <header className="py-6 px-4 sm:px-6 lg:px-8 shadow-md bg-slate-800/50 backdrop-blur-md fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          <a href="#" className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
            Career Finder
          </a>
          <nav className="hidden md:flex items-center">
            <a
              href="#features"
              className="text-slate-300 hover:text-sky-400 transition-colors duration-300 px-4 py-2 rounded-md"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-slate-300 hover:text-sky-400 transition-colors duration-300 px-4 py-2 rounded-md"
            >
              How It Works
            </a>
            <a
              href="#survey-section"
              onClick={handleStartSurvey}
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-sky-500/50 transition-all duration-300 transform hover:scale-105 ml-4"
            >
              Get Started
            </a>
          </nav>
          {/* Mobile Menu Button - Placeholder */}
          <div className="md:hidden">
            <button className="text-slate-300 hover:text-sky-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-16 sm:pt-40 sm:pb-20">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Lightbulb className="mx-auto h-16 w-16 text-sky-400 mb-6" strokeWidth={1.5} />
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight">
            Discover Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">Ideal Career</span> Path
          </h2>
          <p className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Tired of uncertainty? Career Finder guides you through a personalized journey of self-discovery to reveal career options perfectly aligned with your passions, skills, and aspirations.
          </p>
          <a
            href="#survey-section" // Updated href to scroll to the survey
            onClick={handleStartSurvey} // Added onClick for smooth scroll and state update
            className="inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold rounded-lg text-xl shadow-xl hover:shadow-sky-500/60 transition-all duration-300 transform hover:scale-105 group"
          >
            Start Your Journey
            <ChevronRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </section>

        {/* How It Works Section (Order can be adjusted) */}
        <section id="how-it-works" className="py-20 sm:py-28 bg-slate-800/30 mt-20 sm:mt-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <HelpCircle className="mx-auto h-12 w-12 text-sky-400 mb-4" strokeWidth={1.5}/>
              <h3 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">How Career Finder Guides You</h3>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Our intuitive process makes finding your direction straightforward and insightful.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="bg-slate-800 p-8 rounded-xl shadow-2xl hover:shadow-sky-500/30 transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-500 text-white mb-6 text-2xl font-bold shadow-lg">1</div>
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Answer Insightful Questions</h4>
                <p className="text-slate-400 leading-relaxed">
                  Engage with our carefully crafted survey designed to understand your unique passions, skills, and values.
                </p>
              </div>
              {/* Step 2 */}
              <div className="bg-slate-800 p-8 rounded-xl shadow-2xl hover:shadow-sky-500/30 transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-500 text-white mb-6 text-2xl font-bold shadow-lg">2</div>
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Share Your Thoughts (Optional)</h4>
                <p className="text-slate-400 leading-relaxed">
                  Provide additional context through free-text input, allowing our AI to fine-tune your personalized results.
                </p>
              </div>
              {/* Step 3 */}
              <div className="bg-slate-800 p-8 rounded-xl shadow-2xl hover:shadow-sky-500/30 transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-500 text-white mb-6 text-2xl font-bold shadow-lg">3</div>
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Follow a Linear Path</h4>
                <p className="text-slate-400 leading-relaxed">
                  Navigate a clear, step-by-step process that intelligently adapts based on your responses.
                </p>
              </div>
              {/* Step 4 */}
              <div className="bg-slate-800 p-8 rounded-xl shadow-2xl hover:shadow-sky-500/30 transition-shadow duration-300 transform hover:-translate-y-1">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-sky-500 text-white mb-6 text-2xl font-bold shadow-lg">4</div>
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Receive Tailored Options</h4>
                <p className="text-slate-400 leading-relaxed">
                  Get a curated list of potential career paths, each with a percentage match indicating its suitability for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Survey Section - NEW */}
        <section id="survey-section" className="py-20 sm:py-28 scroll-mt-24"> {/* scroll-mt-24 to offset fixed header */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <CheckSquare className="mx-auto h-12 w-12 text-green-400 mb-4" strokeWidth={1.5}/>
              <h3 className="text-4xl sm:text-5xl font-bold mb-3 tracking-tight">Let's Find Your Path</h3>
              {!surveyStarted && (
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                  Click "Start Your Journey" above or the button below to begin the interactive survey.
                </p>
              )}
            </div>

            {/* Conditional rendering for the survey once started */}
            {!surveyStarted && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setSurveyStarted(true)}
                  className="inline-flex items-center justify-center px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg text-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 group"
                >
                  Begin Survey Now
                  <ArrowRightCircle className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            )}

            {surveyStarted && currentQuestion && (
              <div className="max-w-2xl mx-auto bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl">
                <div className="mb-8">
                  <p className="text-sm text-sky-400 font-medium mb-2">Question {currentQuestionIndex + 1} of {surveyQuestions.length}</p>
                  <h4 className="text-2xl sm:text-3xl font-semibold text-white mb-6">{currentQuestion.text}</h4>

                  {/* Render options based on question type */}
                  {currentQuestion.type === "radio" && currentQuestion.options && (
                    <div className="space-y-4">
                      {currentQuestion.options.map((option, index) => (
                        <label
                          key={index}
                          className={`block w-full p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer
                                      ${answers[currentQuestion.id] === option
                                        ? 'bg-sky-500 border-sky-400 shadow-lg scale-105'
                                        : 'bg-slate-700 border-slate-600 hover:bg-slate-600/70 hover:border-sky-500'}`}
                        >
                          <input
                            type="radio"
                            name={`question-${currentQuestion.id}`}
                            value={option}
                            checked={answers[currentQuestion.id] === option}
                            onChange={() => handleAnswerOption(currentQuestion.id, option)}
                            className="sr-only" // Hide actual radio, style the label
                          />
                          <span className="text-lg text-white">{option}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {currentQuestion.type === "textarea" && (
                    <div>
                      <textarea
                        rows={4}
                        placeholder={currentQuestion.placeholder || "Enter your thoughts here..."}
                        value={answers[currentQuestion.id] || ''}
                        onChange={(e) => handleAnswerOption(currentQuestion.id, e.target.value)}
                        className="w-full p-4 rounded-lg bg-slate-700 border-2 border-slate-600 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none text-white placeholder-slate-400 transition-colors duration-200"
                      />
                    </div>
                  )}
                </div>

                <div className="mt-10 text-right">
                  <button
                    onClick={handleNextQuestion}
                    disabled={currentQuestion.type === 'radio' && !answers[currentQuestion.id]} // Disable if radio and no answer
                    className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold rounded-lg text-lg shadow-xl hover:shadow-sky-500/60 transition-all duration-300 transform hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentQuestionIndex < surveyQuestions.length - 1 ? "Next Question" : "View My Options"}
                    <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            )}
             {/* Placeholder for results - to be implemented */}
             {surveyStarted && currentQuestionIndex >= surveyQuestions.length -1 && answers[surveyQuestions[surveyQuestions.length-1].id] && (
                <div className="max-w-2xl mx-auto bg-slate-800 p-8 sm:p-10 rounded-xl shadow-2xl mt-10 text-center">
                    <h4 className="text-3xl font-semibold text-green-400 mb-6">Thank You!</h4>
                    <p className="text-slate-300 text-lg mb-4">
                        Your responses have been recorded. We are now analyzing your profile to find the best career matches.
                    </p>
                    <p className="text-slate-400 text-md mb-8">
                        (This is where your personalized career options with percentages will appear.)
                    </p>
                    <BarChart3 className="mx-auto h-16 w-16 text-sky-400 mb-6" strokeWidth={1.5} />
                     <button
                        onClick={() => {
                            setSurveyStarted(false);
                            setCurrentQuestionIndex(0);
                            setAnswers({});
                            // Optionally scroll to top
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="mt-6 px-8 py-3 bg-slate-600 hover:bg-slate-500 text-white font-semibold rounded-lg text-lg shadow-lg transition-all duration-300"
                    >
                        Start Over
                    </button>
                </div>
            )}
          </div>
        </section>

        {/* Features / Benefits Section */}
        <section id="features" className="py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <BarChart3 className="mx-auto h-12 w-12 text-sky-400 mb-4" strokeWidth={1.5}/>
                <h3 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Why Choose Career Finder?</h3>
                <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                    Empowering you to make confident decisions about your future.
                </p>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/20">
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Clarity in Complexity</h4>
                <p className="text-slate-400 leading-relaxed">Cut through the noise. We provide a focused approach to narrow down the overwhelming number of career choices.</p>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/20">
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Personalized & Precise</h4>
                <p className="text-slate-400 leading-relaxed">Your journey is unique. Our algorithm delivers recommendations tailored specifically to your profile and inputs.</p>
              </div>
              <div className="bg-slate-800/50 p-8 rounded-xl shadow-lg backdrop-blur-sm transform transition-all duration-300 hover:scale-105 hover:shadow-sky-500/20">
                <h4 className="text-2xl font-semibold mb-3 text-sky-300">Data-Driven Insights</h4>
                <p className="text-slate-400 leading-relaxed">Leverage the power of data. Our percentage-based matching gives you a clear indication of compatibility.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next.js Features Section */}
        <section className="py-20 sm:py-28 bg-slate-800/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <Zap className="mx-auto h-12 w-12 text-amber-400 mb-4" strokeWidth={1.5}/>
              <h3 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Powered by Next.js</h3>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Built with cutting-edge technology for a seamless and fast experience.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
              <div className="bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-amber-500/30 transition-shadow duration-300 transform hover:scale-105">
                <Rocket className="mx-auto h-10 w-10 text-amber-400 mb-4" strokeWidth={1.5}/>
                <h4 className="text-xl font-semibold mb-2 text-amber-300">Blazing Fast Performance</h4>
                <p className="text-slate-400">
                  Next.js's Server Components and optimization capabilities ensure a quick and responsive user experience.
                </p>
              </div>
              <div className="bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-amber-500/30 transition-shadow duration-300 transform hover:scale-105">
                <Search className="mx-auto h-10 w-10 text-amber-400 mb-4" strokeWidth={1.5}/>
                <h4 className="text-xl font-semibold mb-2 text-amber-300">SEO Optimized</h4>
                <p className="text-slate-400">
                  Built with SEO best practices in mind, making it easier for users to find Career Finder through search engines.
                </p>
              </div>
              <div className="bg-slate-800 p-8 rounded-xl shadow-xl hover:shadow-amber-500/30 transition-shadow duration-300 transform hover:scale-105">
                <Lightbulb className="mx-auto h-10 w-10 text-amber-400 mb-4" strokeWidth={1.5}/>
                <h4 className="text-xl font-semibold mb-2 text-amber-300">Modern Developer Experience</h4>
                <p className="text-slate-400">
                  Features like Fast Refresh and a robust ecosystem allow for rapid development and iteration.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 bg-slate-900 border-t border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-400">
          <p>&copy; {new Date().getFullYear()} Career Finder. All rights reserved.</p>
          <p className="mt-2 text-sm">Find your future, today.</p>
        </div>
      </footer>
    </div>
  );
}
