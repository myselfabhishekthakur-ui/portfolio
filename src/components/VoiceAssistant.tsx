"use client";

import React, { useState, useEffect, useRef } from "react";
import { profile } from "@/data/content";

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [browserSupport, setBrowserSupport] = useState({ speechRecognition: true, speechSynthesis: true });

  const recognitionRef = useRef<any>(null);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isOpenRef = useRef(isOpen);
  const isThinkingRef = useRef(isThinking);
  const isSpeakingRef = useRef(isSpeaking);
  // Tracks detected conversation language across turns so "yes" / "tell me more" replies in the right language
  const conversationLangRef = useRef<"en">("en");
  // Tracks last discussed topic so "yes" continues correctly
  const lastTopicRef = useRef<"greeting" | "intro" | "personal" | "skills" | "experience" | "projects" | "contact" | "">("greeting");
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const recognitionTranscriptRef = useRef<string>("");

  // Keep refs in sync
  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);
  useEffect(() => { isThinkingRef.current = isThinking; }, [isThinking]);
  useEffect(() => { isSpeakingRef.current = isSpeaking; }, [isSpeaking]);

  // ─── System Prompt ────────────────────────────────────────────────────────────
  const systemPrompt = `You are the AI Voice Assistant for Abhishek Kumar's portfolio website.

Your primary goal is to answer visitor questions naturally, professionally, and accurately about Abhishek Kumar.

========================
ABOUT ABHISHEK KUMAR
========================

Abhishek Kumar is a Gen AI and Full Stack Developer with 7 years of professional software engineering experience.

He specializes in building scalable web applications, enterprise platforms, microservices, and modern cloud-based solutions.

His core expertise includes:

Frontend: React.js, Next.js, Vue.js, Tailwind CSS, Material UI, Bootstrap, Sass/SCSS
Backend: Node.js, NestJS, REST APIs, GraphQL, RabbitMQ
Databases: PostgreSQL, MongoDB, MySQL
Cloud & Tools: Azure DevOps, AWS, Git, Postman, Jest, VS Code
Generative AI: LLM Applications, RAG Systems, AI Agents, Semantic Search, Document Intelligence

He has experience in: Frontend Development, Backend Development, Full Stack Architecture, Microservices, System Design, Performance Optimization, API Development, Cloud Deployments, Agile Development, Team Collaboration, End-to-End Feature Ownership.

========================
PROFESSIONAL SUMMARY
========================

Abhishek Kumar is a Full Stack and Gen AI Developer with 7 years of experience building scalable web applications and enterprise-grade systems. He has worked extensively with React.js, Next.js, Node.js, NestJS, PostgreSQL, MongoDB, Azure, AWS, and modern Generative AI technologies. He has successfully delivered enterprise workforce management systems, modern frontend applications, backend microservices, REST APIs, and AI-powered solutions. He is experienced in designing scalable architectures, optimizing application performance, integrating cloud services, and delivering production-ready applications.

========================
WORK EXPERIENCE
========================

1. GenAquarius — Full Stack Developer (Gen AI) | Oct 2025 – Mar 2026
   - Continued development of Station Casinos Labor System
   - Built React.js and Next.js applications
   - Integrated REST APIs
   - Worked on Generative AI solutions including LLM and RAG-based features
   - Maintained enterprise applications after migration from R Systems

2. R Systems — Software Developer | Dec 2021 – Oct 2025
   - End-to-end feature ownership of enterprise casino management systems
   - React.js and Next.js development with SSR and performance optimization
   - Node.js and NestJS backend development and microservices architecture
   - Authentication, authorization, Azure DevOps CI/CD
   - Unit and integration testing using Jest

3. K-12 Learning Solutions — Front End Developer | Feb 2021 – Nov 2021
   - React.js development with reusable UI components
   - Responsive design, REST API integration, cross-browser compatibility

4. Virtual Employee — Junior Front End Developer | Mar 2019 – Jan 2021
   - HTML, CSS, JavaScript, WordPress customization, PHP development, Responsive layouts

========================
PROJECTS
========================

Station Casinos Labor System (2021–2026):
Enterprise workforce management platform for employee availability management, schedule creation, workforce planning, and labor-volume tracking.
Features: Team Availability Management, Schedule Creation, Workforce Planning, Labor Data Tracking, Performance Optimization, SSR
Technology: React.js, Next.js, Node.js, NestJS, MongoDB, MySQL, REST APIs
Challenges: Migration from R Systems to GenAquarius, handling large workforce datasets, performance optimization
Solutions: Optimized React rendering, improved state management, implemented Next.js SSR, ensured smooth platform migration

K-12 Learning Platform (2021):
Responsive e-learning platform built using React.js with reusable components, dynamic rendering, REST API integration.
Technology: React.js, JavaScript, HTML5, CSS3

========================
PERSONAL INTERESTS & EXTRACURRICULAR ACTIVITIES
========================
(ONLY share when explicitly asked by the user)

Outside of software engineering, Abhishek is passionate about music, travelling, and adventure. Music has been an important part of his life for many years, and he enjoys singing and playing guitar in his free time. He has participated in musical performances, band activities, and reality-show auditions, including platforms such as Indian Idol and Sa Re Ga Ma Pa. Beyond music, he enjoys exploring mountain destinations, scenic routes, and new cultures. Uttarakhand, including places such as Almora and other hill regions, is among his favorite travel destinations. He enjoys: Travelling, Riding, Road Trips, Nature Exploration, Guitar, Singing, Adventure Activities. These experiences help him stay creative, energetic, and maintain a healthy work-life balance.

========================
CONTACT INFORMATION
========================
Email: myselfabhishekthakur@gmail.com
Phone: +91 81269 02247
Location: Ghaziabad, India
LinkedIn: https://www.linkedin.com/in/abhishek-kumar-thakur-114846171/
GitHub: https://github.com/myselfabhishekthakur-ui

========================
BEHAVIOR RULES
========================

RULE 1 — STRICT SEPARATION:
Never mix Professional Introduction and Personal Interests in the same answer unless the user explicitly asks for both.

RULE 2 — PROFESSIONAL INTRODUCTION:
When a user asks: "Who is Abhishek?", "Tell me about Abhishek", "Introduce yourself", "About Abhishek", "Experience", "Career", or "Work history" — ONLY provide professional information. Do NOT mention singing, guitar, Indian Idol, travel, hobbies, or extracurricular activities.

Professional Introduction Template:
"Abhishek Kumar is a Gen AI and Full Stack Developer with 7 years of professional software engineering experience. He has worked with organizations including GenAquarius, R Systems, K-12 Learning Solutions, and Virtual Employee. Throughout his career, he has designed and developed scalable web applications, enterprise platforms, microservices, and modern cloud-based solutions. His expertise includes React.js, Next.js, Node.js, NestJS, PostgreSQL, MongoDB, Azure, AWS, and Generative AI technologies such as LLMs, RAG systems, AI Agents, and Semantic Search. He has successfully delivered large-scale workforce management systems and enterprise applications used by thousands of users."

After professional answer ask:
"Would you like to know about Abhishek's personal interests and achievements outside the IT industry?"

RULE 3 — PERSONAL INTERESTS (only when explicitly asked):
ONLY discuss personal interests when the user explicitly asks about: hobbies, personal life, extracurricular, interests, music, singing, guitar, Indian Idol, Sa Re Ga Ma Pa, travel, travelling, passion — OR says "yes" after the follow-up question.

Personal Interests Template:
"Abhishek is an accomplished singer and guitarist who has performed on Indian Idol and Sa Re Ga Ma Pa. Apart from technology, he is passionate about music, live performances, and creative expression. He also enjoys travelling, especially mountain road trips and exploring scenic destinations across India, particularly Uttarakhand and hill regions. These activities help him maintain creativity, discipline, and a balanced lifestyle alongside his software engineering career."

After personal interests answer ask:
"Would you like to hear about his software engineering career and technical expertise?"

RULE 4 — ANSWER DEPTH:
For introduction questions: provide detailed answers (5-8 sentences), NOT 1-2 sentences.
For skills questions: explain Frontend Skills, Backend Skills, Cloud, Databases, AI/GenAI in detail.
For experience questions: explain total years, company names, responsibilities, major achievements, technologies used.

RULE 5 — LANGUAGE:
Always answer in English.

RULE 6 — CONVERSATION CONTINUITY:
If the user says "yes", "tell me more", or "continue" — continue from the previous topic naturally without restarting.

RULE 7 — IDENTITY:
Never say you are an AI model from OpenAI. Behave as Abhishek's personal portfolio assistant. Answer naturally as if speaking to a visitor on Abhishek's portfolio website.

RULE 8 — CRITICAL RESTRICTION:
Do NOT automatically talk about singing, guitar, Indian Idol, travel, or personal life until the visitor explicitly asks or says "yes" after being prompted.`;

  // ─── Speech Init ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthesisRef.current = window.speechSynthesis;

      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setBrowserSupport((prev) => ({ ...prev, speechRecognition: false }));
      } else {
        const rec = new SpeechRecognition();
        // Enable continuous and interimResults for custom silence/pause detection
        rec.continuous = true;
        rec.interimResults = true;
        // Use en-IN as base language
        rec.lang = "en-IN";

        rec.onstart = () => {
          setIsListening(true);
          setIsThinking(false);
          setIsSpeaking(false);
        };

        rec.onresult = (event: any) => {
          if (silenceTimeoutRef.current) {
            clearTimeout(silenceTimeoutRef.current);
          }

          let accumulated = "";
          for (let i = 0; i < event.results.length; i++) {
            accumulated += event.results[i][0].transcript + " ";
          }
          accumulated = accumulated.trim();

          if (accumulated) {
            recognitionTranscriptRef.current = accumulated;
          }

          // Silence detection: wait 1.6 seconds after user pauses to determine they're done speaking.
          // This allows natural speech pauses, thinking time, and correct turn completion.
          silenceTimeoutRef.current = setTimeout(() => {
            if (recognitionTranscriptRef.current) {
              const finalQuery = recognitionTranscriptRef.current;
              recognitionTranscriptRef.current = "";
              setIsListening(false);
              setIsThinking(true);

              try {
                rec.stop();
              } catch (e) {
                console.error("Failed to stop recognition on silence:", e);
              }

              handleQuestion(finalQuery);
            }
          }, 1600);
        };

        rec.onerror = (event: any) => {
          console.error("Speech recognition error:", event.error);
          setIsListening(false);
          setIsThinking(false);
        };

        rec.onend = () => {
          setIsListening(false);
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
      if (silenceTimeoutRef.current) {
        clearTimeout(silenceTimeoutRef.current);
      }
    };
  }, []);

  // ─── Greeting on Open ─────────────────────────────────────────────────────────
  useEffect(() => {
    stopSpeaking();
    if (isOpen) {
      setIsThinking(true);
      lastTopicRef.current = "greeting"; // Reset to greeting on session start
      setTimeout(() => {
        setIsThinking(false);
        const greeting = `Hi! I'm Abhishek's Voice Assistant. Would you like to hear about his software engineering career?`;
        speakText(greeting);
      }, 600);
    }
  }, [isOpen]);

  // ─── Known male voice names to EXCLUDE ─────────────────────────────────────
  const MALE_VOICE_NAMES = [
    "Rishi", "Daniel", "Alex", "Fred", "Tom", "Oliver", "Aaron",
    "Albert", "Arthur", "Bruce", "Gordon", "Jacques", "Ralph", "Junior"
  ];

  const isFemaleVoice = (v: SpeechSynthesisVoice): boolean => {
    return !MALE_VOICE_NAMES.some((male) => v.name.includes(male));
  };

  // ─── speakText ────────────────────────────────────────────────────────────────
  // Speaks in small chunks to prevent long-text hesitation/buffering pauses.
  // Uses ONLY female voices for clear Siri-like delivery.
  const speakText = (text: string) => {
    if (!synthesisRef.current || isMuted || !browserSupport.speechSynthesis) return;

    stopSpeaking();

    // ── Select voice ONCE (reused for all chunks) ──
    const voices = synthesisRef.current.getVoices();
    let selectedVoice: SpeechSynthesisVoice | undefined;

    // Log all available voices for English (debug)
    console.log(`[VoiceAssistant] Available en voices:`,
      voices.filter((v) => v.lang.startsWith("en")).map((v) => `${v.name} (${v.lang}, local=${v.localService})`)
    );

    selectedVoice =
      // 1. Siri Female en-IN (best: Indian English Siri woman)
      voices.find((v) => v.lang.startsWith("en-IN") && v.name.includes("Siri") && isFemaleVoice(v)) ||
      // 2. Veena — Apple female en-IN
      voices.find((v) => v.lang.startsWith("en-IN") && v.name.includes("Veena")) ||
      // 3. Siri Female en-GB (UK Siri woman — very smooth)
      voices.find((v) => v.lang.startsWith("en-GB") && v.name.includes("Siri") && isFemaleVoice(v)) ||
      // 4. Siri Female en-US (US Siri woman)
      voices.find((v) => v.lang.startsWith("en-US") && v.name.includes("Siri") && isFemaleVoice(v)) ||
      // 5. Samantha — Apple premium female en-US (extremely clear, like classic Siri)
      voices.find((v) => v.lang.startsWith("en-US") && v.name.includes("Samantha")) ||
      // 6. Karen — Apple female en-AU (very clear and natural)
      voices.find((v) => v.lang.startsWith("en-AU") && v.name.includes("Karen")) ||
      // 7. Moira — Apple female en-IE
      voices.find((v) => v.lang.startsWith("en-IE") && v.name.includes("Moira")) ||
      // 8. Any local female en-IN voice
      voices.find((v) => v.lang.startsWith("en-IN") && v.localService && isFemaleVoice(v)) ||
      // 9. Any female en-IN voice
      voices.find((v) => (v.lang === "en-IN" || v.lang === "en_IN") && isFemaleVoice(v)) ||
      // 10. Any local female English voice
      voices.find((v) => v.lang.startsWith("en-") && v.localService && isFemaleVoice(v)) ||
      // 11. Google US English (female)
      voices.find((v) => v.lang === "en-US" && v.name === "Google US English") ||
      // 12. Any female English voice
      voices.find((v) => v.lang.startsWith("en-") && isFemaleVoice(v)) ||
      // 13. Last resort: any English voice
      voices.find((v) => v.lang.startsWith("en-"));

    // Log selected voice
    if (selectedVoice) {
      console.log(`[VoiceAssistant] Selected voice: "${selectedVoice.name}" (${selectedVoice.lang}, local=${selectedVoice.localService})`);
    } else {
      console.warn("[VoiceAssistant] No voice found for English");
    }

    // ── Split text into sentence chunks for smooth, natural delivery ──
    // Do NOT split on commas, as that causes unnatural pauses and hesitation.
    let chunks = text
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    // If splitting produced nothing (no punctuation), use the whole text as one chunk
    if (chunks.length === 0) {
      chunks = [text];
    }

    let currentIndex = 0;

    const speakNext = () => {
      if (!isOpenRef.current || currentIndex >= chunks.length || !synthesisRef.current) {
        setIsSpeaking(false);
        if (typeof window !== "undefined") {
          (window as any).activeUtterances = [];
        }
        // Auto restart listening after all chunks are spoken
        if (isOpenRef.current && !isMuted) {
          startListening();
        }
        return;
      }

      const chunk = chunks[currentIndex];
      currentIndex++;

      const utt = new SpeechSynthesisUtterance(chunk);
      utteranceRef.current = utt;

      // Prevent browser GC from silently dropping onend
      if (typeof window !== "undefined") {
        (window as any).activeUtterances = (window as any).activeUtterances || [];
        (window as any).activeUtterances.push(utt);
      }

      if (selectedVoice) {
        utt.voice = selectedVoice;
        utt.lang = selectedVoice.lang;
      } else {
        utt.lang = "en-IN";
      }

      // Native 1.0 rate/pitch for maximum clarity — no resampling artifacts
      utt.rate = 1.0;
      utt.pitch = 1.0;
      utt.volume = 1;

      utt.onstart = () => {
        setIsSpeaking(true);
        setIsThinking(false);
      };

      utt.onend = () => {
        if (typeof window !== "undefined" && (window as any).activeUtterances) {
          (window as any).activeUtterances = (window as any).activeUtterances.filter((u: any) => u !== utt);
        }
        // Speak the next chunk immediately (no gap)
        speakNext();
      };

      utt.onerror = () => {
        setIsSpeaking(false);
        if (typeof window !== "undefined" && (window as any).activeUtterances) {
          (window as any).activeUtterances = (window as any).activeUtterances.filter((u: any) => u !== utt);
        }
      };

      synthesisRef.current.speak(utt);
    };

    // Start the chain
    speakNext();
  };

  const stopSpeaking = () => {
    if (synthesisRef.current) synthesisRef.current.cancel();
    setIsSpeaking(false);
  };

  const startListening = () => {
    stopSpeaking();
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
    recognitionTranscriptRef.current = "";
    if (recognitionRef.current) {
      try {
        recognitionRef.current.lang = "en-IN";
        recognitionRef.current.abort();
        setTimeout(() => {
          if (isOpenRef.current) recognitionRef.current.start();
        }, 50);
      } catch (e) {
        console.error("Failed to start speech recognition:", e);
      }
    }
  };

  const stopListening = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
    }
    recognitionTranscriptRef.current = "";
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Failed to stop speech recognition:", e);
      }
    }
  };

  // ─── Free LLM (Hugging Face Multi-Model Fallback Chain) ──────────────────────
  const fetchLLMResponse = async (userPrompt: string): Promise<string | null> => {
    const models = [
      "Qwen/Qwen2.5-72B-Instruct",
      "meta-llama/Meta-Llama-3.1-70B-Instruct",
      "Qwen/Qwen2.5-7B-Instruct"
    ];

    for (const model of models) {
      try {
        console.log(`[VoiceAssistant] Attempting LLM query with model: ${model}`);
        
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500); // 3.5s timeout for fast responses

        const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(process.env.NEXT_PUBLIC_HF_TOKEN
              ? { Authorization: `Bearer ${process.env.NEXT_PUBLIC_HF_TOKEN}` }
              : {}),
          },
          body: JSON.stringify({
            inputs: `<|system|>\n${systemPrompt}\n<|user|>\n${userPrompt}\n<|assistant|>\n`,
            parameters: { max_new_tokens: 200, temperature: 0.7 },
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn(`[VoiceAssistant] Model ${model} returned status ${response.status}. Trying next model...`);
          continue;
        }

        const data = await response.json();
        if (data && data[0] && data[0].generated_text) {
          const fullText = data[0].generated_text;
          const parts = fullText.split("<|assistant|>\n");
          const result = (parts[parts.length - 1] || fullText).trim();
          if (result) {
            console.log(`[VoiceAssistant] Successfully generated response using model: ${model}`);
            return result;
          }
        }
      } catch (e: any) {
        if (e.name === 'AbortError') {
          console.warn(`[VoiceAssistant] Model ${model} query timed out after 3.5s. Trying next model...`);
        } else {
          console.warn(`[VoiceAssistant] Failed to query model ${model}:`, e);
        }
      }
    }
    return null;
  };

  // ─── Local QA Fallback ────────────────────────────────────────────────────────
  const handleQuestion = async (text: string) => {
    const cleanQuery = text.toLowerCase().trim().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "");

    const words = cleanQuery.split(/\s+/);

    // Pure continuation words (English confirmations and their colloquial versions/short combinations)
    const confirmationWords = [
      "yes", "yeah", "yup", "sure", "okay", "ok", "continue", "tell me more", "more", "go on"
    ];

    const isContinuationOnly = 
      confirmationWords.includes(cleanQuery) ||
      (cleanQuery.split(/\s+/).length <= 2 && words.some(w => [
        "yes", "yeah", "yup", "sure", "okay", "ok", "tell", "sure", "y"
      ].includes(w)));

    const isNegativeContinuation = [
      "no", "n", "nope", "not really"
    ].includes(cleanQuery);

    // Always keep English
    conversationLangRef.current = "en";

    // ── Negative Continuation ────────────────────────────────────────────────
    if (isNegativeContinuation) {
      const answer = "Alright, feel free to ask me any other questions about Abhishek whenever you're ready.";
      setIsThinking(false);
      speakText(answer);
      return;
    }

    // ── Continuation: "yes" / "tell me more" ──────────────────────────────────
    // When user says yes/continue/etc., continue from the topic that was last answered
    if (isContinuationOnly) {
      let answer = "";
      const topic = lastTopicRef.current;
      if (topic === "greeting" || topic === "") {
        // After greeting → give professional introduction
        lastTopicRef.current = "intro";
        answer = "Abhishek Kumar is a Gen AI and Full Stack Developer with 7 years of professional software engineering experience. He has worked with organizations including GenAquarius, R Systems, K-12 Learning Solutions, and Virtual Employee. Throughout his career, he has designed and developed scalable web applications, enterprise platforms, microservices, and modern cloud-based solutions. His expertise includes React.js, Next.js, Node.js, NestJS, PostgreSQL, MongoDB, Azure, AWS, and Generative AI technologies such as LLMs, RAG systems, AI Agents, and Semantic Search. He has successfully delivered large-scale workforce management systems used by thousands of users. Would you like to know about Abhishek's personal interests and achievements outside the IT industry?";
      } else if (topic === "intro") {
        // After professional intro → give personal interests
        lastTopicRef.current = "personal";
        answer = "Outside of software engineering, Abhishek is an accomplished singer and guitarist who has performed on Indian Idol and Sa Re Ga Ma Pa. Apart from technology, he is passionate about music, live performances, and creative expression. He also enjoys travelling, especially mountain road trips and exploring scenic destinations across India, particularly Uttarakhand and hill regions. These activities help him maintain creativity, discipline, and a balanced lifestyle. Would you like to hear about his software engineering career and technical expertise?";
      } else if (topic === "personal") {
        // After personal → give career experience
        lastTopicRef.current = "experience";
        answer = "Abhishek has 7 years of software engineering experience. At GenAquarius he worked as a Full Stack Gen AI Developer building LLM and RAG-based features. At R Systems he spent nearly 4 years delivering enterprise casino management systems using React, Next.js, Node.js, and NestJS with Azure DevOps CI/CD. He also worked at K-12 Learning Solutions and started his career at Virtual Employee. Would you like to know more about his technical skills?";
      } else if (topic === "experience") {
        // After experience → give skills
        lastTopicRef.current = "skills";
        answer = "Abhishek has a strong technical stack. On the frontend he works with React.js, Next.js, Vue.js, Tailwind CSS, Material UI, and Bootstrap. On the backend he uses Node.js, NestJS, REST APIs, GraphQL, and RabbitMQ. His database expertise covers PostgreSQL, MongoDB, and MySQL. He has cloud experience with Azure DevOps and AWS, and works with Generative AI technologies including LLM applications, RAG systems, AI Agents, and Semantic Search. Would you like to know about his projects?";
      } else if (topic === "skills") {
        // After skills → give projects
        lastTopicRef.current = "projects";
        answer = "Abhishek's flagship project is the Station Casinos Labor System — an enterprise workforce management platform handling employee scheduling, availability, and labor-volume tracking for thousands of users, built with React.js, Next.js, Node.js, NestJS, MongoDB, and MySQL. He has also worked on Generative AI projects including LLM integrations, RAG implementations, and AI Assistants. Would you like to know how to contact him?";
      } else {
        lastTopicRef.current = "greeting";
        answer = "I'm Abhishek's Portfolio Assistant. You can ask me about his software engineering experience, technical skills, projects, or personal achievements. Would you like to hear about his software engineering career?";
      }
      setIsThinking(false);
      speakText(answer);
      return;
    }

    // ── Local QA Matcher (Try before LLM to prevent generic AI fallbacks) ──────────
    const query = cleanQuery;
    let answer = "";
    let matchedLocally = false;

    // Personal interests (English)
    if (
      query.includes("personal") || query.includes("hobby") ||
      query.includes("extra") || query.includes("interest") || query.includes("sing") ||
      query.includes("song") || query.includes("music") || query.includes("idol") ||
      query.includes("guitar") || query.includes("travel") || query.includes("trip") ||
      query.includes("passion") || query.includes("sa re ga")
    ) {
      lastTopicRef.current = "personal";
      answer = "Outside of software engineering, Abhishek is an accomplished singer and guitarist who has performed on Indian Idol and Sa Re Ga Ma Pa. Apart from technology, he is passionate about music, live performances, and creative expression. He also enjoys travelling, especially mountain road trips and exploring scenic destinations across India, particularly Uttarakhand and hill regions. These activities help him maintain creativity, discipline, and a balanced lifestyle. Would you like to hear about his software engineering career and technical expertise?";
      matchedLocally = true;
    }
    // Introduction (English)
    else if (
      query.includes("who is") || query.includes("about") || query.includes("abhishek") ||
      query.includes("introduce") || query.includes("bio") || query.includes("profile") ||
      query.includes("tell me")
    ) {
      lastTopicRef.current = "intro";
      answer = "Abhishek Kumar is a Gen AI and Full Stack Developer with 7 years of professional software engineering experience. He has worked with organizations including GenAquarius, R Systems, K-12 Learning Solutions, and Virtual Employee. Throughout his career, he has designed and developed scalable web applications, enterprise platforms, microservices, and modern cloud-based solutions. His expertise includes React.js, Next.js, Node.js, NestJS, PostgreSQL, MongoDB, Azure, AWS, and Generative AI technologies such as LLMs, RAG systems, AI Agents, and Semantic Search. He has successfully delivered large-scale workforce management systems used by thousands of users. Would you like to know about Abhishek's personal interests and achievements outside the IT industry?";
      matchedLocally = true;
    }
    // Skills (English)
    else if (
      query.includes("skill") || query.includes("stack") || query.includes("technolog") ||
      query.includes("technology") || query.includes("tech") ||
      query.includes("frontend") || query.includes("backend") || query.includes("framework") ||
      query.includes("expertise")
    ) {
      lastTopicRef.current = "skills";
      answer = "Abhishek has a strong technical stack. On the frontend he works with React.js, Next.js, Vue.js, Tailwind CSS, Material UI, and Bootstrap. On the backend he uses Node.js, NestJS, REST APIs, GraphQL, and RabbitMQ. His database expertise covers PostgreSQL, MongoDB, and MySQL. He has cloud experience with Azure DevOps and AWS, and works with Generative AI technologies including LLM applications, RAG systems, AI Agents, and Semantic Search. Would you like to know more about his personal interests?";
      matchedLocally = true;
    }
    // Experience (English)
    else if (
      query.includes("experience") || query.includes("work") || query.includes("job") ||
      query.includes("compan") || query.includes("history") || query.includes("career")
    ) {
      lastTopicRef.current = "experience";
      answer = "Abhishek has 7 years of software engineering experience. At GenAquarius he worked as a Full Stack Gen AI Developer building LLM and RAG-based features. At R Systems he spent nearly 4 years delivering enterprise casino management systems using React, Next.js, Node.js, and NestJS with Azure DevOps CI/CD. He also worked at K-12 Learning Solutions and started his career at Virtual Employee. Would you like to know more about his personal interests outside the IT sector?";
      matchedLocally = true;
    }
    // Projects (English)
    else if (
      query.includes("project") || query.includes("casino") || query.includes("station") ||
      query.includes("k-12") || query.includes("built") || query.includes("worked on")
    ) {
      lastTopicRef.current = "projects";
      answer = "Abhishek's flagship project is the Station Casinos Labor System — an enterprise workforce management platform handling employee scheduling, availability, and labor-volume tracking for thousands of users, built with React.js, Next.js, Node.js, NestJS, MongoDB, and MySQL. He has also worked on Generative AI projects including LLM integrations, RAG implementations, and AI Assistants. Would you like to know about his personal interests?";
      matchedLocally = true;
    }
    // Contact (English)
    else if (
      query.includes("contact") || query.includes("email") || query.includes("phone") ||
      query.includes("reach") || query.includes("number") || query.includes("mail")
    ) {
      lastTopicRef.current = "contact";
      answer = `You can reach Abhishek at ${profile.email} or call him at ${profile.phone}. He is located in Ghaziabad, India. Would you like to know more about his personal interests?`;
      matchedLocally = true;
    }

    if (matchedLocally) {
      setIsThinking(false);
      speakText(answer);
      return;
    }

    // Try LLM next
    const llmAnswer = await fetchLLMResponse(text);
    if (llmAnswer) {
      setIsThinking(false);
      conversationLangRef.current = "en";
      speakText(llmAnswer);
      return;
    }

    // Fallback if LLM fails and no local QA matched
    lastTopicRef.current = "greeting";
    answer = "I'm Abhishek's Portfolio Assistant. You can ask me about his career, skills, projects, or personal interests. Would you like to hear about his software engineering career?";

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

  // ─── Status label (no text shown, just for aria) ──────────────────────────────
  const getStatusLabel = () => {
    if (isListening) return "Listening…";
    if (isThinking) return "Thinking…";
    if (isSpeaking) return "Speaking…";
    return "Tap to speak";
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Custom Keyframe Animations */}
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
          0%, 100% { box-shadow: 0 0 30px rgba(59,130,246,0.4), inset 0 0 15px rgba(59,130,246,0.2); }
          50% { box-shadow: 0 0 50px rgba(59,130,246,0.7), inset 0 0 25px rgba(59,130,246,0.4); }
        }
        @keyframes indicator-glow {
          0%, 100% { filter: drop-shadow(0 0 3px rgba(6,182,212,0.6)); }
          50% { filter: drop-shadow(0 0 8px rgba(139,92,246,1)); }
        }
        @keyframes tap-hint-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>

      {/* Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-full bg-black/90 border border-white/10 px-5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none"
        title="Voice AI"
        aria-label="Voice AI"
      >
        <span
          className="h-3 w-3 shrink-0 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-purple-600"
          style={{ animation: "indicator-glow 2s infinite" }}
        />
        <span className="text-[10px] font-bold tracking-[0.25em] text-white uppercase select-none">Voice AI</span>
      </button>

      {/* Fullscreen Voice Screen */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080914] p-8 text-white select-none animate-in fade-in duration-200">

          {/* Header */}
          <div className="flex items-center justify-between z-20">
            <span className="text-xs uppercase tracking-widest text-neutral-500 font-semibold">Voice Assistant</span>
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

          {/* Central Waveform + Mic */}
          <div className="relative flex flex-col items-center justify-center flex-1 gap-6">

            {/* Waveform Wrapper */}
            <div className="relative flex items-center justify-center h-[340px] w-[340px] max-w-full">

              {/* Siri-style Gradient Ribbons */}
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

                {/* Cyan Ribbon */}
                <g style={{ transformOrigin: "100px 100px", animation: `siri-rotate-1 ${isListening ? "3.5s" : isSpeaking ? "4.5s" : isThinking ? "1.5s" : "11s"} linear infinite` }}>
                  <ellipse cx="100" cy="100" rx="78" ry="58" stroke="url(#siri-cyan)" strokeWidth="1" style={{ animation: "siri-pulse-rx-1 2s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="75" ry="61" stroke="url(#siri-cyan)" strokeWidth="0.8" style={{ animation: "siri-pulse-rx-1 2.2s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="81" ry="55" stroke="url(#siri-cyan)" strokeWidth="0.5" style={{ animation: "siri-pulse-rx-1 1.8s ease-in-out infinite" }} />
                </g>

                {/* Purple Ribbon */}
                <g style={{ transformOrigin: "100px 100px", animation: `siri-rotate-2 ${isListening ? "4.5s" : isSpeaking ? "5.5s" : isThinking ? "2s" : "14s"} linear infinite` }}>
                  <ellipse cx="100" cy="100" rx="58" ry="78" stroke="url(#siri-purple)" strokeWidth="1" style={{ animation: "siri-pulse-rx-2 2.2s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="61" ry="75" stroke="url(#siri-purple)" strokeWidth="0.8" style={{ animation: "siri-pulse-rx-2 1.8s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="55" ry="81" stroke="url(#siri-purple)" strokeWidth="0.5" style={{ animation: "siri-pulse-rx-2 2.4s ease-in-out infinite" }} />
                </g>

                {/* Blue Ribbon */}
                <g style={{ transformOrigin: "100px 100px", animation: `siri-rotate-3 ${isListening ? "5.5s" : isSpeaking ? "6.5s" : isThinking ? "2.5s" : "17s"} linear infinite` }}>
                  <ellipse cx="100" cy="100" rx="70" ry="70" stroke="url(#siri-blue)" strokeWidth="1" style={{ animation: "siri-pulse-rx-3 1.8s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="67" ry="73" stroke="url(#siri-blue)" strokeWidth="0.8" style={{ animation: "siri-pulse-rx-3 2.4s ease-in-out infinite" }} />
                  <ellipse cx="100" cy="100" rx="73" ry="67" stroke="url(#siri-blue)" strokeWidth="0.5" style={{ animation: "siri-pulse-rx-3 2s ease-in-out infinite" }} />
                </g>
              </svg>

              {/* Central Mic Button */}
              <button
                onClick={handleMicClick}
                className="relative flex items-center justify-center h-20 w-20 rounded-full bg-blue-600/10 border border-blue-500/30 transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none"
                style={{
                  animation: (isListening || isSpeaking || isThinking) ? "siri-pulse-glow 2s infinite" : "none"
                }}
                aria-label={getStatusLabel()}
              >
                <div className="absolute inset-1.5 rounded-full bg-blue-500/10 border border-blue-400/20" />
                <svg className="h-8 w-8 text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.8)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>

            {/* Tap-to-speak hint — shown only when idle */}
            {!isListening && !isSpeaking && !isThinking && (
              <p
                className="text-xs text-neutral-500 tracking-widest uppercase"
                style={{ animation: "tap-hint-pulse 2.5s ease-in-out infinite" }}
              >
                Tap to speak
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
