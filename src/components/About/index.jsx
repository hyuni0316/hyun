import React, { useEffect, useState } from 'react';
import './About.css';
import { TypeAnimation } from 'react-type-animation';
import profileImage from '../../assets/profile.png';
import Agent from '../Agent';

const About = () => {
  const [titleFontSize, setTitleFontSize] = useState('3rem');
  const [subtitle2FontSize, setSubtitle2FontSize] = useState('2.3rem');
  const [isAgentOpen, setIsAgentOpen] = useState(false);
  const [showMoreNews, setShowMoreNews] = useState(0);

  // 화면 크기에 따라 글꼴 크기 동적 조정
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 480) {
        setTitleFontSize('1.8rem');
        setSubtitle2FontSize('1.5rem');
      } else if (window.innerWidth <= 768) {
        setTitleFontSize('2rem');
        setSubtitle2FontSize('1.5rem');
      } else {
        setTitleFontSize('3rem');
        setSubtitle2FontSize('2.3rem');
      }
    }

    // 초기 로드 시와 리사이즈 시 실행
    handleResize();
    window.addEventListener('resize', handleResize);
    
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Agent 채팅창 열기/닫기
  const toggleAgent = () => {
    setIsAgentOpen(prev => !prev);
  };

  // 더 많은 뉴스 보기 토글
  const toggleMoreNews = () => {
    // setShowMoreNews(prev => prev === 0 ? 1 : prev === 1 ? 2 : 0);
    setShowMoreNews(prev => prev > 0 ? 0 : 1);
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="Intro">
          <div className="intro-flex">
            <div className="profile-image-container">
              <div className="chat-bubble" onClick={toggleAgent}>
                Chat with my agent!
              </div>
              <img src={profileImage} alt="Hyun Lee" className="profile-image" onClick={toggleAgent} />
              <div className="social-icons">
                <a href="mailto:hyunini0408@gmail.com" title="Email">
                  <i className="fas fa-envelope"></i>
                </a>
                <a href="https://github.com/hyuni0316" target="_blank" rel="noopener noreferrer" title="GitHub">
                  <i className="fab fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/hyun-lee-08523a283/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://www.instagram.com/hyun__ini" target="_blank" rel="noopener noreferrer" title="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <div className="intro-content">
              <div className="hyun-container">
                <h1 className="hyun-title" style={{ 
                  fontSize: titleFontSize,
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: '#333'
                }}>Hi, I&apos;m Hyun Lee.</h1>
                <h1 className="hyun-title2" style={{ 
                  fontSize: subtitle2FontSize,
                  fontWeight: 600,
                  color: '#444',
                  marginBottom: '40px'
                }}>
                  I love to{' '}
                  <TypeAnimation
                    sequence={[
                      'design.',
                      3000,
                      // 'create.',
                      // 3000,
                      'develop.',
                      3000,
                      'research.',
                      3000,
                    ]}
                    wrapper="span"
                    cursor={true}
                    repeat={Infinity}
                    style={{ display: 'inline-block' }}
                  />
                </h1>
              </div>
              <div className="about-content">
                <div className="about-text">
                  <p>
                   Hi, I'm Hyun Lee, a Master's student at <a href="https://reflect9.github.io/ael/" target="_blank" rel="noopener noreferrer" className="highlight-text">AI Experience Lab</a>. 
                   My research explores <span className="highlight-text">human–AI interaction</span>, with a focus on designing <span className="highlight-text">LLM‑based agents</span>. 
                   I'm passionate about understanding how people perceive and interact with AI, 
                   and I strive to build user-centered AI systems.
                  </p>
                  <p>
                  With a background in computer science, 
                  I love building web applications and using data analysis and visualization to bring ideas to life through code.
                   I've also honed my creative problem‑solving skills and my UI/UX design skills through 
                   my industrial design studies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="news-section">
          <h3>Recent News</h3>
          <div className="education-timeline">

            <div className="education-item">
              <div className="education-date">2025.04.28</div>
              <div className="education-content">
                <div className="education-details">Attended CHI 2025 in Yokohama, Japan.</div>
              </div>
            </div>

            <div className="education-item">
              <div className="education-date">2025.04.10</div>
              <div className="education-content">
                <div className="education-details">Submitted a first-author paper on AI agents to UIST 2025.</div>
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-date">2024.09.01</div>
              <div className="education-content">
                <div className="education-details">Admission to KAIST AI Experience Lab: Master's program starting September 2024</div>
              </div>
            </div>
            
            
            {showMoreNews >= 1 && (
              <>
              <div className="education-item">
                <div className="education-date">2024.08.08</div>
                <div className="education-content">
                  <div className="education-details">Presented an accepted paper at the IEEE IRI conference in San Jose.</div>
                </div>
              </div>
              
              <div className="education-item">
                <div className="education-date">2024.06</div>
                <div className="education-content">
                  <div className="education-details">Undergraduate Research Project (Prompirit) Completion</div>
                </div>
              </div>

              </>
            )}
            
            {/* {showMoreNews >= 2 && (
              <>
                <div className="education-item">
                  <div className="education-date">2023.12</div>
                  <div className="education-content">
                    <div className="education-details">Graduate School Application Submission: KAIST AI Experience Lab</div>
                  </div>
                </div>

              </>
            )} */}
            
            <div className="show-more-container">
              <button className="show-more-button" onClick={toggleMoreNews}>
                {/* {showMoreNews === 0 ? "Show More" : showMoreNews === 1 ? "Show More" : "Close"} */}
                {showMoreNews === 0 ? "Show More" :  "Close"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="education-section">
          <h3>Education</h3>
          <div className="education-timeline">
            <div className="education-item">
              <div className="education-date">2024.09 - 2026.08</div>
              <div className="education-content">
                <div className="education-type">Master's Candidate</div>
                <div className="education-details"><a href="https://reflect9.github.io/ael/" target="_blank" rel="noopener noreferrer">AI Experience Lab</a> - <a href="https://id.kaist.ac.kr/" target="_blank" rel="noopener noreferrer">Industrial Design</a> - <a href="https://www.kaist.ac.kr/kr/" target="_blank" rel="noopener noreferrer">KAIST</a></div>
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-date">2020.03 - 2024.08</div>
              <div className="education-content">
                <div className="education-type">Bachelor Degree</div>
                <div className="education-details"><a href='https://myr.ewha.ac.kr/cse/index.do' target="_blank" rel="noopener noreferrer">Computer Science</a> - <a href="https://www.ewha.ac.kr/ewha/index.do" target="_blank" rel="noopener noreferrer">Ewha Womans University</a></div>
              </div>
            </div>
            
            {/* <div className="education-item">
              <div className="education-date">2020.03 - 2022.02</div>
              <div className="education-content">
                <div className="education-type"></div>
                <div className="education-details">Mechanical and Biomedical Engineering - <a href="https://www.ewha.ac.kr/ewha/index.do" target="_blank" rel="noopener noreferrer">Ewha Womans University</a></div>
              </div>
            </div> */}
          </div>
        </div>

        <div className="experience-section">
          <h3>Other Experiences</h3>
          <div className="education-timeline">
            {/* <div className="education-item">
              <div className="education-date">2024.08</div>
              <div className="education-content">
                <div className="education-type">Conference Presentation</div>
                <div className="education-details">🇺🇸 IEEE IRI (Information Reuse and Integration for Data Science) - San Jose, CA, USA</div>
              </div>
            </div> */}
          
             
            <div className="education-item">
              <div className="education-date">2024.02 - 2024.08</div>
              <div className="education-content">
                <div className="education-type">Museum Docent</div>
                <div className="education-details">🖼️ Volunteer Staff and Docent in Ewha Womans University Museum</div>
              </div>
            </div>

            <div className="education-item">
              <div className="education-date">2024.03 - 2024.06</div>
              <div className="education-content">
                <div className="education-type"> Club Activity</div>
                <div className="education-details">🤖 Euron - AI Paper Study Club</div>
              </div>
            </div>

            <div className="education-item">
              <div className="education-date">2023.07 - 2023.08</div>
              <div className="education-content">
                <div className="education-type">Exchange Program</div>
                <div className="education-details">🇫🇷 EPITA - School of Engineering and Computer Science, Paris, France</div>
                {/* <div className="education-details">• French Culture in Action</div>
                <div className="education-details">• Introduction to Data Science and Machine Learning</div>
                <div className="education-details">• Artificial Intelligence For Generative Art</div> */}
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-date">2023.05 - 2023.06</div>
              <div className="education-content">
                <div className="education-type">Alma Mater Visiting Ambassador</div>
                <div className="education-details">👩‍🏫 Visited my high school as a ambassador to promote Ewha Womans University</div>
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-date">2022.07 - 2022.08</div>
              <div className="education-content">
                <div className="education-type">Exchange Program</div>
                <div className="education-details">🇳🇱 Utrecht University, Netherlands</div>
                {/* <div className="education-details">• Dutch Culture: History & Art</div>
                <div className="education-details">• Dutch Art from Mesdag to Van Gogh and Mondrian</div> */}
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-date">2021.03 - 2022.03</div>
              <div className="education-content">
                <div className="education-type">Club Activity</div>
                <div className="education-details">🤖 humanpming - Python Programming and AI Projects Club</div>
              </div>
            </div>
            
            <div className="education-item">
              <div className="education-date">2018.03 - 2018.08</div>
              <div className="education-content">
                <div className="education-type">Volunteer Work</div>
                <div className="education-details">📖 Mathematics and English Tutoring for Elementary School Students in Disadvantaged Areas</div>
              </div>
            </div>
          </div>
        </div>

        
      </div>

      {/* Agent 채팅창 */}
      <Agent isOpen={isAgentOpen} onClose={() => setIsAgentOpen(false)} />
    </section>
  );
};

export default About; 