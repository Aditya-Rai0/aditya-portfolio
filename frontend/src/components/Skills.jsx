const CATEGORY_META = {
  'AI / ML': { color: '#7c3aed', icon: 'fa-brain' },
  'Generative AI & LLMs': { color: '#00d4ff', icon: 'fa-network-wired' },
  'Data Science': { color: '#7c3aed', icon: 'fa-chart-bar' },
  'Frameworks & Tools': { color: '#00d4ff', icon: 'fa-code' },
};

const FALLBACK_GROUPS = [
  {
    _id: 'fg-1', title: 'AI / ML', color: '#7c3aed', icon: 'fa-brain',
    skills: [
      { name: 'Machine Learning', icon: 'fas fa-robot', iconColor: '#00d4ff', level: 80 },
      { name: 'Deep Learning', icon: 'fas fa-layer-group', iconColor: '#7c3aed', level: 75 },
      { name: 'NLP', icon: 'fas fa-language', iconColor: '#00d4ff', level: 80 },
      { name: 'Agentic AI', icon: 'fas fa-robot', iconColor: '#7c3aed', level: 70 },
    ],
  },
  {
    _id: 'fg-2', title: 'Generative AI & LLMs', color: '#00d4ff', icon: 'fa-network-wired',
    skills: [
      { name: 'LLMs', icon: 'fas fa-comment-dots', iconColor: '#00d4ff', level: 85 },
      { name: 'RAG', icon: 'fas fa-database', iconColor: '#7c3aed', level: 85 },
      { name: 'LangChain', icon: 'fas fa-link', iconColor: '#00d4ff', level: 85 },
      { name: 'LangGraph', icon: 'fas fa-project-diagram', iconColor: '#7c3aed', level: 70 },
      { name: 'Prompt Engineering', icon: 'fas fa-pen-fancy', iconColor: '#00d4ff', level: 80 },
      { name: 'FAISS', icon: 'fas fa-search', iconColor: '#7c3aed', level: 75 },
      { name: 'Pinecone', icon: 'fas fa-database', iconColor: '#00d4ff', level: 75 },
      { name: 'HuggingFace', icon: 'fas fa-smile', iconColor: '#f9a825', level: 80 },
      { name: 'Claude (Anthropic)', icon: 'fas fa-comment-dots', iconColor: '#7c3aed', level: 75 },
    ],
  },
  {
    _id: 'fg-3', title: 'Data Science', color: '#7c3aed', icon: 'fa-chart-bar',
    skills: [
      { name: 'Python', icon: 'fab fa-python', iconColor: '#e6a23c', level: 90 },
      { name: 'Data Analysis', icon: 'fas fa-chart-line', iconColor: '#00d4ff', level: 80 },
      { name: 'Data Visualization', icon: 'fas fa-chart-pie', iconColor: '#7c3aed', level: 75 },
      { name: 'Statistics', icon: 'fas fa-calculator', iconColor: '#00d4ff', level: 75 },
    ],
  },
  {
    _id: 'fg-4', title: 'Frameworks & Tools', color: '#00d4ff', icon: 'fa-code',
    skills: [
      { name: 'Flask', icon: 'fas fa-flask', iconColor: '#00d4ff', level: 85 },
      { name: 'FastAPI', icon: 'fas fa-bolt', iconColor: '#7c3aed', level: 80 },
      { name: 'Streamlit', icon: 'fas fa-chart-line', iconColor: '#ff4b4b', level: 80 },
      { name: 'Git', icon: 'fab fa-git-alt', iconColor: '#f05133', level: 85 },
      { name: 'GitHub', icon: 'fab fa-github', iconColor: '#ffffff', level: 85 },
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

  const order = ['AI / ML', 'Generative AI & LLMs', 'Data Science', 'Frameworks & Tools'];
  return order.filter((k) => map[k]).map((k) => map[k]);
}