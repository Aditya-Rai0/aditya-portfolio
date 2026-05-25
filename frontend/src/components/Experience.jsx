const FALLBACK = [
  {
    _id: 'fallback-1',
    title: 'Marketing Intern',
    company: 'Euron',
    companyTag: 'EdTech Platform',
    startDate: 'Jun 2024',
    endDate: 'Aug 2024',
    highlights: [
      'Developed and executed marketing strategies to promote Euron\'s educational offerings, driving user engagement.',
      'Collaborated with cross-functional teams to optimize content and outreach campaigns.',
      'Gained hands-on experience in digital marketing, analytics, and brand positioning in the EdTech space.',
    ],
    tags: ['Digital Marketing', 'Content Strategy', 'Analytics'],
  },
];

const INITIALS = { Euron: 'E' };

export default function Experience({ experiences }) {
  const list = experiences === null ? FALLBACK : experiences;

  if (!list || list.length === 0) return null;

  return (
    <section id="experience" className="py-24 bg-[#0d0d15] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] font-mono text-sm mb-2">$ cat experience.log</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Experience</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {list.map((exp, idx) => (
            <div key={exp._id || idx} className="relative pl-8 border-l-2 border-[#00d4ff]/30">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-[#00d4ff]"></div>
              {exp.startDate && (
                <div className="mb-4">
                  <span className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1 rounded">
                    {exp.startDate}{exp.endDate ? ` - ${exp.endDate}` : ''}
                  </span>
                </div>
              )}
              <div className="p-6 rounded-xl border border-white/10 bg-[#12121a] hover:border-[#00d4ff]/30 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#00d4ff]/20 to-[#7c3aed]/20 flex items-center justify-center">
                    <span className="text-lg font-bold text-[#00d4ff]">{INITIALS[exp.company] || exp.company?.charAt(0) || 'E'}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">{exp.title}</h3>
                    <p className="text-sm text-gray-400">{exp.company}{exp.companyTag ? ` — ${exp.companyTag}` : ''}</p>
                  </div>
                </div>
                {exp.description && (
                  <p className="text-sm text-gray-400 mb-3">{exp.description}</p>
                )}
                <ul className="space-y-2 text-sm text-gray-400">
                  {(exp.highlights || []).map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <i className="fas fa-check-circle text-[#00d4ff] mt-1 text-xs"></i>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                {(exp.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] rounded">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
