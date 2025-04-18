import React, { useState } from 'react';
import './Projects.css';
import dad1Image from '../../assets/dad1.png';
import dad2Image from '../../assets/dad2.png';
import dad3Image from '../../assets/dad3.png';
import ResearchMethodologyImage from '../../assets/Research Methodology Poster.png';
import InsideAndOutImage from '../../assets/mid1.png';
import InsideAndOutImage2 from '../../assets/mid2.png';
import FoopyImage from '../../assets/foopy\'s choice.png';
import FreshmenRPGImage from '../../assets/campus game.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  const graduateProjects = [
    {
      id: 0,
      title: 'Inside and Out',
      description: '"INSIDE and OUT" integrates tangible objects and dynamic shadows to represent emotions. Using real-time projection mapping, object detection, and voice interaction, the system enables users to explore emotions in a multidimensional way, seamlessly connecting conceptual feelings with physical interaction and redefining sentimental engagement.',
      course: 'Media Interaction Design',
      technologies: ['Unity', 'C#', 'OpenCV'],
      link: 'https://www.youtube.com/watch?v=EPHZbuw7huo',
      fullDescription: 'Emotional interactions with AI are often limited to text-based interfaces, offering little physical or immersive engagement. "INSIDE and OUT" overcomes this by integrating tangible objects and dynamic shadows to represent emotions like curiosity, fear, anger, and love. Using real-time projection mapping, object detection, and voice interaction, the system enables users to explore emotions in a multidimensional way, seamlessly connecting conceptual feelings with physical interaction and redefining sentimental engagement.',
      images: [InsideAndOutImage, InsideAndOutImage2]
    },
    {
      id: 1,
      title: 'Understanding What Defines a Good or Bad Interview',
      description: 'I used LLMs to analyze unstructured interview data and present the results through web‑based visualizations. This enables us to investigate differences and patterns across best, normal, and worst interview scenarios and to provide guidelines for successful interviewing.',
      course: 'Data Analytics for Designers',
      technologies: ['Python', 'React'],
      link: 'https://hyuni0316.github.io/dad/',
      // fullDescription: 'Understanding What Defines a Good or Bad Interview: Analyzing Differences and Patterns Across Best, Normal, and Worst Interview Scenarios',
      projectObjective: [
        'Experiment various methods for quantitatively analyzing raw interview texts and explore how raw interview texts can be analyzed using LLM.',
        'Identify and analyze the key factors that determine good and bad interviews and explore the characteristics of both effective and ineffective interview structure.'
      ],
      targetUser: 'Qualitative Interview Designers, AI Interviewer Developers',
      dataDescription: 'The interview dataset is categorized into Best, Normal, and Worst cases. It includes speaker, text data, counts (sentences, words, characters), sentiment, interviewer skill types, interviewee response types and interview sections. The key attributes were extracted based on the interview raw data through ChatGPT-4o.',
      prototypeDescription: 'Web based Technical Report (Scroll & Hover)',
      images: [dad1Image, dad2Image, dad3Image]
    },
    {
      id: 2,
      title: 'Exploring Factors Influencing Interviews Through Best, Normal, and Worst Scenarios',
      description: 'Quantitatively and statistically analyzed interview scripts using emotion distribution, linguistic features, interviewer skills, and response patterns. This study reveals the structural differences between successful and unsuccessful interviews.',
      course: 'Research Methodology',
      technologies: ['SPSS', 'Python'],
      // link: 'https://github.com/hyunlee/nlu-platform',
      fullDescription: 'Using SPSS and Python, I conducted statistical data analysis and created a poster.',
      images: [ResearchMethodologyImage]
    },
  ];

  const undergraduateProjects = [
    {
      id: 3,
      title: 'Foopy\'s Choice: Weather-based Food Recommendation Chatbot',
      description: 'Developed an Android chatbot application that recommends food based on current weather conditions. Users can speak about the weather, and the app suggests suitable food with videos, nutritional information, and recipes.',
      technologies: ['Java', 'Android Studio', 'wit.ai API'],
      link: 'https://github.com/hyuni0316/Foopys-Choice',
      videoLink: 'https://youtube.com/shorts/olwkuIgV_4w?feature=share',
      fullDescription: 'Developed "Foopy\'s Choice," an Android app that recommends food based on daily weather conditions. The application features a chatbot interface where users can verbally describe the current weather, and the app responds with food recommendations suited to those conditions.\n\nThe app provides users with related videos, nutritional information, and recipes for the recommended foods. I utilized the wit.ai API to train the chatbot specifically for this application\'s requirements, enhancing the natural language understanding capabilities.',
      images: [FoopyImage]
    },
    {
      id: 4,
      title: 'Campus Building Location Learning RPG Game for Freshmen',
      description: 'Created a turn-based RPG mobile game to help freshmen learn campus building locations in an engaging way. Players battle at key campus locations, collect items, and defeat a final boss to achieve a successful freshman life.',
      course: 'Virtual Reality',
      technologies: ['Unity 3D', 'C#', 'AR'],
      link: 'https://github.com/hyuni0316/freshmen-RPG',
      fullDescription: 'Developed a mobile turn-based RPG game designed to help new university students learn campus building locations in an easy and entertaining way.\n\nPlayers engage in regular battles at key campus locations, collecting items to prepare for the final boss battle, ultimately achieving a successful freshman experience. Students interact with the game by scanning AR stickers placed throughout campus buildings.\n\nThe game incorporates a turn-based RPG system for regular battles, making the learning process enjoyable, while boss battles feature 3D monster characters in augmented reality format.',
      images: [FreshmenRPGImage]
    }
  ];

  // 프로젝트 모달 열기
  const openProjectModal = (project) => {
    setSelectedProject(project);
  };

  // 프로젝트 모달 닫기
  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  // 프로젝트 목록을 렌더링하는 함수
  const renderProjects = (projectsList) => {
    return (
      <div className="projects-grid">
        {projectsList.map(project => (
          <div key={project.id} className="project-card">
            <h3 className="project-title">{project.title}</h3>
            {project.course && <p className="project-course">Course: {project.course}</p>}
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-buttons">
              <button
                className="project-link"
                onClick={() => openProjectModal(project)}
              >
                View Details
              </button>
              {project.link && (
                <a
                  href={project.link}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Link
                </a>
              )}
              {/* {project.videoLink && (
                <a
                  href={project.videoLink}
                  className="project-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Demo
                </a>
              )} */}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <h2 className="section-title">Projects</h2>
        
        <div className="projects-category">
          <h3 className="category-title">Graduate Projects</h3>
          {renderProjects(graduateProjects)}
        </div>
        
        <div className="projects-category">
          <h3 className="category-title">Undergraduate Projects</h3>
          {renderProjects(undergraduateProjects)}
        </div>

        {/* 프로젝트 모달 */}
        {selectedProject && (
          <div className="project-modal-overlay" onClick={closeProjectModal}>
            <div className="project-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close-btn" onClick={closeProjectModal}>×</button>
              <h2 className="modal-title">{selectedProject.title}</h2>
              
              {selectedProject.course && (
                <p className="modal-course">Course: {selectedProject.course}</p>
              )}
              
              <div className="modal-tech">
                {selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              {selectedProject.id === 1 ? (
                <div className="modal-structured-content">
                  {/* 첫 번째 프로젝트의 구조화된 내용 */}
                  <h3 className="modal-subtitle">{selectedProject.fullDescription}</h3>

                  <div className="modal-section">
                    <h4>Project Objective</h4>
                    <ul>
                      {selectedProject.projectObjective.map((objective, idx) => (
                        <li key={idx}>{objective}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="modal-section">
                    <h4>Target User</h4>
                    <p>{selectedProject.targetUser}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Data</h4>
                    <p>{selectedProject.dataDescription}</p>
                  </div>

                  <div className="modal-section">
                    <h4>Prototype</h4>
                    <p>{selectedProject.prototypeDescription}</p>
                  </div>

                  <div className="modal-images">
                    {selectedProject.images.map((image, idx) => (
                      <div key={idx} className="modal-image-container">
                        <img src={image} alt={`${selectedProject.title} screenshot ${idx + 1}`} className="modal-image" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="modal-description">
                  {/* 다른 프로젝트는 기존 방식으로 표시 */}
                  {selectedProject.fullDescription.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                  
                  {/* 이미지가 있는 경우 표시 */}
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <div className="modal-images">
                      {selectedProject.images.map((image, idx) => (
                        <div key={idx} className="modal-image-container">
                          <img src={image} alt={`${selectedProject.title} screenshot ${idx + 1}`} className="modal-image" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div className="modal-actions">
                {selectedProject.link && (
                  <a 
                    href={selectedProject.link} 
                    className="modal-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>
                )}
                {/* {selectedProject.videoLink && (
                  <a 
                    href={selectedProject.videoLink} 
                    className="modal-link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Demo Video
                  </a>
                )} */}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects; 