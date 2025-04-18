import React, { useState } from 'react';
import './Publications.css';
import prompirit from '../../assets/prompirit.png';
import prompirit2 from '../../assets/prompirit2.png';
import SCAS from '../../assets/SCAS.png';
// import SCASVideo from '../../assets/UIST_SCAS.mp4';

const Publications = () => {
  const [expandedId, setExpandedId] = useState(null);

  const publications = [
    {
      id: 1,
      title: 'Prompirit: Automatic Prompt Engineering Assistance for Improving AI-Generated Art Reflecting User Emotion',
      authors: 'Hannah Kim (co‑first author), <strong>Hyun Lee (co‑first author)</strong>, Sunyu Pang (co‑first author), Uran Oh',
      conference: 'Accepted at IEEE International Conference on Information Reuse and Integration (IRI), 2024',
      link: 'https://ieeexplore.ieee.org/document/10703854',
      projectPage: 'https://sites.google.com/view/prompirit/',
      github: 'https://github.com/AnT-Prompirit',
      image: prompirit,
      image2: prompirit2,
      abstract: "Recently, text-to-image generative Artificial Intelligence (AI) models have demonstrated their ability to generate high-quality art with text prompts. However, generative AI is still incapable of creating images that precisely reflect emotion. We propose Prompirit, an automatic prompt engineering assistance for improving AI-generated art in terms of expressiveness of emotion and aesthetics. We explored various approaches to refine users' free-form text input by incorporating user emotion and style modifiers. Statistical analysis and user evaluation with 100 respondents showed that Prompirit significantly improved the alignment of image-emotion and the aesthetics of the generated image while precisely conveying the content of the original input text. Based on the results, we provide implications for creating affective images."
    },
    {
      id: 2,
      title: 'SCAS: Synthetic Customer Agent System for Enterprise Utilizing Large-Scale In-depth Lifestyle Survey',
      authors: 'Hyun Seung Moon (co‑first author), <strong>Hyun Lee (co‑first author)</strong>, Jinwoo Jeong, Kunwoo Lee, Seowon Lee, Jin Jeong, Seon Gyeom Kim, JaeYoung Choi, Minsun Kim, Ji-Dong Yim, Tak Yeon Lee',
      conference: 'Submitted to UIST 2025',
      // link: 'https://example.com/publication2',
      youtube: 'https://youtu.be/7noxgP8lDq4',
      image: SCAS,
      // video: SCASVideo,
      abstract: "In customer research, personas provide key insights related to the target customer groups' characteristics, interests, and behaviors. However, traditional persona generation requires significant expertise and can be time-consuming and subjective, making it difficult to generate multiple personas in a scalable way. Moreover, since the traditional persona is a static representation of a potential customer group, it becomes challenging to quickly access the desired information and insights. Recent advances in generative AI and large language models (LLMs) offer the possibility of automating this process by introducing synthetic customers designed to simulate real customer behaviors and preferences.\n\nIn this study, we introduce SCAS – Synthetic Customer Agent System – an interactive chat system that generates agents based on a large-scale, in-depth lifestyle survey of 4,000 respondents and facilitates conversational interactions with the generated Synthetic Customer Agents (SCAs). The system comprises three core components: 1) a visual summary that presents comprehensive demographic, personality, and lifestyle profiles, 2) the generation of SCAs representing a specific customer cluster, and 3) the creation of chat rooms that enable conversational interaction between users and these agents. This approach quickly creates realistic synthetic customer agents that provide deep and diverse insights through seamless conversational interactions.\n\nFirst, we conducted an offline evaluation to see how well the agent's responses represent real people. The results showed that their responses matched actual customer responses with an accuracy of up to 87%. Second, to verify the utility of the system, a four-month field study was conducted with 47 global enterprise practitioners, involving system usage analyses, surveys, and in-depth interviews. The study revealed that our system effectively represents each customer cluster, elicited unanticipated ideas, and can easily support qualitative research through conversational interaction. We also find that with more diverse SCA details and extended analytical capabilities, the system can be integrated in actual work environments across departments—from ideation to qualitative research."
    }
  ];

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // 미디어 렌더링 함수
  const renderMedia = (pub) => {
    const mediaItems = [];
    
    if (pub.image) {
      mediaItems.push(
        <div key="image" className="media-item">
          <img src={pub.image} alt={pub.title} className="publication-image" />
        </div>
      );
    }
    
    if (pub.image2) {
      mediaItems.push(
        <div key="image2" className="media-item">
          <img src={pub.image2} alt={`${pub.title} - additional image`} className="publication-image" />
        </div>
      );
    }
    
    if (pub.video) {
      mediaItems.push(
        <div key="video" className="media-item">
          <video 
            className="publication-video" 
            controls
            src={pub.video}
          >
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    
    if (mediaItems.length === 0) {
      return null;
    }
    
    return (
      <div className={`publication-media ${mediaItems.length > 1 ? 'multi-media' : ''}`}>
        {mediaItems}
      </div>
    );
  };

  return (
    <section className="publications-section" id="publications">
      <div className="publications-container">
        <h2 className="section-title">Publications</h2>
        <div className="publications-list">
          {publications.map(pub => (
            <div key={pub.id} className="publication-item">
              <h3 className="publication-title">
                {pub.link ? (
                  <a href={pub.link} target="_blank" rel="noopener noreferrer">
                    {pub.title}
                  </a>
                ) : (
                  pub.title
                )}
              </h3>
              <p className="publication-authors" dangerouslySetInnerHTML={{ __html: pub.authors }}></p>
              <p className="publication-conference">{pub.conference}</p>
              
              {expandedId === pub.id && (
                <div className="publication-expanded">
                  {renderMedia(pub)}
                  
                  <div className="publication-abstract">
                    <h4>Abstract</h4>
                    <p>{pub.abstract}</p>
                  </div>
                </div>
              )}
              
              <div className="publication-actions">
                <button 
                  className="action-button details-button" 
                  onClick={() => toggleExpand(pub.id)}
                >
                  {expandedId === pub.id ? 'Hide details' : 'View details'}
                </button>
                
                {pub.projectPage && (
                  <a href={pub.projectPage} target="_blank" rel="noopener noreferrer" className="action-button link-button">
                    Paper
                  </a>
                )}
                
                {pub.github && (
                  <a href={pub.github} target="_blank" rel="noopener noreferrer" className="action-button link-button">
                    GitHub
                  </a>
                )}
                
                {pub.youtube && (
                  <a href={pub.youtube} target="_blank" rel="noopener noreferrer" className="action-button link-button">
                    Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Publications; 