import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    console.log('[Gemini] Received chat request, API key present:', !!apiKey);

    if (!apiKey || apiKey === 'your_gemini_api_key_here' || apiKey === 'AIzaSyAyAZGi0y1pkqfSX82VNzQ1qlbKqvyCNz4') {
      console.log('[Gemini] Invalid or placeholder API key detected');
      return res.status(503).json({
        error: 'Gemini API key not configured. Set GEMINI_API_KEY in .env',
        fallback: `Thanks for your message! I'm Aditya's AI assistant. Here's what I can tell you:\n\nAditya Rai is a 3rd-year B.Tech CSE student at SIET Prayagraj, specializing in Generative AI, Data Science & DevOps. He's the 4th Place Winner at the GEN-AI Hackathon, Prayagraj, and runs the YouTube channel 'Neural Sangam'.\n\nFor specific inquiries, please reach out to Aditya at adityarai29052005@gmail.com`
      });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const result = await model.generateContent({
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\nUser query: ${message}\n\nRespond concisely as Aditya's assistant:` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      },
    });

    const response = result.response;
    const text = response.text();
    console.log('[Gemini] Response received successfully');

    res.json({ reply: text });
  } catch (error) {
    console.error('[Gemini] API call failed:', error.message);
    console.error('[Gemini] Full error:', error);
    res.status(500).json({
      error: error.message,
      fallback: `Thanks for reaching out! I'm having trouble connecting to my AI backend right now. Please feel free to email Aditya directly at adityarai29052005@gmail.com for any inquiries.`
    });
  }
});

export default router;
