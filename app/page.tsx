'use client';

import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Calendar, Award, Heart, Languages, Github, Linkedin, Download, Menu, Gamepad2, Code2, Copy, Check } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import portfolioData from "./data.json"
import { scrollToSection } from "./utils"
import { useEffect } from "react"
import { PhonePopup } from "@/components/phone-popup"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TellMeSomething } from "@/components/tell-me-something"

export default function Home() {
  const { personalInfo, experience, education, skills, courses, projects, achievements, interests, languages } = portfolioData
  const [isPhonePopupOpen, setIsPhonePopupOpen] = useState(false);
  const [openCodeDialog, setOpenCodeDialog] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
  };

  const handleEmailClick = () => {
    window.location.href = `mailto:${personalInfo.email}`;
  };

  const handleCopyCode = async (projectTitle: string) => {
    try {
      const currentProject = projects.find(project => project.title === projectTitle);
      if (currentProject?.code) {
        await navigator.clipboard.writeText(currentProject.code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm dark:bg-gray-900 dark:shadow-md">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src="/images/profile.jpg"
                alt="Profile"
                fill
                className="object-cover"
                sizes="40px"
                priority
              />
            </div>
            <div className="font-bold text-xl md:text-2xl text-primary">{personalInfo.name}</div>
          </div>
          <div className="flex items-center gap-4">
            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-6">
              <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors relative group dark:text-gray-300 dark:hover:text-white" onClick={(e) => handleNavClick(e, "about")}>About<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link>
              <Link href="#experience" className="text-muted-foreground hover:text-primary transition-colors relative group dark:text-gray-300 dark:hover:text-white" onClick={(e) => handleNavClick(e, "experience")}>Experience<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link>
              <Link href="#education" className="text-muted-foreground hover:text-primary transition-colors relative group dark:text-gray-300 dark:hover:text-white" onClick={(e) => handleNavClick(e, "education")}>Education<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link>
              <Link href="#projects" className="text-muted-foreground hover:text-primary transition-colors relative group dark:text-gray-300 dark:hover:text-white" onClick={(e) => handleNavClick(e, "projects")}>Projects<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link>
              <Link href="#skills" className="text-muted-foreground hover:text-primary transition-colors relative group dark:text-gray-300 dark:hover:text-white" onClick={(e) => handleNavClick(e, "skills")}>Skills<span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span></Link>
            </nav>
            {/* Mobile Hamburger */}
            <button className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Open menu">
              <Menu className="w-6 h-6" />
            </button>
            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
              <div className="absolute top-16 left-0 w-full bg-background border-b shadow-md md:hidden animate-fade-in z-50">
                <nav className="flex flex-col gap-2 p-4">
                  <Link href="#about" className="py-2 px-4 rounded hover:bg-primary/10 transition-colors" onClick={(e) => { handleNavClick(e, 'about'); setMobileMenuOpen(false); }}>About</Link>
                  <Link href="#experience" className="py-2 px-4 rounded hover:bg-primary/10 transition-colors" onClick={(e) => { handleNavClick(e, 'experience'); setMobileMenuOpen(false); }}>Experience</Link>
                  <Link href="#education" className="py-2 px-4 rounded hover:bg-primary/10 transition-colors" onClick={(e) => { handleNavClick(e, 'education'); setMobileMenuOpen(false); }}>Education</Link>
                  <Link href="#projects" className="py-2 px-4 rounded hover:bg-primary/10 transition-colors" onClick={(e) => { handleNavClick(e, 'projects'); setMobileMenuOpen(false); }}>Projects</Link>
                  <Link href="#skills" className="py-2 px-4 rounded hover:bg-primary/10 transition-colors" onClick={(e) => { handleNavClick(e, 'skills'); setMobileMenuOpen(false); }}>Skills</Link>
                </nav>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="container py-8 space-y-12">
        {/* Hero Section */}
        <section id="about" className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 py-8 transition-all duration-700">
          {/* Blog Layer Background */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,153,255,0.05)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,153,255,0.05)_0%,transparent_50%)]"></div>
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-primary/20"></div>
              <div className="absolute top-40 right-10 w-16 h-16 rounded-full bg-primary/20"></div>
              <div className="absolute bottom-10 left-1/3 w-24 h-24 rounded-full bg-primary/20"></div>
            </div>
          </div>
          
          <div className="lg:col-span-2 space-y-4">
            <h1 className="text-4xl font-bold text-primary">{personalInfo.name}</h1>
            <div className="flex flex-wrap gap-3 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin size={16} />
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone size={16} />
                <span>{personalInfo.phone}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail size={16} />
                <span>{personalInfo.email}</span>
              </div>
            </div>
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-primary">Executive Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground">{personalInfo.summary}</p>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <div className="flex flex-col gap-4 mb-4">
              <a href="/Stanko-Resume.pdf" download target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="w-full flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  Download Resume
                </Button>
              </a>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="text-primary">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="text-primary" size={20} />
                  <span>{personalInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={20} />
                  <span>{personalInfo.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary" size={20} />
                  <span>{personalInfo.location}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Experience</h2>
          <div className="space-y-6">
            {experience.map((exp, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-primary">{exp.title}</CardTitle>
                      <CardDescription>{exp.company}</CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{exp.period}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {exp.description ? (
                    <p>{exp.description}</p>
                  ) : exp.responsibilities ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No details available</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Education</h2>
          <div className="space-y-6">
            {education.map((edu, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-primary">{edu.degree}</CardTitle>
                      <CardDescription>{edu.institution}</CardDescription>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar size={14} />
                      <span>{edu.year}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{edu.score}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-primary">{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{project.description}</p>
                  <div className="flex gap-2 mt-4">
                    {project.code ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="flex items-center gap-2"
                          onClick={() => setOpenCodeDialog(project.title)}
                        >
                          <Code2 className="w-5 h-5" />
                          Code
                        </Button>
                        <Dialog 
                          open={openCodeDialog === project.title} 
                          onOpenChange={(open) => !open && setOpenCodeDialog(null)}
                        >
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <div className="flex items-center gap-2">
                                <DialogTitle>{project.title} Code</DialogTitle>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleCopyCode(project.title)}
                                  className="h-8 w-8"
                                >
                                  {isCopied ? (
                                    <Check className="h-4 w-4" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Copy code</span>
                                </Button>
                              </div>
                            </DialogHeader>
                            <div className="relative">
                              <pre className="bg-muted p-4 rounded-lg overflow-x-auto mt-2">
                                <code>{project.code}</code>
                              </pre>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </>
                    ) : project.repo ? (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="flex items-center gap-2">
                          <Github className="w-5 h-5" />
                          Code
                        </Button>
                      </a>
                    ) : null}
                    {project.title === "Tic Tac Toe Game" && (
                      <a
                        href={project.gameLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" className="flex items-center gap-2">
                          <Gamepad2 className="w-5 h-5" />
                          Play
                        </Button>
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skills & Courses Section */}
        <section id="skills" className="py-8">
          <Tabs defaultValue="skills">
            <TabsList className="mb-6 w-full">
              <TabsTrigger value="skills" className="flex-1">Skills</TabsTrigger>
              <TabsTrigger value="courses" className="flex-1">Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="skills">
              <h2 className="text-3xl font-bold text-primary mb-6">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {skills.map((skill, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardHeader>
                      <CardTitle className="text-primary">{skill}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>Proficient in {skill} with practical experience in various projects and applications.</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="courses">
              <h2 className="text-3xl font-bold text-primary mb-6">Courses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {courses.map((course, index) => (
                  <Card key={index}>
                    <CardContent className="pt-6">
                      <p>{course}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-8">
          <h2 className="text-3xl font-bold text-primary mb-6">Achievements & Awards</h2>
          <Card>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex gap-3">
                    <Award className="text-primary flex-shrink-0 mt-1" size={20} />
                    <p>{achievement}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Interests & Languages Section */}
        <section className="py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Interests</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {interests.map((interest, index) => (
                    <li key={index} className="flex gap-3">
                      <Heart className="text-primary flex-shrink-0 mt-1" size={18} />
                      <p>{interest}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">Languages</h2>
            <Card>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {languages.map((language, index) => (
                    <li key={index} className="flex gap-3">
                      <Languages className="text-primary flex-shrink-0 mt-1" size={18} />
                      <p>{language}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Tell Me Something Section */}
      <TellMeSomething />

      {/* Footer */}
      <footer className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center">
            <p className="text-muted-foreground font-medium tracking-wide">
              {personalInfo.name.toUpperCase()}
            </p>
          </div>
          <div className="flex items-center gap-8 mt-4 md:mt-0">
            <Link 
              href={personalInfo.github}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={20} />
            </Link>
            <Link 
              href={personalInfo.linkedin}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
            </Link>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={handleEmailClick}
              className="text-muted-foreground hover:text-primary p-0"
            >
              <Mail size={20} />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsPhonePopupOpen(true)}
              className="text-muted-foreground hover:text-primary p-0"
            >
              <Phone size={20} />
            </Button>
          </div>
        </div>
      </footer>

      <PhonePopup
        phone={personalInfo.phone}
        isOpen={isPhonePopupOpen}
        onClose={() => setIsPhonePopupOpen(false)}
      />
    </div>
  )
}
