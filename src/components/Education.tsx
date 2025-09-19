
import { GraduationCap, Calendar, Award } from 'lucide-react';

const Education = () => {
  return (
    <section id="education" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            My <span className="text-teal-400">Education</span>
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Academic foundation in Computer Science with specialization in Artificial Intelligence.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/50 p-8 lg:p-12 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-8 h-8 text-teal-400 mr-4" />
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Bachelor of Technology (B.Tech)
                  </h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="text-xl text-teal-400 font-semibold mb-2">
                    Computer Science Engineering - Artificial Intelligence
                  </h4>
                  <p className="text-lg text-gray-300 mb-4">
                    University of Lucknow
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-teal-400 mr-3" />
                    <div>
                      <p className="text-gray-400 text-sm">Expected Graduation</p>
                      <p className="text-white font-semibold">2027</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Award className="w-5 h-5 text-teal-400 mr-3" />
                    <div>
                      <p className="text-gray-400 text-sm">Current GPA</p>
                      <p className="text-white font-semibold">8.3/10</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
                  <h5 className="text-lg font-semibold text-white mb-3">Key Focus Areas:</h5>
                  <div className="grid md:grid-cols-2 gap-3">
                    {[
                      "Artificial Intelligence",
                      "Machine Learning",
                      "Data Structures & Algorithms",
                      "Computer Vision",
                      "Natural Language Processing",
                      "Statistical Modeling"
                    ].map((subject, index) => (
                      <div key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                        <span className="text-gray-300 text-sm">{subject}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 lg:mt-0 lg:ml-8 flex-shrink-0">
                <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-teal-500/20 to-blue-500/20 rounded-full flex items-center justify-center border-2 border-teal-500/30">
                  <GraduationCap className="w-16 h-16 lg:w-20 lg:h-20 text-teal-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Program */}
          <div className="bg-slate-900/50 p-8 lg:p-12 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300 mt-8">
            <div className="flex items-center mb-4">
              <Award className="w-8 h-8 text-teal-400 mr-4" />
              <h3 className="text-2xl lg:text-3xl font-bold text-white">
                AI & Data Science Program <span className="text-sm text-teal-400 ml-2">(In Progress)</span>
              </h3>
            </div>
            <p className="text-lg text-gray-300 mb-6">Intellipaat x IIT Indore</p>

            <div className="bg-slate-800/50 p-6 rounded-lg border border-slate-600">
              <h5 className="text-lg font-semibold text-white mb-3">Topics:</h5>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  'Deep Learning',
                  'NLP',
                  'Time Series',
                  'TensorFlow/Keras'
                ].map((topic, index) => (
                  <div key={index} className="flex items-center">
                    <span className="w-2 h-2 bg-teal-400 rounded-full mr-3"></span>
                    <span className="text-gray-300 text-sm">{topic}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;