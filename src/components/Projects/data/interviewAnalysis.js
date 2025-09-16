import dad1Image from '../../../assets/dad1.png';
import dad2Image from '../../../assets/dad2.png';
import dad3Image from '../../../assets/dad3.png';

export const interviewAnalysisProject = {
  id: 3,
  title: 'Understanding What Defines a Good or Bad Interview',
  description: '',
  course: 'Course: Data Analytics for Designers (2024)',
  technologies: ['Data Analysis', 'Python', 'React'],
  link: 'https://hyuni0316.github.io/dad/',
  // fullDescription: 'I used LLMs to analyze unstructured interview data and present the results through web‑based visualizations. This enables us to investigate differences and patterns across best, normal, and worst interview scenarios and to provide guidelines for successful interviewing.',
  projectObjective: [
    'Experiment various methods for quantitatively analyzing raw interview texts and explore how raw interview texts can be analyzed using LLM.',
    'Identify and analyze the key factors that determine good and bad interviews and explore the characteristics of both effective and ineffective interview structure.'
  ],
  targetUser: 'Qualitative Interview Designers, AI Interviewer Developers',
  dataDescription: 'The interview dataset is categorized into Best, Normal, and Worst cases. It includes speaker, text data, counts (sentences, words, characters), sentiment, interviewer skill types, interviewee response types and interview sections. The key attributes were extracted based on the interview raw data through ChatGPT-4o.',
  prototypeDescription: 'Web based Technical Report (Scroll & Hover)',
  images: [dad1Image, dad2Image, dad3Image]
};
