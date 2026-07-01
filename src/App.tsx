import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import ResearchPublication from './components/ResearchPublication';
import Projects from './components/Projects';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <ResearchPublication />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

export default App;