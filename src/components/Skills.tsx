import React from 'react';
import { Code, Database, Brain, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: <Code className="w-8 h-8 text-teal-400" />,
      title: "Tech Stack",
      skills: ["Python", "OpenCV", "Git", "SQL", "AWS (EC2, S3)", "Docker (Basic)", "GitHub Actions"]
    },
    {
      icon: <Brain className="w-8 h-8 text-teal-400" />,
      title: "Data & AI",
      skills: ["Machine Learning", "Data Analysis", "NLP (In Progress)", "Statistical Modeling", "Computer Vision"]
    },
    {
      icon: <Wrench className="w-8 h-8 text-teal-400" />,
      title: "Tools",
      skills: ["Canva", "LM Studio", "MS Excel", "WordPress", "Firebase"]
    },
    {
      icon: <Database className="w-8 h-8 text-teal-400" />,
      title: "Soft Skills",
      skills: ["Public Speaking", "Team Coordination", "Event Management", "Leadership", "Problem Solving"]
    }
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            My <span className="text-teal-400">Skills</span>
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit of technical and soft skills developed through academic projects, 
            internships, and hands-on experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className="mb-6 flex justify-center">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="bg-slate-800/50 px-4 py-2 rounded-lg text-center text-gray-300 text-sm hover:bg-teal-500/10 hover:text-teal-400 transition-colors"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;