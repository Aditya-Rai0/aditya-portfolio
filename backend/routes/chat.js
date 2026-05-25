import express from 'express';
import Groq from 'groq-sdk';

const router = express.Router();

const SYSTEM_PROMPT = `You are Aditya Rai's personal portfolio assistant. You help visitors learn about Aditya's skills, projects, experience, and background.

About Aditya:
- Full Name: Aditya Rai
- Education: 3rd-year B.Tech Computer Science student at Shambhunath Institute of Engineering and Technology, Prayagraj
- Passion: Generative AI, Data Science, DevOps, building AI tools, automation
- YouTube Channel: Neural Sangam (where he shares technical knowledge)
- Achievement: 4th Place Winner at the GEN-AI Hackathon, Prayagraj
- Email: adityarai29052005@gmail.com

Skills:
- Gen AI & Data Science: Python, Machine Learning, LLMs & RAG, LangChain, LangGraph
- DevOps & Cloud: Docker, Git, CI/CD, Kubernetes
- Automation & Tools: n8n, FastAPI
- Programming: C/C++, HTML/CSS

Experience:
- Marketing Intern at Euron (EdTech Platform), Jun 2024 - Aug 2024

Projects:
1. AI Medical Bot - AI-powered medical assistant using LangChain, LLMs, Python, FastAPI
2. CareReply AI - Automated response system using n8n, NLP, Python, GPT
3. SIET Career Guider - Career guidance platform for students using React, Node.js, MongoDB, AI
4. Create Your Own Story with AI - Interactive storytelling using LangChain, GPT, Flask

Be helpful, concise, and friendly. If asked something you don't know, say you'll connect them with Aditya directly.`;

const VALID_MODELS = ['llama-3.1-8b-instant', 'llama-3.3-70b-versatile', 'meta-llama/llama-4-scout-17b-16e-instruct'];

router.post('/', async (req, res) => {
  try {
    // --- Verify request body parsing ---
    console.log('[Chat] Request headers:', JSON.stringify(req.headers['content-type']));
    console.log('[Chat] Request body:', JSON.stringify(req.body));

    const { message } = req.body;
    if (!message) {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    // --- Verify API key ---
    const apiKey = process.env.GROQ_API_KEY;
    console.log('[Chat] GROQ_API_KEY present:', !!apiKey);
    console.log('[Chat] GROQ_API_KEY length:', apiKey?.length || 0);
    console.log('[Chat] GROQ_API_KEY prefix:', apiKey?.substring(0, 6));

    if (!apiKey) {
      console.log('[Chat] ERROR: GROQ_API_KEY is not set in .env');
      return res.status(503).json({
        success: false,
        message: 'AI Assistant is not configured. GROQ_API_KEY is missing.',
        fallback: "Thanks for your message! I'm Aditya's AI assistant. Here's what I can tell you:\n\nAditya Rai is a 3rd-year B.Tech CSE student at SIET Prayagraj, specializing in Generative AI, Data Science & DevOps. He's the 4th Place Winner at the GEN-AI Hackathon, Prayagraj, and runs the YouTube channel 'Neural Sangam'.\n\nFor specific inquiries, please reach out to Aditya at adityarai29052005@gmail.com",
      });
    }

    if (apiKey === 'your_groq_api_key_here' || apiKey.length < 10) {
      console.log('[Chat] ERROR: GROQ_API_KEY is still the placeholder value');
      return res.status(503).json({
        success: false,
        message: 'AI Assistant is not configured. GROQ_API_KEY is a placeholder.',
        fallback: "Thanks for your message! I'm Aditya's AI assistant. Here's what I can tell you:\n\nAditya Rai is a 3rd-year B.Tech CSE student at SIET Prayagraj, specializing in Generative AI, Data Science & DevOps. He's the 4th Place Winner at the GEN-AI Hackathon, Prayagraj, and runs the YouTube channel 'Neural Sangam'.\n\nFor specific inquiries, please reach out to Aditya at adityarai29052005@gmail.com",
      });
    }

    // --- Initialize Groq SDK ---
    console.log('[Chat] Initializing Groq SDK...');
    const groq = new Groq({ apiKey });
    console.log('[Chat] Groq SDK initialized successfully');

    // --- Try models in order of preference ---
    let reply = null;
    let lastError = null;

    for (const model of VALID_MODELS) {
      try {
        console.log(`[Chat] Trying model: ${model}`);
        const completion = await groq.chat.completions.create({
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: message },
          ],
          model: model,
          temperature: 0.7,
          max_tokens: 500,
        });

        reply = completion.choices?.[0]?.message?.content;
        if (reply) {
          console.log(`[Chat] Model ${model} succeeded`);
          break;
        }
      } catch (modelError) {
        console.log(`[Chat] Model ${model} failed:`, modelError.message);
        lastError = modelError;
      }
    }

    if (reply) {
      console.log('[Chat] Response sent successfully');
      return res.json({ success: true, reply });
    }

    // All models failed
    throw lastError || new Error('All models failed');
  } catch (error) {
    console.error('===== GROQ API ERROR DETAILS =====');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack?.split('\n').slice(0, 4).join('\n'));

    if (error.response) {
      console.error('Error response status:', error.response.status);
      console.error('Error response data:', JSON.stringify(error.response.data));
    }

    if (error.status) {
      console.error('Error HTTP status:', error.status);
    }

    if (error.code) {
      console.error('Error code:', error.code);
    }

    console.error('===================================');

    return res.status(500).json({
      success: false,
      message: 'AI Assistant is currently unavailable',
      error: error.message,
      fallback: "Thanks for reaching out! I'm having trouble connecting to my AI backend right now. Please feel free to email Aditya directly at adityarai29052005@gmail.com for any inquiries.",
    });
  }
});

export default router;
