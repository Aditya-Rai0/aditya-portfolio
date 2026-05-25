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
            <img src={profile?.profileImage || '/Profile.png'} alt="Aditya Rai" className="rounded-2xl border border-white/10 shadow-xl w-full max-w-md mx-auto" />
          </div>
          <div>
            <h3 className="text-2xl font-bold mb-4">A passionate builder at the intersection of <span className="text-[#00d4ff]">AI</span> and <span className="text-[#7c3aed]">DevOps</span></h3>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              {profile?.bio ? (
                profile.bio.split('\n').map((p, i) => <p key={i}>{p}</p>)
              ) : (
                <>
                  <p>I'm a <strong className="text-white">3rd-year B.Tech Computer Science student</strong> at <strong className="text-white">Shambhunath Institute of Engineering and Technology, Prayagraj</strong>. My journey in tech is driven by an insatiable curiosity for how things work — and how to make them work better.</p>
                  <p>From building AI-powered chatbots to automating cloud deployments, I thrive on creating solutions that merge <strong className="text-white">intelligence with efficiency</strong>. I specialize in <strong className="text-white">Generative AI, Data Science, and DevOps</strong>, constantly exploring new tools like <strong className="text-white">n8n, LangChain, and cloud platforms</strong> to streamline workflows.</p>
                  <p>Beyond code, I run <strong className="text-white">Neural Sangam</strong> — a YouTube channel where I break down complex tech concepts and share practical knowledge with the community. I believe in <span className="text-[#00d4ff]">learning in public</span> and empowering others through education.</p>
                </>
              )}
            </div>
            <div className="flex flex-wrap gap-3 mt-6">
              <span className="px-3 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 rounded-full">Python</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 rounded-full">LangChain</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 rounded-full">n8n</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#7c3aed]/10 text-[#7c3aed] border border-[#7c3aed]/20 rounded-full">Docker</span>
              <span className="px-3 py-1 text-xs font-mono bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20 rounded-full">Gen AI</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
