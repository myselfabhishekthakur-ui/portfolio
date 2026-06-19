"use client";

import React, { useState, useEffect, useRef } from "react";
import { profile, about, skills, experience, projects } from "@/data/content";

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [aiResponse, setAiResponse] = useState("Tap the center orb to talk.");
  const [isMuted, setIsMuted] = useState(false);
  const [appLang, setAppLang] = useState<"en" | "hi">("en");
  const [browserSupport, setBrowserSupport] = useState({ speechRecognition: true, speechSynthesis: true });

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isOpenRef = useRef(isOpen);
  const appLangRef = useRef(appLang);
  const isThinkingRef = useRef(isThinking);
  const isSpeakingRef = useRef(isSpeaking);

  // Keep refs in sync
  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    appLangRef.current = appLang;
  }, [appLang]);

  useEffect(() => {
    isThinkingRef.current = isThinking;
  }, [isThinking]);

  useEffect(() => {
    isSpeakingRef.current = isSpeaking;
  }, [isSpeaking]);

  // System Prompt containing Abhishek's complete professional and personal details from his portfolio & resume
  const systemPrompt = `You are the AI Voice Assistant for Abhishek Kumar's portfolio website. 
Here is Abhishek Kumar's complete resume and portfolio details:

Name: Abhishek Kumar
Role: Gen AI & Full Stack Developer
Experience: 7 Years of professional software engineering experience.
Location: Ghaziabad, India
Email: myselfabhishekthakur@gmail.com
Phone: +91 81269 02247

Work History:
1. GenAquarius (Oct 2025 — Mar 2026) | Full Stack Developer (Gen AI)
   - Continued feature development for Station Casinos Labor System.
   - Built React.js & Next.js apps, integrated REST APIs, and built Generative AI (LLM/RAG) integrations.
2. R Systems (Dec 2021 — Oct 2025) | Software Developer
   - Owned end-to-end delivery of casino management platforms.
   - Built Next.js/React UI (SSR & Performance optimized).
   - Designed Node.js & NestJS backend microservices, REST APIs, auth, Jest testing, and Azure DevOps CI/CD.
3. K-12 Learning Solutions (Feb 2021 — Nov 2021) | Front End Developer
   - Responsive UI using React, HTML5, CSS3, JavaScript. REST API integration.
4. Virtual Employee (Mar 2019 — Jan 2021) | Junior Front End Developer
   - Frontend layouts (HTML, CSS, JS, WordPress, PHP).

Projects:
1. Station Casinos Labor System (2021 — 2026)
   - Overview: Workforce management system tracking availability, schedule creation, and labor-volume data.
   - Tech: React, Next.js, Node.js, NestJS, Material UI, MongoDB, MySQL.
   - Challenges & Solutions: Maintained operations during R Systems → GenAquarius transition; optimized NestJS microservices and Next.js SSR to handle huge datasets.
   - Learnings: Owning enterprise Agile features; NestJS microservices.
2. K-12 Learning Platform (2021)
   - Overview: E-learning responsive interface built in React integrating REST APIs.
   - Tech: React, HTML5/CSS3, JavaScript, REST APIs.

Skills Inventory:
- Languages: JavaScript, PHP, HTML/CSS, MySQL.
- Frontend: React, Next.js, Vue.js, Tailwind, Material UI, Bootstrap, Sass/SCSS.
- Backend: Node.js, NestJS, MongoDB, PostgreSQL, GraphQL, RabbitMQ, REST APIs.
- Tools: Git, Azure DevOps, AWS, Postman, Jest, VS Code, ChatGPT/Copilot, Gen AI (LLM/RAG).

Personal & Extracurricular Activities:
- Abhishek is an accomplished singer and guitarist who performed on Indian Idol and various other reality shows.
- He is a passionate traveler who loves mountain road trips and exploring new scenic routes.

Rules:
1. Answer short (1-2 sentences max) so it reads and speaks nicely.
2. Respond in the user's language (Hindi for Hindi/Hinglish queries, English for English).
3. If they ask about Abhishek generally or his introduction/resume, give a professional background summary and ALWAYS conclude by asking: "Would you like to know more about Abhishek's personal interests and extracurricular activities outside of the IT sector?" (or "क्या आप आईटी सेक्टर के अलावा अभिषेक के पर्सनल इंटरेस्ट्स और एक्स्ट्रा करिकुलर एक्टिविटीज़ के बारे में जानना चाहेंगे?" in Hindi).
4. If they say "yes" (or ask about his personal interests/extracurricular activities/music/guitar/Indian Idol/travel), tell them about his singing, guitar, Indian Idol shows, and travel, and ALWAYS conclude by asking: "Would you like to hear about his software engineering career?" (or "क्या आप उनके सॉफ्टवेयर इंजीनियरिंग करियर के बारे में जानना चाहेंगे?" in Hindi).`;

  // Initialize Speech APIs
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthesisRef.current = window.speechSynthesis;

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setBrowserSupport((prev) => ({ ...prev, speechRecognition: false }));
      } else {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-IN"; // Handles Indian English and Hinglish accents beautifully

        rec.onstart = () => {
          setIsListening(true);
          setIsThinking(false);
          setIsSpeaking(false);
          setTranscript("");
          setAiResponse(appLangRef.current === "hi" ? "सुन रहा हूँ..." : "Listening...");
        };

        rec.onresult = (event: any) => {
          const resultText = event.results[0][0].transcript;
          setTranscript(resultText);
          setIsListening(false);
          setIsThinking(true);
          setAiResponse(appLangRef.current === "hi" ? "सोच रहा हूँ..." : "Thinking...");
          setTimeout(() => {
            handleQuestion(resultText);
          }, 800);
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          setIsThinking(false);
          if (event.error === "not-allowed") {
            setTranscript(appLangRef.current === "hi" ? "माइक परमिशन की आवश्यकता है।" : "Microphone permission denied.");
            setAiResponse(appLangRef.current === "hi" ? "कृपया अपने ब्राउज़र में माइक परमिशन चालू करें।" : "Please allow microphone access in your browser settings.");
          } else {
            setTranscript("");
            setAiResponse(appLangRef.current === "hi" ? "बोलने के लिए माइक दबाएं।" : "Tap the center orb to talk.");
          }
        };

        rec.onend = () => {
          setIsListening(false);
          // If we finished listening and are completely idle (not thinking/speaking), reset to prompt
          setTimeout(() => {
            if (isOpenRef.current && !synthesisRef.current?.speaking && !isThinkingRef.current) {
              setAiResponse(appLangRef.current === "hi" ? "बोलने के लिए माइक दबाएं।" : "Tap the center orb to talk.");
            }
          }, 200);
        };

        recognitionRef.current = rec;
      }

      if (!window.speechSynthesis) {
        setBrowserSupport((prev) => ({ ...prev, speechSynthesis: false }));
      }
    }

    return () => {
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, []);

  // Stop speaking when panel opens/closes
  useEffect(() => {
    stopSpeaking();
    if (isOpen) {
      setIsThinking(true);
      setTranscript("");
      setAiResponse(appLang === "hi" ? "कनेक्ट हो रहा है..." : "Connecting...");
      setTimeout(() => {
        setIsThinking(false);
        const greeting = appLang === "hi" 
          ? `नमस्ते! मैं अभिषेक का वॉइस असिस्टेंट हूँ। क्या आप उनके सॉफ्टवेयर इंजीनियरिंग करियर के बारे में जानना चाहते हैं?` 
          : `Hi! I'm Abhishek's Voice Assistant. Would you like to hear about his software engineering career?`;
        setAiResponse(greeting);
        speakText(greeting);
      }, 600);
    }
  }, [isOpen]);

  const speakText = (text: string) => {
    if (!synthesisRef.current || isMuted || !browserSupport.speechSynthesis) return;

    stopSpeaking();

    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;

    // Workaround for browser garbage collection bug where onend fails to fire
    if (typeof window !== "undefined") {
      (window as any).activeUtterances = (window as any).activeUtterances || [];
      (window as any).activeUtterances.push(utterance);
    }

    // Detect language of response to pick the right voice
    const isHindiText = /[\u0900-\u097F]/.test(text) || appLang === "hi";
    utterance.lang = isHindiText ? "hi-IN" : "en-US";

    const voices = synthesisRef.current.getVoices();
    const voice = isHindiText 
      ? voices.find((v) => v.lang.startsWith("hi-")) 
      : voices.find((v) => v.lang.startsWith("en-") && v.name.includes("Google")) || voices.find((v) => v.lang.startsWith("en-"));

    if (voice) {
      utterance.voice = voice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsThinking(false);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
      if (typeof window !== "undefined" && (window as any).activeUtterances) {
        (window as any).activeUtterances = (window as any).activeUtterances.filter((u: any) => u !== utterance);
      }
      if (isOpenRef.current && !isMuted) {
        startListening();
      }
    };
    
    utterance.onerror = () => {
      setIsSpeaking(false);
      if (typeof window !== "undefined" && (window as any).activeUtterances) {
        (window as any).activeUtterances = (window as any).activeUtterances.filter((u: any) => u !== utterance);
      }
    };

    synthesisRef.current.speak(utterance);
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  const startListening = () => {
    stopSpeaking();
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
        setTimeout(() => {
          if (isOpenRef.current) {
            recognitionRef.current.start();
          }
        }, 50);
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
      }
    }
  };


  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  // Call Free Serverless Hugging Face LLM (Qwen 7B) with fallback
  const fetchLLMResponse = async (userPrompt: string): Promise<string | null> => {
    const model = "Qwen/Qwen2.5-7B-Instruct";
    try {
      const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Accepts a public Hugging Face Read Token if configured, else calls keyless
          ...(process.env.NEXT_PUBLIC_HF_TOKEN ? { "Authorization": `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}` } : {})
        },
        body: JSON.stringify({
          inputs: `<|system|>\n${systemPrompt}\n<|user|>\n${userPrompt}\n<|assistant|>\n`,
          parameters: { max_new_tokens: 150, temperature: 0.7 }
        }),
      });
      const data = await response.json();
      if (data && data[0] && data[0].generated_text) {
        const fullText = data[0].generated_text;
        const parts = fullText.split("<|assistant|>\n");
        const answer = parts[parts.length - 1] || fullText;
        return answer.trim();
      }
    } catch (e) {
      console.warn("Free LLM API failed/rate-limited. Falling back to local QA:", e);
    }
    return null;
  };

  // Conversational AI Engine supporting English & Hindi Q&A
  const handleQuestion = async (text: string) => {
    const query = text.toLowerCase().trim();
    
    // First, attempt to call the free serverless LLM
    const llmAnswer = await fetchLLMResponse(text);
    if (llmAnswer) {
      setAiResponse(llmAnswer);
      setIsThinking(false);
      speakText(llmAnswer);
      return;
    }

    // Fallback Local QA Engine containing full resume details
    let answer = "";
    const isHindiQuery = /[\u0900-\u097F]/.test(text) || 
      query.includes("kaun") || query.includes("kya") || query.includes("gana") || 
      query.includes("sing") || query.includes("safar") || query.includes("guitar") || 
      query.includes("ghoom") || query.includes("yes") || query.includes("haan") ||
      query.includes("personal") || query.includes("hobby") || query.includes("abhishek") && appLang === "hi";

    if (isHindiQuery) {
      // 1. Extracurriculars / Hobbies / Personal (Hindi)
      if (
        query.includes("yes") || query.includes("haan") || query.includes("ha ") || query.includes("personal") || 
        query.includes("hobby") || query.includes("extra") || query.includes("cricula") ||
        query.includes("sing") || query.includes("gana") || query.includes("gata") || 
        query.includes("idol") || query.includes("guitar") || query.includes("gitar") || 
        query.includes("travel") || query.includes("safar") || query.includes("ghoom")
      ) {
        answer = "अभिषेक एक बहुत अच्छे सिंगर और गिटार वादक हैं जिन्होंने इंडियन आइडल के मंच पर परफॉर्म किया है। वे पहाड़ों पर ट्रैवल करना और नई जगहों को एक्सप्लोर करना भी बेहद पसंद करते हैं। क्या आप उनके सॉफ्टवेयर इंजीनियरिंग करियर के बारे में जानना चाहेंगे?";
      }
      // 2. About Abhishek (Hindi)
      else if (
        query.includes("who is") || query.includes("kaun") || query.includes("kya hai") ||
        query.includes("about") || query.includes("abhishek") || query.includes("introduce") ||
        query.includes("bio") || query.includes("profile") || query.includes("myself")
      ) {
        answer = "अभिषेक कुमार एक फुल स्टैक डेवलपर हैं जिन्हें वेब एप्लीकेशन बनाने का 7 साल का अनुभव है। वे रियेक्ट, नेक्स्ट जेएस और नोड जेएस में माहिर हैं। क्या आप आईटी सेक्टर के अलावा अभिषेक के पर्सनल इंटरेस्ट्स और एक्स्ट्रा करिकुलर एक्टिविटीज़ के बारे में जानना चाहेंगे?";
      }
      // 3. Skills (Hindi)
      else if (
        query.includes("skill") || query.includes("stack") || query.includes("technolog") ||
        query.includes("frontend") || query.includes("backend") || query.includes("framework")
      ) {
        answer = "अभिषेक का टेक्निकल स्टैक बहुत ही एडवांस है। वे जावास्क्रिप्ट, रियेक्ट, नेक्स्ट जेएस, नोड, नेस्ट जेएस, मोंगो डीबी, एसक्यूएल और जनरेटिव एआई में कुशल हैं। क्या आप उनके पर्सनल इंटरेस्ट्स के बारे में जानना चाहेंगे?";
      }
      // 4. Experience (Hindi)
      else if (
        query.includes("experience") || query.includes("work") || query.includes("job") ||
        query.includes("compan") || query.includes("history")
      ) {
        answer = "अभिषेक को आईटी सेक्टर में 7 साल का अनुभव है। वे जेन एक्वेरियस में फुल स्टैक और जनरेटिव एआई डेवलपर रहे हैं। आर सिस्टम्स में उन्होंने 4 साल तक काम किया है। क्या आप उनके पर्सनल इंटरेस्ट्स के बारे में जानना चाहेंगे?";
      }
      // 5. Contact (Hindi)
      else if (
        query.includes("contact") || query.includes("email") || query.includes("phone") ||
        query.includes("reach") || query.includes("number") || query.includes("mail")
      ) {
        answer = `आप अभिषेक को ईमेल ${profile.email} या फोन ${profile.phone} पर संपर्क कर सकते हैं। वे गाजियाबाद, भारत में रहते हैं। क्या आप उनके पर्सनल इंटरेस्ट्स के बारे में जानना चाहेंगे?`;
      }
      else {
        answer = "अभिषेक एक फुल स्टैक डेवलपर होने के साथ-साथ सिंगर और गिटारिस्ट भी हैं। क्या आप आईटी सेक्टर के अलावा अभिषेक के पर्सनल इंटरेस्ट्स के बारे में जानना चाहेंगे?";
      }
    } else {
      // English / Hinglish fallback
      // 1. Extracurriculars / Hobbies / Personal (English)
      if (
        query.includes("yes") || query.includes("personal") || query.includes("hobby") || 
        query.includes("extra") || query.includes("cricula") || query.includes("interest") ||
        query.includes("sing") || query.includes("song") || query.includes("music") || 
        query.includes("idol") || query.includes("guitar") || query.includes("travel") || query.includes("trip")
      ) {
        answer = "Outside of software engineering, Abhishek is an accomplished singer and guitarist who performed on Indian Idol. He is also a passionate traveler who loves exploring nature. Would you like to hear about his software engineering career?";
      }
      // 2. About Abhishek / Intro (English)
      else if (
        query.includes("who is") || query.includes("about") || query.includes("abhishek") ||
        query.includes("introduce") || query.includes("bio") || query.includes("profile") ||
        query.includes("myself")
      ) {
        answer = "Abhishek Kumar is a Full Stack and Gen AI Developer with 7 years of experience building scalable web applications. Would you like to know more about Abhishek's personal interests and extracurricular activities outside of the IT sector?";
      }
      // 3. Skills (English)
      else if (
        query.includes("skill") || query.includes("stack") || query.includes("technolog") ||
        query.includes("frontend") || query.includes("backend") || query.includes("framework")
      ) {
        answer = "Abhishek is highly skilled in React, Next.js, Node.js, NestJS, and Database systems, alongside Generative AI (LLM & RAG). Would you like to know more about Abhishek's personal interests and extracurricular activities?";
      }
      // 4. Experience (English)
      else if (
        query.includes("experience") || query.includes("work") || query.includes("job") ||
        query.includes("compan") || query.includes("history")
      ) {
        answer = "Abhishek has 7 years of software experience, including working at GenAquarius on Gen AI features, and almost 4 years at R Systems. Would you like to know more about Abhishek's personal interests outside the IT sector?";
      }
      // 5. Contact (English)
      else if (
        query.includes("contact") || query.includes("email") || query.includes("phone") ||
        query.includes("reach") || query.includes("number") || query.includes("mail")
      ) {
        answer = `You can email Abhishek at ${profile.email} or call him at ${profile.phone}. He is located in Ghaziabad, India. Would you like to know more about his personal interests?`;
      }
      else {
        answer = "Abhishek is a developer who also sings and plays guitar. Would you like to know more about Abhishek's personal interests and extracurricular activities outside of the IT sector?";
      }
    }

    setAiResponse(answer);
    setIsThinking(false);
    speakText(answer);
  };

  const handleMicClick = () => {
    if (isListening) {
      stopListening();
    } else if (isSpeaking) {
      stopSpeaking();
    } else {
      startListening();
    }
  };

  const toggleLanguage = () => {
    const nextLang = appLang === "en" ? "hi" : "en";
    setAppLang(nextLang);
    if (recognitionRef.current) {
      recognitionRef.current.lang = nextLang === "hi" ? "hi-IN" : "en-IN";
    }
    // Update local text immediately
    stopSpeaking();
    stopListening();
    setTranscript("");
    if (nextLang === "hi") {
      setAiResponse("नमस्ते! मैं अभिषेक का वॉइस असिस्टेंट हूँ। क्या आप उनके सॉफ्टवेयर इंजीनियरिंग करियर के बारे में जानना चाहते हैं?");
    } else {
      setAiResponse("Hi! I'm Abhishek's Voice Assistant. Would you like to hear about his software engineering career?");
    }
  };

  return (
    <>
      {/* Custom Keyframe Animations for Siri-style Waveform */}
      <style jsx global>{`
        @keyframes siri-rotate-1 {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes siri-rotate-2 {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes siri-rotate-3 {
          from { transform: rotate(180deg); }
          to { transform: rotate(540deg); }
        }
        @keyframes siri-pulse-rx-1 {
          0%, 100% { rx: 78px; ry: 58px; }
          50% { rx: 84px; ry: 50px; }
        }
        @keyframes siri-pulse-rx-2 {
          0%, 100% { rx: 58px; ry: 78px; }
          50% { rx: 50px; ry: 84px; }
        }
        @keyframes siri-pulse-rx-3 {
          0%, 100% { rx: 70px; ry: 70px; }
          50% { rx: 65px; ry: 75px; }
        }
        @keyframes siri-pulse-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.4), inset 0 0 15px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 50px rgba(59, 130, 246, 0.7), inset 0 0 25px rgba(59, 130, 246, 0.4); }
        }
        @keyframes indicator-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(6, 182, 212, 0.6)); }
          50% { filter: drop-shadow(0 0 8px rgba(139, 92, 246, 1)); }
        }
      `}</style>

      {/* Sleek Dark Glass Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-black/90 border border-white/10 px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        title="Voice AI"
        aria-label="Voice AI"
      >
        <span 
          className="h-3 w-3 shrink-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600 animate-pulse" 
          style={{ animation: "indicator-glow 2s infinite" }}
        />
        <span className="text-[10px] font-bold tracking-[0.25em] text-white uppercase select-none">Voice AI</span>
      </button>

      {/* Immersive Siri-Style Voice Screen */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080914] p-8 text-white select-none animate-in fade-in duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between z-20">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Voice Assistant</span>
            
            <div className="flex items-center gap-4">
              {/* Language Toggle Button */}
              <button
                onClick={toggleLanguage}
                className="rounded-full bg-neutral-900 border border-white/10 px-4 py-1 text-xs font-semibold hover:bg-neutral-800 text-white transition-all"
                title={appLang === "en" ? "Switch to Hindi" : "Switch to English"}
              >
                {appLang === "en" ? "EN | हिन्दी" : "हिन्दी | EN"}
              </button>

              {/* Close Button */}
              <button
                onClick={() => {
                  stopSpeaking();
                  stopListening();
                  setIsOpen(false);
                }}
                className="rounded-full bg-neutral-900/60 p-2.5 text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
                title="Close Voice Assistant"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Central Siri Waveform and Mic Area */}
          <div className="relative flex flex-col items-center justify-center flex-1">
            
            {/* Waveform Wrapper */}
            <div className="relative flex items-center justify-center h-[340px] w-[340px] max-w-full">
              
              {/* High-Fidelity Wavy Gradient Ribbons (SVG) */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="siri-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="siri-purple" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#a855f7" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="siri-blue" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Cyan Ribbon Shell */}
                <g style={{ transformOrigin: "100px 100px", animation: `siri-rotate-1 ${isListening ? "3.5s" : isSpeaking ? "4.5s" : isThinking ? "1.5s" : "11s"} linear infinite` }}>
                  <ellipse cx="100" cy="100" rx="78" ry="58" stroke="url(#siri-cyan)" strokeWidth="1" style={{ animation: "siri-pulse-rx-1 2s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="75" ry="61" stroke="url(#siri-cyan)" strokeWidth="0.8" style={{ animation: "siri-pulse-rx-1 2.2s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="81" ry="55" stroke="url(#siri-cyan)" strokeWidth="0.5" style={{ animation: "siri-pulse-rx-1 1.8s ease-in-out infinite" }} />
                </g>

                {/* Purple Ribbon Shell */}
                <g style={{ transformOrigin: "100px 100px", animation: `siri-rotate-2 ${isListening ? "4.5s" : isSpeaking ? "5.5s" : isThinking ? "2s" : "14s"} linear infinite` }}>
                  <ellipse cx="100" cy="100" rx="58" ry="78" stroke="url(#siri-purple)" strokeWidth="1" style={{ animation: "siri-pulse-rx-2 2.2s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="61" ry="75" stroke="url(#siri-purple)" strokeWidth="0.8" style={{ animation: "siri-pulse-rx-2 1.8s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="55" ry="81" stroke="url(#siri-purple)" strokeWidth="0.5" style={{ animation: "siri-pulse-rx-2 2.4s ease-in-out infinite" }} />
                </g>

                {/* Blue/Indigo Ribbon Shell */}
                <g style={{ transformOrigin: "100px 100px", animation: `siri-rotate-3 ${isListening ? "5.5s" : isSpeaking ? "6.5s" : isThinking ? "2.5s" : "17s"} linear infinite` }}>
                  <ellipse cx="100" cy="100" rx="70" ry="70" stroke="url(#siri-blue)" strokeWidth="1" style={{ animation: "siri-pulse-rx-3 1.8s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="67" ry="73" stroke="url(#siri-blue)" strokeWidth="0.8" style={{ animation: "siri-pulse-rx-3 2.4s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="73" ry="67" stroke="url(#siri-blue)" strokeWidth="0.5" style={{ animation: "siri-pulse-rx-3 2s ease-in-out infinite" }} />
                </g>
              </svg>

              {/* Central Glowing Mic Button */}
              <button 
                onClick={handleMicClick}
                className="relative flex items-center justify-center h-20 w-20 rounded-full bg-blue-600/10 border border-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                style={{
                  animation: (isListening || isSpeaking || isThinking) ? "siri-pulse-glow 2s infinite" : "none"
                }}
              >
                {/* Concentric Glow Circle */}
                <div className="absolute inset-1.5 rounded-full bg-blue-500/10 border border-blue-400/20" />
                
                {/* Blue Mic Icon */}
                <svg className="h-8 w-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
