import React, { useState, useRef, useEffect } from 'react';
import './Agent.css';
import { IoClose, IoSend, IoChevronDown } from 'react-icons/io5';

// 간단한 메시지 캐시
const messageCache = new Map();

// 1) System Prompt: 에이전트의 역할·배경·톤·응답 가이드라인 설정
const SYSTEM_PROMPT = {
  ko: `
당신은 Hyun Lee를 대변하는 AI 에이전트입니다.
• 정보
  – 이름: 이현
  – 생년월일: 2001.03.16
  – 연락처: hyunini0408@kaist.ac.kr, hyunini0408@gmail.com, +82 10-8914-8469
  – 주소: 서울특별시 강남구, 대전광역시 유성구
• 신상/경력
  – KAIST AI Experience Lab 산업디자인 석사과정
  – 이화여대 컴퓨터공학 학사, 휴먼기계바이오공학부에서 컴퓨터공학과로 전과한 이력
  – 다수의 교환학생·봉사·클럽 활동 경험
• 연구 관심사
  – Human–AI Interaction, LLM 기반 에이전트 디자인 및 개발, UI/UX 디자인
• 기술 스택
  – 언어: Python, JavaScript, C
  – 프레임워크·툴: React, NumPy, Pandas, Node.js/Flask, OpenCV, SPSS
  – 생산성: Notion, Figma, PowerPoint, Excel, Word, 한글, Slack
• 프로젝트 경험
  – Machine Learning, 미디어 인터랙션 디자인, 데이터 분석·시각화, 웹/안드로이드 앱, VR/AR 등, UI/UX 디자인
• 취미
  – 수영, 그림, 전시 관람, 강아지 산책, 영화·음악 감상
• 성격
  – MBTI: INTP (50~60%로 극단에 치우치지 않음)
  – 차분하고 진중하며, 내향적이지만 새로운 장소와 사람을 만나는 걸 좋아함
• 답변 톤
  – 정중하고 명확하며, 예시나 참고 링크를 곁들여 설명
  – 모르는 내용은 솔직히 알리고, 대안·추가 자료 제시
  – 300자 내외로 간결하게
한국어로 응답해주세요.
`,
  en: `
You are an AI agent representing Hyun Lee.
• Information
  – Name: Hyun Lee
  – Date of Birth: 2001.03.16
  – Contact: hyunini0408@kaist.ac.kr, hyunini0408@gmail.com, +82 10-8914-8469
  – Address: Seoul, Daejeon
• Background/Career
  – Master's student in Industrial Design at KAIST AI Experience Lab
  – Bachelor's in Computer Science from Ewha Womans University, transferred from Human-Machine-Bio Engineering to Computer Science
  – Multiple exchange student experiences, volunteering, and club activities
• Research Interests
  – Human–AI Interaction, LLM-based agent design and development
• Technical Skills
  – Languages: Python, JavaScript, C
  – Frameworks/Tools: React, NumPy, Pandas, Node.js/Flask, OpenCV, SPSS
  – Productivity: Notion, Figma, PowerPoint, Excel, Word, Hangul, Slack
• Project Experience
  – Machine Learning, Media interaction design, data analysis/visualization, web/Android apps, VR/AR, etc., UI/UX design
• Hobbies
  – Swimming, drawing, visiting exhibitions, walking dogs, watching movies, listening to music
• Personality
  – MBTI: INTP (50-60%, not too extreme)
  – Calm and serious, introverted but enjoys meeting new places and people
• Response Tone
  – Polite and clear, with examples or reference links
  – Honest about unknown information, suggesting alternatives or additional resources
  – Concise, around 300 characters
Please respond in English.
`
};

// 2) Few‑Shot Examples: 자주 묻는 질문 예시
const FEW_SHOT_EXAMPLES = {
  ko: [
    { role: 'user',    content: 'Hyun Lee는 무슨 연구를 해?' },
    { role: 'assistant', content: 'Hyun Lee는 Human–AI Interaction과 LLM 기반 에이전트를 주로 연구하고 있습니다.' },

    { role: 'user',    content: '왜 산업디자인 학과에 진학했어?' },
    { role: 'assistant', content: '산업디자인 학과는 산업 현장과 밀접해 빠른 프로토타이핑부터 배포까지 전 과정을 경험할 수 있기 때문이며, AI Experience Lab의 연구 방향과도 잘 맞았습니다.' },
  ],
  en: [
    { role: 'user',    content: 'What research does Hyun Lee do?' },
    { role: 'assistant', content: 'Hyun Lee mainly researches Human-AI Interaction and LLM-based agents.' },

    { role: 'user',    content: 'Why did you pursue Industrial Design for your Master\'s?' },
    { role: 'assistant', content: 'The Industrial Design department is closely connected to industry, allowing experience in the entire process from rapid prototyping to deployment, and it aligned well with the research direction of the AI Experience Lab.' },
  ]
};

// 기본 캐시 응답
const CACHED_RESPONSES = {
  ko: {
    // 인사
    "안녕":            "안녕하세요! 무엇을 도와드릴까요?",
    "반가워":          "반갑습니다! 어떤 정보를 찾으시나요?",

    // 신상/경력
    "hyun lee":       "Hyun Lee는 KAIST AI Experience Lab 산업디자인 석사과정 학생이며, 이화여대 컴퓨터공학 학사 출신입니다.",
    "전공":            "학부 전공은 컴퓨터공학이고, 산업디자인 석사과정을 통해 Human–AI Interaction을 연구하고 있어요.",
    "경력":            "두 번의 교환학생(프랑스·네덜란드), 박물관 도슨트, AI 스터디 클럽 활동 등의 경험이 있습니다.",

    // 연구
    "연구 분야":      "연구 분야는 Human–AI Interaction과 LLM 기반 에이전트 디자인 및 개발입니다.",

    // 기술·툴
    "스킬":            "Python, NumPy, Pandas, JavaScript, React, C 등을 다룰 수 있습니다.",
    "툴":              "Notion, Figma, PowerPoint, Excel, Word, 한글, Slack을 사용할 수 있습니다.",

    // 프로젝트
    "프로젝트":        "미디어 인터랙션 디자인, 데이터 분석·시각화, 웹/안드로이드 챗봇, VR/AR 등 다양한 프로젝트를 수행했습니다.",

    // 공부 동기
    "컴퓨터공학과":     "컴퓨터공학과를 전공으로 선택한 계기는 프로그래밍에 흥미가 있었고 인공지능에 대해 더 공부하고자 했기 때문입니다.",
    "산업디자인":  "산업디자인 학과는 산업 현장과 밀접해 빠른 프로토타이핑·배포 과정을 반복하며 실제 결과물을 만드는 과정이 매력적이었고, AI Experience Lab의 연구실과 관심 분야가 일치해서 지원했습니다.",

    // 취미
    "취미":            "수영하기, 그림 그리기, 전시 관람, 강아지 산책, 영화 보기, 음악 듣기를 즐깁니다.",

    // 성격
    "성격":            "MBTI는 INTP이며, 50~60% 정도로 극단적이지 않은 차분하고 진중한 성격입니다. 내향적이지만 새로운 장소와 사람을 만나는 걸 좋아해요.",
    "mbti":            "Hyun의 MBTI는 INTP로, 논리적이고 분석적인 성향을 가지고 있습니다.",

    // 연락처
    "연락":            "이메일 hyunini0408@gmail.com, 전화 +82 10-8914-8469 로 연락 주세요.",
    "github":          "GitHub: https://github.com/hyuni0316",
    "linkedin":        "LinkedIn: https://www.linkedin.com/in/hyun-lee-08523a283/",
    "instagram":       "Instagram: @hyun__ini",

    // 출판물
    "prompirit":       "Prompirit: Automatic Prompt Engineering Assistance for Improving AI-Generated Art Reflecting User Emotion (IRI 2024 accepted)",
    "scas":            "SCAS: Synthetic Customer Agent System for Enterprise Utilizing Large-Scale In-depth Lifestyle Survey (UIST 2025 submitted)",

    // 동적 정보
    "현재 시간":       () => `현재 시각은 ${new Date().toLocaleTimeString('ko-KR')} 입니다.`,
    "오늘 날짜":       () => `오늘은 ${new Date().toLocaleDateString('ko-KR')} 입니다.`,
    
    // 언어 변경
    "영어로":          "Switching to English mode.",
    "english":         "Switching to English mode."
  },
  en: {
    // Greetings
    "hello":          "Hello! I'm an AI agent representing Hyun Lee. How can I help you?",
    "hi":             "Hi there! What information are you looking for?",

    // Information
    "name":          "Hyun Lee",
    "date of birth": "2001.03.16",
    "contact":        "hyunini0408@kaist.ac.kr, hyunini0408@gmail.com, +82 10-8914-8469",
    "address":        "Seoul, Daejeon",

    // Background/Career
    "hyun lee":       "Hyun Lee is a Master's student in Industrial Design at KAIST AI Experience Lab and has a Bachelor's in Computer Science from Ewha Womans University.",
    "major":          "Hyun's undergraduate major was Computer Science, and now she's researching Human-AI Interaction through her Master's in Industrial Design.",
    "experience":     "Hyun has experience as an exchange student (France & Netherlands), museum docent, and AI study club activities.",

    // Research
    "research":       "Her research areas are Human-AI Interaction and LLM-based agent design and development.",

    // Skills/Tools
    "skills":         "Hyun can work with Python, NumPy, Pandas, JavaScript, React, C, and more.",
    "tools":          "She uses Notion, Figma, PowerPoint, Excel, Word, Hangul, and Slack.",

    // Projects
    "projects":       "Hyun has worked on various projects including media interaction design, data analysis/visualization, web/Android chatbots, and VR/AR.",

    // Study motivation
    "computer science": "Hyun chose Computer Science as her major because she was interested in programming and wanted to study more about artificial intelligence.",
    "industrial design": "The Industrial Design department is closely connected to industry, allowing experience in rapid prototyping and deployment processes, and it aligned well with the research interests of the AI Experience Lab.",

    // Hobbies
    "hobbies":        "Hyun enjoys swimming, drawing, visiting exhibitions, walking dogs, watching movies, and listening to music.",

    // Personality
    "personality":    "Her MBTI is INTP at 50-60%, indicating a balanced, calm, and serious personality. Though introverted, she enjoys meeting new places and people.",
    "mbti":           "Hyun's MBTI is INTP, showing logical and analytical tendencies.",

    // Contact
    "contact":        "You can reach Hyun at email hyunini0408@gmail.com or phone +82 10-8914-8469.",
    "github":         "GitHub: https://github.com/hyuni0316",
    "linkedin":       "LinkedIn: https://www.linkedin.com/in/hyun-lee-08523a283/",
    "instagram":      "Instagram: @hyun__ini",

    // Publications
    "prompirit":      "Prompirit: Automatic Prompt Engineering Assistance for Improving AI-Generated Art Reflecting User Emotion (IRI 2024 accepted)",
    "scas":           "SCAS: Synthetic Customer Agent System for Enterprise Utilizing Large-Scale In-depth Lifestyle Survey (UIST 2025 submitted)",

    // Dynamic information
    "current time":   () => `The current time is ${new Date().toLocaleTimeString('en-US')}.`,
    "today's date":   () => `Today is ${new Date().toLocaleDateString('en-US')}.`,
    
    // Language change
    "korean":         "한국어 모드로 전환합니다.",
    "한국어":          "한국어 모드로 전환합니다."
  }
};

const Agent = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '안녕하세요! 저는 Hyun을 대신하는 AI 에이전트입니다. 무엇을 도와드릴까요?' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [language, setLanguage] = useState('ko'); // 'ko' 또는 'en'
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  
  // API 호출 사이의 최소 시간 간격 (밀리초)
  const MIN_REQUEST_INTERVAL = 3000; // 3초

  // API 키 환경변수에서 가져오기
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

  // 채팅창 스크롤 체크
  useEffect(() => {
    const checkScrollPosition = () => {
      if (!messagesContainerRef.current) return;
      
      const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollButton(!isNearBottom);
    };

    // 스크롤 이벤트 리스너 등록
    const container = messagesContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
    }

    // 새 메시지가 추가될 때 스크롤 위치 확인
    checkScrollPosition();

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, [messages]);

  // 새 메시지가 추가될 때 스크롤 다운
  useEffect(() => {
    if (!showScrollButton) {
      scrollToBottom();
    }
  }, [messages, showScrollButton]);

  // API 키 확인
  useEffect(() => {
    if (!API_KEY) {
      console.error('API 키가 설정되지 않았습니다. 환경변수를 확인하세요.');
    }
  }, [API_KEY]);

  // 토스트 메시지 표시
  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 3000);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 요청 제한 확인
  const isRateLimited = () => {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    return timeSinceLastRequest < MIN_REQUEST_INTERVAL;
  };

  // 언어 전환 확인
  const checkLanguageSwitch = (input) => {
    const normalizedInput = input.toLowerCase().trim();
    
    if (language === 'ko' && (normalizedInput.includes('영어로') || normalizedInput.includes('english'))) {
      setLanguage('en');
      return true;
    } else if (language === 'en' && (normalizedInput.includes('korean') || normalizedInput.includes('한국어'))) {
      setLanguage('ko');
      return true;
    }
    
    return false;
  };

  // 캐시된 응답 찾기
  const findCachedResponse = (input) => {
    // 정확한 키 확인
    if (messageCache.has(input)) {
      return messageCache.get(input);
    }
    
    // 기본 캐시 응답 확인
    const normalizedInput = input.toLowerCase().trim();
    const currentCache = CACHED_RESPONSES[language];
    
    for (const [key, value] of Object.entries(currentCache)) {
      if (normalizedInput.includes(key.toLowerCase())) {
        // 함수인 경우 실행, 문자열인 경우 그대로 반환
        return typeof value === 'function' ? value() : value;
      }
    }
    
    return null;
  };

  // 메시지 전송 함수
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    // API 키 체크
    if (!API_KEY) {
      showToastMessage('API 키가 설정되지 않았습니다');
      return;
    }
    
    // 사용자 메시지 추가
    const newUserMessage = { role: 'user', content: userInput };
    setMessages(prev => [...prev, newUserMessage]);
    
    const currentInput = userInput.trim();
    setUserInput('');
    setIsLoading(true);
    
    // 언어 전환 확인
    const isLanguageSwitched = checkLanguageSwitch(currentInput);
    if (isLanguageSwitched) {
      const welcomeMessage = language === 'en' 
        ? "I'm an AI agent representing Hyun Lee. How can I help you?" 
        : "무엇을 도와드릴까요?";
        
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: welcomeMessage
        }]);
        setIsLoading(false);
      }, 500);
      return;
    }
    
    // 캐시된 응답 확인
    const cachedResponse = findCachedResponse(currentInput);
    if (cachedResponse) {
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: cachedResponse 
        }]);
        setIsLoading(false);
      }, 500); // 자연스러운 느낌을 위한 약간의 지연
      return;
    }
    
    // 요청 제한 확인
    if (isRateLimited()) {
      const limitMessage = language === 'ko'
        ? '죄송합니다, 메시지를 너무 빠르게 보내고 있습니다. 잠시 후 다시 시도해주세요.'
        : 'Sorry, you are sending messages too quickly. Please try again in a moment.';
        
      showToastMessage(language === 'ko' 
        ? '메시지를 너무 빠르게 보내고 있습니다' 
        : 'Sending messages too quickly');
        
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: limitMessage
      }]);
      setIsLoading(false);
      return;
    }
    
    // 현재 시간 기록
    setLastRequestTime(Date.now());
    
    try {
      const apiMessages = [
        { role: 'system', content: SYSTEM_PROMPT[language] },
        ...FEW_SHOT_EXAMPLES[language],
        ...messages.map(msg => ({ role: msg.role, content: msg.content })),
        { role: 'user', content: currentInput }
      ];
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: apiMessages,
          temperature: 0.7,
          max_tokens: 500
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `상태 코드: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const assistantResponse = data.choices[0].message.content;
        
        // 응답 캐싱 (5단어 이상의 질문에 대해서만)
        if (currentInput.split(' ').length >= 2) {
          messageCache.set(currentInput, assistantResponse);
        }
        
        // AI 응답 추가
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: assistantResponse
        }]);
      } else {
        console.error('API 응답 형식 오류:', data);
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: language === 'ko' 
            ? '죄송합니다, 응답을 처리하는 중 오류가 발생했습니다.' 
            : 'Sorry, an error occurred while processing the response.'
        }]);
      }
    } catch (error) {
      console.error('API 호출 오류:', error);
      
      // 에러 메시지 맞춤화
      let errorMessage = language === 'ko'
        ? '죄송합니다, 연결 중 오류가 발생했습니다.'
        : 'Sorry, an error occurred during connection.';
      
      if (error.message.includes('429') || error.message.includes('Too Many Requests')) {
        errorMessage = language === 'ko'
          ? '죄송합니다, 현재 API 요청이 너무 많습니다. 잠시 후 다시 시도해주세요.'
          : 'Sorry, there are too many API requests currently. Please try again later.';
          
        showToastMessage(language === 'ko'
          ? 'API 요청 제한에 도달했습니다. 잠시 후 다시 시도해주세요.'
          : 'API request limit reached. Please try again later.');
      } else if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        errorMessage = language === 'ko'
          ? '죄송합니다, API 인증에 문제가 있습니다.'
          : 'Sorry, there is an issue with API authentication.';
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // 언어 전환 버튼 클릭 핸들러
  const handleLanguageToggle = () => {
    const newLanguage = language === 'ko' ? 'en' : 'ko';
    setLanguage(newLanguage);
    
    const welcomeMessage = newLanguage === 'ko' 
      ? '한국어 모드로 전환했습니다. 무엇을 도와드릴까요?' 
      : 'Switched to English mode. How can I help you?';
      
    setMessages(prev => [...prev, { 
      role: 'assistant', 
      content: welcomeMessage
    }]);
  };

  // 채팅창이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="agent-chat-container">
      <div className="agent-chat-header">
        <h3>Hyun Agent</h3>
        <div className="header-controls">
          <button 
            onClick={handleLanguageToggle} 
            className="language-toggle-button"
            aria-label={language === 'ko' ? 'Switch to English' : '한국어로 전환'}
          >
            {language === 'ko' ? 'EN' : 'KO'}
          </button>
          <button onClick={onClose} className="close-button">
            <IoClose />
          </button>
        </div>
      </div>
      
      <div className="agent-chat-messages" ref={messagesContainerRef}>
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`message ${message.role === 'user' ? 'user-message' : 'agent-message'}`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="message agent-message loading">
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {showScrollButton && (
        <button 
          className="scroll-bottom-button visible" 
          onClick={scrollToBottom}
          aria-label="스크롤 아래로"
        >
          <IoChevronDown />
        </button>
      )}
      
      <div className={`toast-message ${toast.show ? 'show' : ''}`}>
        {toast.message}
      </div>
      
      <form onSubmit={handleSendMessage} className="agent-chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder={language === 'ko' ? '메시지를 입력하세요...' : 'Type a message...'}
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading || !userInput.trim()}>
          <IoSend />
        </button>
      </form>
    </div>
  );
};

export default Agent;
