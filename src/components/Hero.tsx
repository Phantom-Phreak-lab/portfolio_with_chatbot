import React from 'react';
import { Github, Linkedin, Download, Mail } from 'lucide-react';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-blue-600/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(100, 255, 218, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
              Aditya <span className="text-teal-400">Yadav</span>
            </h1>
            <h2 className="text-xl lg:text-2xl text-gray-300 mb-8 font-light">
              AI/ML Enthusiast | B.Tech CSE (AI) Student | Data Science
            </h2>
            <p className="text-lg text-gray-400 mb-10 max-w-2xl leading-relaxed">
              Driven and detail-oriented technology enthusiast with practical experience in AI applications, 
              computer vision, and real-time data systems. Proficient in Python, OpenCV, and prompt engineering, 
              with a strong foundation in developing intelligent solutions.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <a
                href="/Aditya-Yadav-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3 bg-teal-500 text-slate-900 font-semibold rounded-lg hover:bg-teal-400 transition-colors"
              >
                <Download className="mr-2" size={20} />
                View Resume
              </a>
              <button
                onClick={scrollToContact}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-teal-500 text-teal-400 font-semibold rounded-lg hover:bg-teal-500 hover:text-slate-900 transition-colors"
              >
                <Mail className="mr-2" size={20} />
                Contact Me
              </button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start space-x-6">
              <a
                href="https://linkedin.com/in/aditya-yadav"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/Phantom-Phreak-lab"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal-400 transition-colors"
              >
                <Github size={24} />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-teal-500/30 shadow-2xl">
                <img
                  src="/WhatsApp Image 2025-08-09 at 18.33.04_4b2c7405.jpg"
                  alt="Aditya Yadav"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full blur-xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;