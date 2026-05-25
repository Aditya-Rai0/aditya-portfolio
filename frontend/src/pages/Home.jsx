import { useState, useEffect } from 'react';
import { getProfile, getProjects, getCertificates, getExperiences, getSkills, getAchievements } from '../api';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState(null);
  const [certificates, setCertificates] = useState(null);
  const [experiences, setExperiences] = useState(null);
  const [skills, setSkills] = useState(null);
  const [achievements, setAchievements] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, projectsRes, certsRes, expRes, skillsRes, achRes] = await Promise.all([
          getProfile(),
          getProjects(),
          getCertificates(),
          getExperiences(),
          getSkills(),
          getAchievements(),
        ]);
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
        setCertificates(certsRes.data);
        setExperiences(expRes.data);
        setSkills(skillsRes.data);
        setAchievements(achRes.data);
      } catch {
        setProfile(null);
        setProjects([]);
        setCertificates([]);
        setExperiences([]);
        setSkills([]);
        setAchievements([]);
      }
      setLoaded(true);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [loaded]);

  return (
    <main>
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00d4ff]/3 rounded-full blur-[128px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7c3aed]/3 rounded-full blur-[128px]"></div>
      </div>
      <Hero profile={profile} />
      <About profile={profile} />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Experience experiences={experiences} />
      <Certificates certificates={certificates} />
      <Contact profile={profile} />
    </main>
  );
}
