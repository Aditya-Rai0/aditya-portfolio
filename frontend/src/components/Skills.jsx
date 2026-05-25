const CATEGORY_META = {
  'Gen AI & Data Science': { color: '#7c3aed', icon: 'fa-brain' },
  'DevOps & Cloud': { color: '#00d4ff', icon: 'fa-cloud' },
  'Automation & Tools': { color: '#00d4ff', icon: 'fa-tools' },
  'Programming': { color: '#7c3aed', icon: 'fa-code' },
};

const FALLBACK_GROUPS = [
  {
    _id: 'fg-1', title: 'Gen AI & Data Science', color: '#7c3aed', icon: 'fa-brain',
    skills: [
      { name: 'Python', icon: 'fab fa-python', iconColor: '#e6a23c', level: 90 },
      { name: 'Machine Learning', icon: 'fas fa-robot', iconColor: '#00d4ff', level: 80 },
      { name: 'LLMs & RAG', icon: 'fas fa-network-wired', iconColor: '#7c3aed', level: 85 },
      { name: 'LangChain', icon: 'fas fa-link', iconColor: '#00d4ff', level: 80 },
      { name: 'LangGraph', icon: 'fas fa-project-diagram', iconColor: '#7c3aed', level: 70 },
    ],
  },
  {
    _id: 'fg-2', title: 'DevOps & Cloud', color: '#00d4ff', icon: 'fa-cloud',
    skills: [
      { name: 'Docker', icon: 'fab fa-docker', iconColor: '#2496ed', level: 75 },
      { name: 'Git', icon: 'fab fa-git-alt', iconColor: '#f05133', level: 85 },
      { name: 'CI/CD', icon: 'fas fa-code-branch', iconColor: '#00d4ff', level: 70 },
      { name: 'Kubernetes', icon: 'fab fa-kubernetes', iconColor: '#326ce5', level: 55 },
    ],
  },
  {
    _id: 'fg-3', title: 'Automation & Tools', color: '#00d4ff', icon: 'fa-tools',
    skills: [
      { name: 'n8n', icon: 'fas fa-plug', iconColor: '#00d4ff', level: 85 },
      { name: 'FastAPI', icon: 'fas fa-bolt', iconColor: '#00d4ff', level: 75 },
    ],
  },
  {
    _id: 'fg-4', title: 'Programming', color: '#7c3aed', icon: 'fa-code',
    skills: [
      { name: 'C / C++', icon: 'fas fa-code', iconColor: '#00599c', level: 70 },
      { name: 'HTML / CSS', icon: 'fab fa-html5', iconColor: '#e34f26', level: 85 },
    ],
  },
];

export default function Skills({ skills }) {
  const groups = buildGroups(skills);

  return (
    <section id="skills" className="py-24 bg-[#0d0d15] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] font-mono text-sm mb-2">$ skills --list</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Tech <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Stack</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto mt-4 rounded-full"></div>
        </div>
        {groups.map((group) => (
          <div key={group.title} className="mb-12">
            <h3 className="text-lg font-semibold mb-6 font-mono" style={{ color: group.color }}>
              <i className={`fas ${group.icon} mr-2`}></i> {group.title}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {group.skills.map((skill) => (
                <div key={skill._id || skill.name} className="skill-card">
                  <span className="text-2xl" style={{ color: skill.iconColor }}><i className={skill.icon}></i></span>
                  <span className="font-medium">{skill.name}</span>
                  <div className="skill-bar">
                    <div className="skill-fill" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function buildGroups(skills) {
  if (!skills || skills.length === 0) return FALLBACK_GROUPS;

  const map = {};
  skills.forEach((s) => {
    if (!map[s.category]) {
      const meta = CATEGORY_META[s.category] || { color: '#00d4ff', icon: 'fa-code' };
      map[s.category] = { title: s.category, ...meta, skills: [] };
    }
    map[s.category].skills.push(s);
  });

  const order = ['Gen AI & Data Science', 'DevOps & Cloud', 'Automation & Tools', 'Programming'];
  return order.filter((k) => map[k]).map((k) => map[k]);
}
