
import { Calendar, MapPin, Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: "Data Science Intern",
      company: "Oasis Infobyte",
      location: "Remote",
      period: "September 2025 - Present · 1 month",
      description: "📄 Internship Highlights: Currently interning as a Data Science Intern. Start Date: 05 September 2025. Duration: 1 month.",
      skills: ["Data Science"]
    },
    {
      title: "AI and Prompt Engineering Intern",
      company: "Vault of Code",
      location: "Remote",
      period: "June 2025 - July 2025",
      description: "Learned that effective prompt design is key to getting accurate and creative AI outputs. Understood how different techniques like zero-shot, few-shot, and chain-of-thought prompting impact results. Gained hands-on experience in using prompts to control the AI's behavior more effectively.",
      skills: ["Prompt Engineering", "AI/ML", "Zero-shot Learning", "Few-shot Learning", "Chain-of-thought Prompting"]
    },
    {
      title: "Student Coordinator",
      company: "RAASHEE-2025",
      location: "Lucknow, India",
      period: "February 2025",
      description: "Led coordination efforts for the international conference by managing student volunteers, facilitating academic sessions, and ensuring smooth communication between speakers, delegates, and organizers. Played a key role in event planning, logistics, and tech support.",
      skills: ["Event Management", "Leadership", "Team Coordination", "Communication", "Logistics"]
    }
  ];

  return (
    <section id="experience" className="py-20 bg-slate-800/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            My <span className="text-teal-400">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Professional experiences that have shaped my understanding of AI, leadership, and technology.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-teal-500/30 hidden md:block"></div>

            {experiences.map((exp, index) => (
              <div key={index} className="relative mb-12 md:ml-16">
                {/* Timeline Dot */}
                <div className="absolute -left-20 top-6 w-4 h-4 bg-teal-500 rounded-full border-4 border-slate-900 hidden md:block"></div>

                <div className="bg-slate-900/50 p-8 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {exp.title}
                      </h3>
                      <div className="flex items-center text-teal-400 mb-2">
                        <Briefcase className="w-4 h-4 mr-2" />
                        <span className="font-semibold">{exp.company}</span>
                      </div>
                    </div>
                    <div className="flex flex-col lg:items-end text-gray-400 text-sm">
                      <div className="flex items-center mb-1">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-300 leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-teal-500/10 text-teal-400 text-sm rounded-full border border-teal-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;