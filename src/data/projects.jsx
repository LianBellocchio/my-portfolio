import { FaPython, FaPhp, FaReact, FaJs, FaGitAlt, FaCloud } from 'react-icons/fa';
import { SiFlask, SiMysql, SiTailwindcss, SiPostgresql } from 'react-icons/si';

export const technologies = [
  { id: 'python', icon: <FaPython />, name: 'Python', color: '#3776AB' },
  { id: 'php', icon: <FaPhp />, name: 'PHP', color: '#777BB4' },
  { id: 'react', icon: <FaReact />, name: 'React', color: '#61DAFB' },
  { id: 'js', icon: <FaJs />, name: 'JavaScript', color: '#F7DF1E' },
  { id: 'cloud', icon: <FaCloud />, name: 'Cloud & DevOps', color: '#FF9900' }, // AWS orange for cloud
  { id: 'git', icon: <FaGitAlt />, name: 'Git', color: '#F05032' },
];

export const projects = {
  python: [
    {
      title: 'XPlicit Automation Bot Suite',
      description: 'projects.python.xplicit',
      tech: [<FaPython key="py" />],
      // No link due to NDA
    },
    {
      title: 'Automation and State Recognition Bot',
      description: 'projects.python.automationBot',
      tech: [<FaPython key="py" />],
      // No link due to NDA
    },
    {
      title: 'Kinkyland Assistant Bot',
      description: 'projects.python.kinkyland',
      tech: [<FaPython key="py" />],
      link: 'https://github.com/LianBellocchio/kkl-assistant-bot',
    },
    {
      title: 'FRAGSTATS.GG - Full-Stack Platform (Original)',
      description: 'projects.python.fragstats',
      tech: [<FaPython key="py" />, <SiFlask key="fl" />, <FaJs key="js" />],
      link: 'https://github.com/LianBellocchio/FRAGSTATS.GG',
    },
  ],
  php: [
    {
      title: 'School Website Final Project',
      description: 'projects.php.school',
      tech: [<FaPhp key="php" />, <SiPostgresql key="pg" />],
      link: 'https://github.com/LianBellocchio/PROYECTO',
    },
    {
      title: 'E-commerce API',
      description: 'projects.php.ecommerce',
      tech: [<FaPhp key="php" />, <SiMysql key="mysql" />],
      link: 'https://github.com/LianBellocchio/PERFUMERIA-API',
    },
  ],
  react: [
    {
      title: 'FRAGSTATS.GG - Frontend (React & Tailwind)',
      description: 'projects.react.fragstats',
      tech: [<FaReact key="react" />, <SiTailwindcss key="tw" />, <FaJs key="js" />],
      link: 'https://github.com/LianBellocchio/fragstats-react-front',
    },
  ],
  js: [],
  cloud: [
    {
      title: 'XPlicit Bot Suite Deployment (AWS EC2)',
      description: 'projects.cloud.xplicit',
      tech: [<FaCloud key="cloud" />],
      // No link due to NDA
    },
  ],
  git: [
    {
      title: 'Collaborative Projects',
      description: 'projects.git.collaborative',
      tech: [<FaGitAlt key="git" />],
      link: 'https://github.com/LianBellocchio',
    }
  ],
};