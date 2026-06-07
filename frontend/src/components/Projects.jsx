export default function Projects({ projects }) {
  return (
    <section id="projects" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-[#00d4ff] font-mono text-sm mb-2">$ ls ./projects</p>
          <h2 className="text-3xl sm:text-4xl font-bold">Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]">Projects</span></h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="mb-12 p-6 rounded-xl border border-[#f59e0b]/30 bg-gradient-to-r from-[#f59e0b]/5 to-transparent backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="text-4xl text-[#f59e0b]"><i className="fas fa-trophy"></i></div>
            <div>
              <h3 className="text-xl font-bold text-[#f59e0b]">4th Place Winner</h3>
              <p className="text-gray-400">Gen-AI Hackathon, Prayagraj — Built an innovative AI solution that secured a top-4 finish among strong competition.</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects && projects.length > 0 ? (
            projects.map((project) => (
              <div key={project._id} className="project-card">
                <div className="project-card-header">
                  <i className={`fas ${project.icon || 'fa-code'} text-3xl text-[#00d4ff]`}></i>
                  <span className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1 rounded">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack?.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3 mt-auto">
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-[#00d4ff] hover:underline"><i className="fab fa-github"></i> Code</a>}
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-400 hover:text-white"><i className="fas fa-external-link-alt"></i> Live</a>}
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="project-card">
                <div className="project-card-header">
                  <i className="fas fa-shield-alt text-3xl text-[#00d4ff]"></i>
                  <span className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1 rounded">Security AI</span>
                </div>
                <h3 className="text-xl font-bold mb-2">National Security Shield</h3>
                <div className="text-sm text-gray-500 space-y-2 mb-4">
                  <p><span className="text-[#00d4ff] font-mono">Problem:</span> Security agencies lack automated tools to analyze video content across multiple threat categories at scale.</p>
                  <p><span className="text-[#7c3aed] font-mono">Solution:</span> AI-powered video threat analysis platform processing 5+ threat categories (terrorism, misinformation, hate speech, espionage, cyber threats) from YouTube videos using speech-to-text, OCR, and multilingual translation.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tech-tag">FastAPI</span>
                  <span className="tech-tag">LangGraph</span>
                  <span className="tech-tag">Azure AI Search</span>
                  <span className="tech-tag">Groq Llama-3.3-70B</span>
                  <span className="tech-tag">HuggingFace</span>
                </div>
                <p className="text-xs text-[#f59e0b] mb-4 font-mono">~85% retrieval accuracy | 60% reduction in redundant processing</p>
                <div className="flex gap-3 mt-auto">
                  <a href="https://github.com/AdityaRai05" target="_blank" rel="noopener noreferrer" className="text-sm text-[#00d4ff] hover:underline"><i className="fab fa-github"></i> Code</a>
                </div>
              </div>
              <div className="project-card">
                <div className="project-card-header">
                  <i className="fas fa-graduation-cap text-3xl text-[#7c3aed]"></i>
                  <span className="text-xs font-mono text-[#7c3aed] bg-[#7c3aed]/10 px-2 py-1 rounded">Career AI</span>
                </div>
                <h3 className="text-xl font-bold mb-2">SIET Career Guider</h3>
                <div className="text-sm text-gray-500 space-y-2 mb-4">
                  <p><span className="text-[#00d4ff] font-mono">Problem:</span> Students lack personalized, data-driven career guidance with market trend insights across diverse domains.</p>
                  <p><span className="text-[#7c3aed] font-mono">Solution:</span> AI career guidance platform serving personalized roadmaps across 10+ career domains with market trend analysis. Built a RAG-powered chatbot using FAISS vector store for context-aware recommendations.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tech-tag">Streamlit</span>
                  <span className="tech-tag">LangChain</span>
                  <span className="tech-tag">Google Gemini API</span>
                  <span className="tech-tag">FAISS</span>
                  <span className="tech-tag">Python</span>
                </div>
                <p className="text-xs text-[#f59e0b] mb-4 font-mono">10+ career domains | RAG-powered personalized roadmaps</p>
                <div className="flex gap-3 mt-auto">
                  <a href="https://github.com/AdityaRai05" target="_blank" rel="noopener noreferrer" className="text-sm text-[#7c3aed] hover:underline"><i className="fab fa-github"></i> Code</a>
                </div>
              </div>
              <div className="project-card">
                <div className="project-card-header">
                  <i className="fas fa-heartbeat text-3xl text-[#00d4ff]"></i>
                  <span className="text-xs font-mono text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1 rounded">Healthcare AI</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Care Reply — AI Medical Bot</h3>
                <div className="text-sm text-gray-500 space-y-2 mb-4">
                  <p><span className="text-[#00d4ff] font-mono">Problem:</span> Healthcare staff spend significant time drafting patient communication, lacking AI tools that generate clinically appropriate responses.</p>
                  <p><span className="text-[#7c3aed] font-mono">Solution:</span> End-to-end medical Q&A chatbot using RAG over a PDF knowledge base, achieving context-aware responses across 100+ medical topics. Integrated Pinecone serverless vector DB for sub-second semantic search.</p>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tech-tag">Flask</span>
                  <span className="tech-tag">LangChain</span>
                  <span className="tech-tag">Google Gemini Pro</span>
                  <span className="tech-tag">Pinecone</span>
                  <span className="tech-tag">Docker</span>
                </div>
                <p className="text-xs text-[#f59e0b] mb-4 font-mono">100+ medical topics | Sub-second semantic search | Deployed on Render</p>
                <div className="flex gap-3 mt-auto">
                  <a href="https://github.com/AdityaRai05" target="_blank" rel="noopener noreferrer" className="text-sm text-[#00d4ff] hover:underline"><i className="fab fa-github"></i> Code</a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}