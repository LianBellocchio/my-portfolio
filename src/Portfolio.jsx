import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useAnimation } from 'framer-motion';
import { FaGithub, FaEnvelope, FaPython, FaReact, FaPhp, FaHtml5, FaCss3Alt, FaJs, FaGitAlt, FaDocker, FaCloud } from 'react-icons/fa';
import { SiFlask, SiMysql, SiTailwindcss, SiPostgresql, SiTypescript } from 'react-icons/si';
import heroBackground from './assets/backgroundhero.jpg';
import cvFile from './assets/cv.pdf';
import { technologies, projects } from './data/projects.jsx';
import { useLanguage } from './context/LanguageContext.jsx';

// Componentes auxiliares movidos fuera del componente principal
const ProjectCard = ({ proj, activeColor, t }) => (
  <div
    className="group bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10 transition-all duration-300 h-full flex flex-col hover:border-[var(--glow-color)] hover:shadow-[0_0_20px_-5px_var(--glow-color)] hover:-translate-y-1"
    style={{ '--glow-color': activeColor }}
  >
    <h4 className="text-xl font-bold text-white mb-2">{proj.title}</h4>
    <p className="text-gray-400 text-sm mb-4 leading-relaxed font-light flex-grow">{t(proj.description)}</p>
    <div className="flex gap-4 mb-4 text-2xl" style={{ color: activeColor }}>
      {proj.tech.map((icon, i) => <span key={i}>{icon}</span>)}
    </div>
    {proj.link && (
      <a href={proj.link} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold tracking-wide transition-colors duration-300 self-start text-[var(--glow-color)] group-hover:underline">
        {t('lab.viewProject')}
      </a>
    )}
  </div>
);

const EmptyState = ({ t }) => (
  <div className="md:col-span-2 flex items-center justify-center h-64 bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
    <p className="text-gray-500">{t('lab.emptyState')}</p>
  </div>
);

export default function Portfolio() {
  const { language, t, toggleLanguage } = useLanguage();
  const [activeTech, setActiveTech] = useState('python');
  const techRef = useRef(null);
  const projectsRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const handleTechClick = (id) => {
    setActiveTech(id);
    if (projectsRef.current) {
      projectsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const title = t('hero.title');
  const sentence = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.08,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const activeColor = technologies.find(t => t.id === activeTech)?.color || '#FFFFFF';

  // Carousel state and logic
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const activeIndex = technologies.findIndex(t => t.id === activeTech);
  const carouselControls = useAnimation();

  useEffect(() => {
    document.title = t('meta.title');
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('meta.description'));
    }
  }, [language, t]);


  useEffect(() => {
    const measureCarousel = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };
    measureCarousel();
    window.addEventListener('resize', measureCarousel);
    return () => window.removeEventListener('resize', measureCarousel);
  }, []);

  useEffect(() => {
    const newX = -activeIndex * carouselWidth;

    const sequence = async () => {
      if (carouselWidth > 0) { // Only animate if carouselWidth is known
        await carouselControls.start({ x: newX - 40, transition: { duration: 0.4, ease: 'easeInOut' } }); // Peek left
        await carouselControls.start({ x: newX, transition: { type: 'spring', stiffness: 200, damping: 25 } }); // Settle
      } else {
        carouselControls.start({ x: newX }); // Just set position if width is 0
      }
    };
    sequence();
  }, [activeIndex, carouselWidth, carouselControls]);

  const handleDragEnd = (event, info) => {
    const { offset, velocity } = info;
    const swipePower = Math.abs(offset.x) * velocity.x;
    const swipeThreshold = 10000;

    if (swipePower < -swipeThreshold) {
      const nextIndex = activeIndex < technologies.length - 1 ? activeIndex + 1 : activeIndex;
      setActiveTech(technologies[nextIndex].id);
    } else if (swipePower > swipeThreshold) {
      const prevIndex = activeIndex > 0 ? activeIndex - 1 : 0;
      setActiveTech(technologies[prevIndex].id);
    }
  };

  return (
    <main className="min-h-screen font-sans bg-[#050505] text-gray-300 scroll-smooth overflow-x-hidden">
      <section className="relative h-screen flex flex-col justify-center items-center text-left md:text-center px-6 overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-90"
          style={{ backgroundImage: `url(${heroBackground})`, y: yBg }}
        />
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        <div className="z-10 max-w-xl md:max-w-4xl">
          <motion.h1
            variants={sentence}
            initial="hidden"
            animate="visible"
            className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tighter font-bold mb-4 text-white"
          >
            {title.split("").map((char, index) => (
              <motion.span key={char + "-" + index} variants={letter} className="inline-block">
                {char === " " ? " " : char}
              </motion.span>
            ))}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 2 }}
            className="text-lg md:text-xl font-light text-gray-300">
            {t('hero.subtitle')}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
            className="mt-8 flex justify-start md:justify-center gap-6"
          >
            <a href="mailto:giulianonicolasbellocchio@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaEnvelope size={24} />
            </a>
            <a href="https://github.com/LianBellocchio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <FaGithub size={24} />
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2.8 }}
            className="mt-8 flex flex-col sm:flex-row justify-start md:justify-center gap-4"
          >
            <a
              href={`mailto:giulianonicolasbellocchio@gmail.com?subject=${encodeURIComponent(t('mail.subject'))}&body=${encodeURIComponent(t('mail.body'))}`}
              className="px-6 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-colors duration-300 shadow-lg"
            >
              {t('hero.workWithMe')}
            </a>
            <a
              href={cvFile}
              download="Giuliano_Bellocchio_CV.pdf"
              className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors duration-300 shadow-lg"
            >
              {t('hero.downloadCV')}
            </a>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 3 }}
          className="absolute bottom-10"
        >
          <a href="#lab" className="text-gray-500 hover:text-white transition-colors duration-300 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </motion.div>
      </section>

      <section
        id="lab"
        ref={techRef}
        className="px-6 md:px-12 py-24 bg-[#0a0a0a]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
          backgroundSize: '2rem 2rem'
        }}
      >
        <div className="max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-3 lg:gap-x-16">
          <div className="lg:col-span-1 lg:sticky top-24 h-fit">
            <h2 className="text-5xl md:text-6xl font-bold mb-8">{t('lab.title')}</h2>
            <p className="text-gray-400 leading-relaxed mb-12" dangerouslySetInnerHTML={{ __html: t('lab.aboutMe') }} />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-x-4 gap-y-8">
              {technologies.map(tech => (
                <motion.button
                  key={tech.id}
                  className="cursor-pointer group flex flex-col items-center text-center gap-2"
                  onClick={() => handleTechClick(tech.id)}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-4xl p-4 rounded-full transition-all duration-300"
                    animate={{
                      color: activeTech === tech.id ? tech.color : '#4B5563',
                      boxShadow: activeTech === tech.id ? `0 0 25px -5px ${tech.color}` : 'none',
                      backgroundColor: activeTech === tech.id ? `rgba(255, 255, 255, 0.05)` : 'transparent'
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {tech.icon}
                  </motion.div>
                  <p
                    className="text-sm uppercase tracking-widest font-semibold transition-colors duration-300"
                    style={{ color: activeTech === tech.id ? 'white' : '#6B7280' }}
                  >
                    {tech.name}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 mt-12 lg:mt-0">
            {/* Desktop: Grid View */}
            <div className="hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTech}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {projects[activeTech].length > 0 ? (
                    projects[activeTech].map((proj, idx) => <ProjectCard key={idx} proj={proj} activeColor={activeColor} t={t} />)
                  ) : (
                    <EmptyState t={t} />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Mobile: Carousel View */}
            <div ref={carouselRef} className="block lg:hidden overflow-hidden">
              <motion.div
                className="flex"
                drag="x"
                dragConstraints={{ right: 0, left: -carouselWidth * (technologies.length - 1) }}
                animate={carouselControls}
                onDragEnd={handleDragEnd}
              >
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.id}
                    style={{ minWidth: `${carouselWidth}px` }}
                    className="px-1" // Add some padding between slides
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {projects[tech.id].length > 0 ? (
                        projects[tech.id].map((proj, idx) => <ProjectCard key={idx} proj={proj} activeColor={activeColor} t={t} />)
                      ) : (
                        <div className="sm:col-span-2">
                          <EmptyState t={t} />
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

        </div>
      </section>

      <footer className="bg-[#050505] border-t border-white/10 py-8 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-4">
            <a href="mailto:giulianonicolasbellocchio@gmail.com" className="text-gray-500 hover:text-white transition-colors duration-300">
              <FaEnvelope size={24} />
            </a>
            <a href="https://github.com/LianBellocchio" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
              <FaGithub size={24} />
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} {t('footer.rights')}
          </p>
        </div>
      </footer>

      {/* Language Toggle Button */}
      <button
        onClick={toggleLanguage}
        className="fixed bottom-4 right-4 bg-white text-black px-4 py-2 rounded-full shadow-lg font-semibold z-50"
      >
        {language === 'en' ? 'ES' : 'EN'}
      </button>
    </main>
  );
}
