import { ThemeProvider } from '@/context/ThemeContext'
import { Navbar, Footer, ScrollProgressBar, CustomCursor } from '@/components/layout'
import { Hero, About, Skills, Projects, Experience, Contact } from '@/components/sections'
import { useMediaQuery } from '@/hooks/useMediaQuery'

function Portfolio() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className="min-h-screen bg-bg-primary">
      <ScrollProgressBar />
      {isDesktop && <CustomCursor />}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  )
}
