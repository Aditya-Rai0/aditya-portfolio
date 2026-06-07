export default function About({ profile }) {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] font-mono text-sm mb-2">$ about_me</p>
          <h2 className="text-3xl sm:text-4xl font-bold">About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Me</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto mt-4 rounded-full"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img src={profile?.profileImage || '/Profile.png'} alt="Aditya Rai" className="rounded-2xl border border-white/10 shadow-xl w-full max-w-md mx-auto" onError={(e) => { e.target.src = '/Profile.png' }} />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4"><span className="text-[#00d4ff]">AI/ML Developer</span> & <span className="text-[#7c3aed]">Generative AI Engineer</span></h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {profile?.bio ? (
                profile.bio.split('\n').map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>I'm a <strong className="text-white">Final Year B.Tech Computer Science student</strong> at <strong className="text-white">Shambhunath Institute of Engineering and Technology, Prayagraj</strong>, passionate about building intelligent systems powered by Large Language Models, RAG pipelines, and Generative AI.</p>
                  <p>I specialize in designing <strong className="text-white">LLM-based applications</strong>, <strong className="text-white">multi-agent pipelines</strong>, and deploying AI solutions with Python and modern API frameworks. My expertise spans <strong className="text-white">Machine Learning, Deep Learning, NLP, Agentic AI, and Generative AI</strong> — with hands-on experience delivering real-world AI solutions across healthcare, security, and career intelligence domains.</p>
                  <p>Beyond code, I run <strong className="text-white">Neural Sangam</strong> — a YouTube channel where I break down complex AI and tech concepts, sharing practical knowledge with the community. I believe in <span className="text-[#00d4ff]">learning in public</span> and empowering others through education.</p>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 rounded-full">Machine Learning</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 rounded-full">LLMs & RAG</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 rounded-full">LangChain</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 rounded-full">Generative AI</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 rounded-full">Agentic AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
