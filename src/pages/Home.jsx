import { AboutSection } from "../components/AboutSection"
import  { StarBackground } from "../components/StarBackground"
import { ContactSection } from "../components/ContactSection"
import { Footer } from "../components/Footer"
import { HeroSection } from "../components/HeroSection"
import { Navbar } from "../components/Navbar"

import { ProjectsSection } from "../components/ProjectsSection"
import { SkillsSection } from "../components/SkillSection"
import { ThemeToggle } from "../components/ThemeToggle"


export const Home = () => {
    return <div className="main-h-screen gb-background text-foreground overflow-x-hidden">
        {/* Theme Toggle */}
        <ThemeToggle />
        {/* Background Effects */}
        < StarBackground/>
        {/* Navbar */}
        <Navbar />
        {/* Main Content */}
        <main>
            <HeroSection />
            <AboutSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />

        </main>
        {/* Footer */}
        <Footer />
    </div>
  
}