import React, { useState } from 'react';
import './Projects.css';
import { graduateProjects, undergraduateProjects } from './data';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

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
            {project.course && <p className="project-course">{project.course}</p>}
            <p className="project-description">{project.description}</p>
            <div className="project-tech">
              {project.technologies && project.technologies.map((tech, index) => (
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
                {selectedProject.technologies && selectedProject.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
              
              {selectedProject.id === 3? (
                <div className="modal-structured-content">
                  {/* 첫 번째 프로젝트의 구조화된 내용 */}
                  <h3 className="modal-subtitle">{selectedProject.fullDescription}</h3>

                  <div className="modal-section">
                    <h4>Project Objective</h4>
                    <ul>
                      {selectedProject.projectObjective && selectedProject.projectObjective.map((objective, idx) => (
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
                    {selectedProject.images && selectedProject.images.map((image, idx) => (
                      <div key={idx} className="modal-image-container">
                        <img src={image} alt={`${selectedProject.title} screenshot ${idx + 1}`} className="modal-image" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="modal-description">
                  {/* 다른 프로젝트는 기존 방식으로 표시 */}
                  {selectedProject.fullDescription && typeof selectedProject.fullDescription === 'string' && 
                    selectedProject.fullDescription.split('\n\n').map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))
                  }
                  
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