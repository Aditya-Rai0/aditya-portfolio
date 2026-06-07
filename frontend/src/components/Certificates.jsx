const FALLBACK = [
  { _id: 'fb1', title: 'Generative AI with NLP, Agentic AI and Fine Tuning', issuer: 'Euron', url: '#', icon: 'fa-robot' },
  { _id: 'fb2', title: 'Full Stack Data Science', issuer: 'Euron', url: '#', icon: 'fa-chart-bar' },
  { _id: 'fb3', title: 'Master Statistics', issuer: 'Euron', url: '#', icon: 'fa-calculator' },
];

export default function Certificates({ certificates }) {
  const list = certificates && certificates.length > 0 ? certificates : FALLBACK;

  return (
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] font-mono text-sm mb-2">$ ls ./certificates</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Certifi<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">cations</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {list.map((cert, i) => (
            <a
              key={cert._id}
              href={cert.url || '#'}
              target={cert.url ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="cert-card"
            >
              {cert.fileUrl ? (
                <div className="mb-4 rounded-xl overflow-hidden h-40 bg-[#0a0a0f] flex items-center justify-center border border-white/5">
                  {cert.fileUrl.match(/\.(pdf)$/i) ? (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <i className="fas fa-file-pdf text-4xl text-red-400"></i>
                      <span className="text-xs">View Certificate</span>
                    </div>
                  ) : (
                    <img
                      src={cert.fileUrl}
                      alt={cert.title}
                      className="w-full h-full object-contain p-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  )}
                  <div className="hidden flex-col items-center gap-2 text-gray-500">
                    <i className="fas fa-image text-3xl"></i>
                    <span className="text-xs">Preview unavailable</span>
                  </div>
                </div>
              ) : (
                <div className="cert-icon"><i className={`fas ${cert.icon || 'fa-certificate'}`}></i></div>
              )}
              <h3 className="font-bold mb-1">{cert.title}</h3>
              <p className="text-xs text-gray-500">{cert.issuer}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}