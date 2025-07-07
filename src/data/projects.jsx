import { FaPython, FaPhp, FaReact, FaHtml5, FaJs, FaGitAlt, FaDocker, FaCloud } from 'react-icons/fa';
import { SiFlask, SiMysql, SiTailwindcss, SiPostgresql } from 'react-icons/si';

export const technologies = [
  { id: 'python', icon: <FaPython />, name: 'Python', color: '#3776AB' },
  { id: 'php', icon: <FaPhp />, name: 'PHP', color: '#777BB4' },
  { id: 'react', icon: <FaReact />, name: 'React', color: '#61DAFB' },
  { id: 'js', icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
  { id: 'postgresql', icon: <SiPostgresql />, name: 'PostgreSQL', color: '#4169E1' },
  { id: 'docker', icon: <FaDocker />, name: 'Docker', color: '#2496ED' },
  { id: 'cloud', icon: <FaCloud />, name: 'Cloud & DevOps', color: '#FF9900' }, // AWS orange for cloud
  { id: 'git', icon: <FaGitAlt />, name: 'Git', color: '#F05032' },
];

export const projects = {
  python: [
    {
      title: 'XPlicit Automation Bot Suite',
      description: 'Professional experience developing a suite of Python bots for XPlicit, including a text-to-speech AI bot for team communication, to automate tasks, manage workflows, and calculate custom metrics. This project is under an NDA and cannot be publicly shared.',
      tech: [<FaPython key="py" />],
      // No link due to NDA
    },
    {
      title: 'Kinkyland Assistant Bot',
      description: 'A well-structured Python bot for community management, featuring modular handlers for commands and events. Open-source and available on GitHub.',
      tech: [<FaPython key="py" />],
      link: 'https://github.com/LianBellocchio/kkl-assistant-bot',
    },
    {
      title: 'FRAGSTATS.GG - Full-Stack Platform (Original)',
      description: 'Full-stack platform for real-time Counter-Strike statistics. Features a Python backend for data processing and a JavaScript (Vanilla) frontend for dynamic visualization.',
      tech: [<FaPython key="py" />, <SiFlask key="fl" />, <FaJs key="js" />],
      link: 'https://github.com/LianBellocchio/FRAGSTATS.GG',
    },
  ],
  php: [
    {
      title: 'School Website Final Project',
      description: 'Led the development of the school\'s official website, implementing responsive designs and backend integrations with PHP and PostgreSQL.',
      tech: [<FaPhp key="php" />, <SiPostgresql key="pg" />],
      link: 'https://github.com/LianBellocchio/PROYECTO',
    },
    {
      title: 'E-commerce API',
      description: 'A RESTful API for an e-commerce platform, managing products, users, and orders. Built with PHP.',
      tech: [<FaPhp key="php" />, <SiMysql key="mysql" />],
      link: 'https://github.com/LianBellocchio/PERFUMERIA-API',
    },
  ],
  react: [
    {
      title: 'FRAGSTATS.GG - Frontend (React & Tailwind)',
      description: 'Reimagining the FragStats.GG frontend using React and modern Tailwind CSS for a cleaner, more performant, and responsive user experience.',
      tech: [<FaReact key="react" />, <SiTailwindcss key="tw" />, <FaJs key="js" />],
      link: 'https://github.com/LianBellocchio/fragstats-react-front',
    },
  ],
  js: [],
  postgresql: [],
  docker: [],
  cloud: [
    {
      title: 'XPlicit Bot Suite Deployment (AWS EC2)',
      description: 'Managed the deployment and continuous operation of the XPlicit bot suite on AWS EC2 instances, ensuring high availability and scalability for critical automation tasks.',
      tech: [<FaCloud key="cloud" />],
      // No link due to NDA
    },
  ],
  git: [
    {
      title: 'Collaborative Projects',
      description: 'Used Git for version control in all my projects, managing branches, pull requests, and merges in team environments.',
      tech: [<FaGitAlt key="git" />],
      link: 'https://github.com/LianBellocchio',
    }
  ],
};