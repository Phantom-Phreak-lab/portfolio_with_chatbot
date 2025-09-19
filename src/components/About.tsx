import React from 'react';
import { Brain, Code, Users, Trophy } from 'lucide-react';

const About = () => {
  const highlights = [
    {
      icon: <Brain className="w-8 h-8 text-teal-400" />,
      title: "AI/ML Passion",
      description: "Building and deploying intelligent solutions with cutting-edge AI technologies"
    },
    {
      icon: <Code className="w-8 h-8 text-teal-400" />,
      title: "Strong Foundation",
      description: "Solid understanding of Data Structures & Algorithms and software development"
    },
    {
      icon: <Users className="w-8 h-8 text-teal-400" />,
      title: "Leadership",
      description: "Student Coordinator for RAASHEE '25 and FOET Sports Club member"
    },
    {
      icon: <Trophy className="w-8 h-8 text-teal-400" />,
      title: "Academic Excellence",
      description: "Maintaining 8.3/10 GPA in B.Tech CSE (AI) program"
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            About <span className="text-teal-400">Me</span>
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-8"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              I'm a passionate technology enthusiast currently pursuing B.Tech in Computer Science Engineering 
              with specialization in Artificial Intelligence at the University of Lucknow. My journey in tech 
              is driven by a deep fascination with AI/ML applications and their potential to solve real-world problems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              With hands-on experience in computer vision, prompt engineering, and data analysis, I'm constantly 
              exploring new ways to leverage technology for innovative solutions. Beyond academics, I actively 
              participate in leadership roles and contribute to the tech community through various projects and initiatives.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((item, index) => (
              <div
                key={index}
                className="bg-slate-900/50 p-6 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-colors group"
              >
                <div className="mb-4 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;