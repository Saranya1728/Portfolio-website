import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ChatCircle, X, PaperPlaneTilt, Robot } from 'phosphor-react';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Saranya's AI assistant. Ask me about her skills, projects, education, or how to get in touch!",
      isBot: true,
      timestamp: new Date()
    }
  ]);

  const chatboxRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(buttonRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1, delay: 2, ease: "back.out(1.7)" }
    );
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(chatboxRef.current,
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    if (isOpen) {
      gsap.to(chatboxRef.current, {
        opacity: 0,
        scale: 0.8,
        y: 20,
        duration: 0.2,
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  // Knowledge base: each entry has keywords to match and a reply.
  // Checked in order — first match wins.
  const knowledgeBase: { keywords: string[]; reply: string }[] = [
    // Greetings
    { keywords: ["hi", "hello", "hey", "good morning", "good afternoon", "good evening"], reply: "Hello! Thanks for stopping by. I can tell you about Saranya's skills, projects, education, or how to contact her. What would you like to know?" },

    // About the bot / capabilities
    { keywords: ["who are you", "what are you", "what can you do", "help"], reply: "I'm a simple assistant here to answer common questions about Saranya — her skills, projects, education, availability, and contact details. Try asking something like 'What are her skills?' or 'How can I contact her?'" },

    // About Saranya - general
    { keywords: ["who is saranya", "tell me about", "about saranya", "introduce", "background"], reply: "Saranya is a B.Tech Computer Science graduate and an aspiring Front-End Developer with a solid foundation in HTML, CSS, and JavaScript, currently expanding into React. She's passionate about building clean, responsive, user-friendly web interfaces." },

    // Education
    { keywords: ["education", "degree", "college", "qualification", "study", "university", "graduate"], reply: "Saranya holds a B.Tech/B.E. in Computer Science." },

    // Experience
    { keywords: ["experience", "years of experience", "how long", "worked before"], reply: "Saranya is early in her career as a fresher, having built strong practical skills through personal projects in web development and AI/ML fundamentals. She's now looking to bring that foundation into a full-time role." },

    // Projects - general
    { keywords: ["project", "portfolio work", "what has she built", "work samples", "built"], reply: "Saranya has built projects including 'AI Neural Assist' (an AI-based assistant using Python and machine learning) and an 'Exam Registration Portal' (a web app using HTML, CSS, and JavaScript). Check out the Projects section above for details and GitHub links!" },

    // Specific project - AI Neural Assist
    { keywords: ["neural assist", "ai project", "machine learning project", "neuro assist", "ai assistant"], reply: "AI Neural Assist is an AI-based assistant built using Python and machine learning libraries, designed to process input and generate intelligent responses using neural network concepts. The code is on her GitHub — link is in the Projects section." },

    // Specific project - Exam Portal
    { keywords: ["exam", "registration portal", "exam portal"], reply: "The Exam Registration Portal is a web-based system that lets students register for exams online, built with a focus on clean UI and smooth form handling using HTML, CSS, and JavaScript." },

    // Skills - general
    { keywords: ["skill", "technologies", "tech stack", "what does she know", "expertise", "proficient"], reply: "Saranya's core skills include HTML5/CSS3, JavaScript, React (currently learning), Java, MySQL, UI/UX design fundamentals, Git, and GitHub. Check the Skills section above for a full visual breakdown." },

    // React
    { keywords: ["react", "frontend framework", "component"], reply: "Saranya is currently building her React skills, applying it to create dynamic, component-based interfaces — including parts of this very portfolio!" },

    // JavaScript
    { keywords: ["javascript", " js ", "js?", "ecmascript"], reply: "Saranya has solid working knowledge of JavaScript, using it for interactivity, DOM manipulation, and form handling in her projects." },

    // HTML/CSS
    { keywords: ["html", "css", "responsive design", "layout"], reply: "Saranya has strong HTML5 and CSS3 skills, with a focus on writing clean, responsive layouts that work well across devices." },

    // Java
    { keywords: ["java programming", "java "], reply: "Saranya has hands-on experience with Java programming, including working through structured programming tasks and exercises." },

    // Python / AI/ML
    { keywords: ["python", "machine learning", " ml ", "artificial intelligence", " ai "], reply: "Saranya has practical experience with Python and machine learning libraries, demonstrated in her AI Neural Assist project." },

    // Git/GitHub
    { keywords: ["git ", "github", "version control"], reply: "Saranya is comfortable with Git and GitHub for version control, and all her projects are hosted publicly on GitHub — links are in the Projects section." },

    // Database
    { keywords: ["database", "sql", "mysql"], reply: "Saranya has working knowledge of MySQL for handling structured data in her projects." },

    // UI/UX
    { keywords: ["ui/ux", "ui design", "ux design", "user experience", "design skills"], reply: "Saranya has a growing interest and foundation in UI/UX design, focusing on creating clean, intuitive, and user-friendly interfaces." },

    // Contact
    { keywords: ["contact", "reach", "email", "get in touch", "mail"], reply: "You can reach Saranya directly at rajasaranya404@gmail.com, or use the contact form above — it goes straight to her inbox!" },

    // Location
    { keywords: ["location", "based", "where is she", "city", "live", "address"], reply: "Saranya is based in Salem, Tamil Nadu, India." },

    // Availability / joining
    { keywords: ["available", "join", "notice period", "when can you start", "start date"], reply: "Saranya is available to join immediately." },

    // Job type / hiring
    { keywords: ["hire", "hiring", "job opportunity", "full time", "full-time", "position", "role", "opening", "vacancy"], reply: "Saranya is actively looking for a full-time opportunity as a Front-End Developer. Feel free to reach out via the contact form or email above!" },

    // Internship
    { keywords: ["internship", "intern"], reply: "While Saranya's primary goal is a full-time role, she's also open to discussing internship opportunities that offer strong learning potential — feel free to reach out!" },

    // Freelance
    { keywords: ["freelance", "part time", "part-time", "contract work"], reply: "Saranya is currently focused on full-time opportunities, but feel free to reach out via the contact form to discuss your specific needs." },

    // Resume/CV
    { keywords: ["resume", "cv", "download resume"], reply: "You can download Saranya's resume using the 'Download CV' button in the top section of this page!" },

    // GitHub profile
    { keywords: ["github profile", "github link", "code samples"], reply: "You can check out all of Saranya's code on GitHub — the link is in the Contact and Footer sections, and each project card also links to its specific repository." },

    // LinkedIn
    { keywords: ["linkedin", "social profile", "professional profile"], reply: "You can connect with Saranya on LinkedIn — the link is available in the Contact and Footer sections of this site." },

    // Strengths
    { keywords: ["strength", "good at", "best skill", "strongest"], reply: "Saranya's strengths include a solid grasp of HTML, CSS, and JavaScript fundamentals, attention to detail in UI work, and a strong drive to continuously learn new technologies like React." },

    // Weakness / growth areas
    { keywords: ["weakness", "improve", "learning curve", "areas to improve"], reply: "Saranya is actively expanding her skills in React and advanced JavaScript concepts, and is committed to continuous learning and growth as a developer." },

    // Salary
    { keywords: ["salary", "pay", "compensation", "stipend", "package"], reply: "Salary expectations can be discussed directly — feel free to reach out via the contact form or email to talk further!" },

    // Why hire her
    { keywords: ["why should we hire", "why hire", "why you", "what makes her different"], reply: "Saranya combines a strong foundation in web development with hands-on project experience in both frontend and AI/ML, along with genuine enthusiasm for learning and solving real problems through code." },

    // Teamwork
    { keywords: ["team", "collaborate", "teamwork", "work with others"], reply: "Saranya is looking forward to growing as a developer within a collaborative team environment, where she can learn from others while contributing her own skills." },

    // Hobbies / interests
    { keywords: ["hobby", "hobbies", "interest", "free time", "outside work"], reply: "Beyond coding, Saranya enjoys continuously exploring new web technologies and building small projects to sharpen her skills." },

    // Career goals
    { keywords: ["goal", "future plan", "career plan", "where do you see"], reply: "Saranya's goal is to grow as a Front-End Developer, deepen her expertise in React, and contribute to building meaningful, user-focused web applications." },

    // Thanks
    { keywords: ["thank", "thanks", "appreciate"], reply: "You're very welcome! Feel free to ask anything else, or reach out to Saranya directly via the contact form." },

    // Goodbye
    { keywords: ["bye", "goodbye", "see you", "talk later"], reply: "Thanks for visiting! Don't forget to check out the Projects section and feel free to reach out through the Contact form. Have a great day! 👋" },
  ];

  const findReply = (userInput: string): string => {
    const input = ` ${userInput.toLowerCase()} `;
    for (const entry of knowledgeBase) {
      if (entry.keywords.some((kw) => input.includes(kw.toLowerCase()))) {
        return entry.reply;
      }
    }
    return "That's a great question! For anything specific I couldn't answer, please reach out to Saranya directly via the contact form above or at rajasaranya404@gmail.com — she'd love to hear from you.";
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newUserMessage = {
      id: messages.length + 1,
      text: message,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    const currentMessage = message;
    setMessage('');

    setTimeout(() => {
      const reply = findReply(currentMessage);

      const botResponse = {
        id: messages.length + 2,
        text: reply,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div ref={chatboxRef} className="mb-4 w-80 h-96 glass-card overflow-hidden flex flex-col bg-black border-1 border-gray-200">
          <div className="p-4 border-b border-glass-border ">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-primary rounded-full">
                  <Robot size={20} className="text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Assistant</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <button onClick={toggleChat} className="p-1 hover:bg-muted/20 rounded-full transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${msg.isBot
                    ? 'bg-muted/20 text-foreground'
                    : 'bg-gradient-primary text-foreground'
                    }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-glass-border">
            <div className="flex space-x-2">
              <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} onKeyPress={handleKeyPress} placeholder="Type a message..." className="flex-1 px-3 py-2 bg-glass border border-glass-border rounded-lg text-sm focus:outline-none focus:border-primary" />
              <button onClick={handleSendMessage} className="p-2 w-8 h-8 bg-gradient-primary rounded-lg hover:scale-105 transition-transform">
                <PaperPlaneTilt size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button ref={buttonRef} onClick={toggleChat} className="chatbot w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow-primary hover:scale-110 transition-transform">
        {isOpen ? (
          <X size={24} className="text-foreground" />
        ) : (
          <ChatCircle size={24} className="text-foreground" />
        )}
      </button>
    </div>
  );
};

export default Chatbot;