import { BookOpen, FileText, GraduationCap } from 'lucide-react';

const publications = [
  {
    title: 'Industry 4.0 and Smart Manufacturing Systems',
    type: 'Conference Paper',
    description:
      'Co-authored a research paper on Industry 4.0 and Smart Manufacturing Systems, presented and published in conference proceedings associated with IIT Roorkee.',
    icon: <FileText className="w-6 h-6 text-teal-400" />,
  },
  {
    title: 'Introduction to Artificial Intelligence & Data Analytics in Healthcare',
    type: 'Book Chapter (In Progress)',
    description:
      'Currently working on a chapter focused on practical AI and data analytics applications in the healthcare sector.',
    icon: <GraduationCap className="w-6 h-6 text-teal-400" />,
  },
];

const ResearchPublication = () => {
  return (
    <section id="research-publication" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Research <span className="text-teal-400">Publication</span>
          </h2>
          <div className="w-24 h-1 bg-teal-400 mx-auto mb-8"></div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Selected research contributions and ongoing publication work in AI, manufacturing, and healthcare analytics.
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid gap-6">
          {publications.map((publication, index) => (
            <div
              key={index}
              className="bg-slate-900/50 rounded-xl border border-slate-700 hover:border-teal-500/50 transition-all duration-300 p-8"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-2 bg-slate-800/70 rounded-lg">
                  {publication.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">{publication.title}</h3>
                  <p className="text-sm text-teal-400 font-semibold">{publication.type}</p>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">{publication.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-slate-900/40 border border-slate-700 rounded-xl p-6 flex items-start gap-4">
          <BookOpen className="w-6 h-6 text-teal-400 mt-0.5" />
          <p className="text-gray-300 leading-relaxed">
            Accepted abstract: Emerging Technologies in the Healthcare Sector.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ResearchPublication;
