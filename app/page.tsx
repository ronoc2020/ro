import ParticleBackground from '@/components/ParticleBackground';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import GithubRepos from '@/components/GithubRepos';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between theme-dark">
      <ParticleBackground />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <GithubRepos />
      <Contact />
      <Footer />
    </main>
  );
}