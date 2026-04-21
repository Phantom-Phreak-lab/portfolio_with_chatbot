
import { Github, ExternalLink, Eye, BarChart3, Bot } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: "AI-Governed Smart City 2070",
      description: "🏙️ An experimental hackathon project (Copilt Jam) simulating how an AI-powered mayor governs a futuristic smart city in the year 2070. Citizens can interact with the mayor to resolve issues, allocate resources, and experience next-gen governance.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "AI Chat"],
      icon: <Bot className="w-8 h-8 text-teal-400" />,
      github: "https://github.com/Phantom-Phreak-lab/Vibe_Jam",
      demo: null,
      features: [
        "👤 Citizen Login/Register (basic auth)",
        "📊 City Dashboard: Energy allocation (renewable, nuclear, backup); Water distribution (reservoir levels); Transport system status (hyperloop, drone taxis)",
        "🤖 AI Mayor: Citizens can chat with an AI-powered mayor (e.g., 'Mayor, resolve traffic in Sector-5.' → futuristic decisions)",
        "⚖️ Conflict Resolution: Citizens raise issues (water shortage, traffic jam); AI suggests fair, futuristic solutions",
        "🎨 Futuristic UI: Dark theme, neon accents, hologram-inspired"
      ]
    },
    {
      title: "Real-Time Face Recognition System",
      description: "Developed a comprehensive real-time face recognition system for practical applications like attendance tracking. The system uses advanced computer vision techniques to accurately identify and track faces in real-time video streams.",
      technologies: ["Python", "OpenCV", "Firebase", "Computer Vision", "Real-time Processing"],
      icon: <Eye className="w-8 h-8 text-teal-400" />,
      github: "https://github.com/Phantom-Phreak-lab/face-recognition-attendance",
      demo: null,
      features: [
        "Real-time face detection and recognition",
        "Firebase integration for data storage",
        "Attendance tracking functionality",
        "High accuracy face matching algorithms"
      ]
    },
    {
      title: "EDA and Data Storytelling",
      description: "Conducted comprehensive Exploratory Data Analysis (EDA) and data storytelling project to uncover meaningful insights from complex datasets. Created compelling visualizations and narratives to communicate data-driven findings effectively.",
      technologies: ["Python", "Seaborn", "Matplotlib", "Pandas", "Data Analysis"],
      icon: <BarChart3 className="w-8 h-8 text-teal-400" />,
      github: "https://github.com/Phantom-Phreak-lab",
      demo: null,
      features: [
        "Comprehensive statistical analysis",
        "Interactive data visualizations",
        "Data cleaning and preprocessing",
        "Insightful storytelling with data"
      ]
    },
    {
      title: "Real-Time Stock Market Intelligence Dashboard",
      description: "🚀 Built a low-latency, real-time dashboard for tracking and analyzing live stock market data with interactive visualizations and technical insights.",
      technologies: ["Python", "Streamlit", "Pandas", "Plotly", "yfinance API"],
      icon: <BarChart3 className="w-8 h-8 text-teal-400" />,
      github: "https://github.com/Phantom-Phreak-lab",
      demo: null,
      features: [
        "⚡ Live data streaming with auto-refresh",
        "📊 Interactive charts (candlestick, volume, trends)",
        "🧠 Technical indicators (MA, RSI)",
        "🔍 Multi-stock tracking & search",
        "📈 Clean, responsive dashboard UI",
        "💡 Enables real-time market analysis and faster data-driven decisions"
      ]
    }
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            My <span className="text-teal-400">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A showcase of my technical projects demonstrating practical applications of AI, 
            computer vision, and data analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300 overflow-hidden group hover:transform hover:scale-105"
            >
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="mr-4 group-hover:scale-110 transition-transform">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-3">Key Features:</h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-gray-400 text-sm flex items-start">
                        <span className="w-2 h-2 bg-teal-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-slate-800/50 text-gray-300 text-sm rounded-full border border-slate-600"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <a
                    href={project.github}
                    className="inline-flex items-center px-4 py-2 bg-slate-800 text-gray-300 rounded-lg hover:bg-slate-700 hover:text-teal-400 transition-colors"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </a>
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="inline-flex items-center px-4 py-2 bg-teal-500 text-slate-900 rounded-lg hover:bg-teal-400 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;