import Image from "next/image";
import React from "react";
import { Button } from "../component/UI/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../component/UI/Card";
import { PlusCircle, Github, FileText, User, Wand2 } from "lucide-react";

export default function Home() {
  return (
   <div className="min-h-screen bg-gradient-to-br from-[#0a0f24] via-[#101936] to-[#1a2147] text-white px-6 py-10">
      {/* Header Section */}
      <header className="flex items-center justify-between mb-12 px-4 md:px-8">
  <h1 className="text-3xl font-extrabold tracking-wide text-white">
    ResumePilot <span className="text-blue-400">AI</span>
  </h1>

  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-2 rounded-lg shadow-lg flex items-center">
    <PlusCircle className="mr-2 h-4 w-4" />
    Generate Resume
  </Button>
</header>

      {/* About / Feature Section */}
<section className="text-center text-gray-300 my-15 px-6">
  <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3">
    Empower Your Career with <span className="text-blue-400">ResumePilot AI</span>
  </h2>
  <p className="max-w-2xl mx-auto text-gray-400 text-sm md:text-base leading-relaxed">
    ResumePilot AI helps you craft intelligent, personalized, and ATS-optimized resumes
    in seconds. Our smart AI agents analyze your experience, extract your key achievements,
    and design a resume that truly stands out.
  </p>

  {/* Features */}
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 max-w-5xl mx-auto">
    <div className="bg-[#1d254f]/50 border border-blue-500/10 rounded-xl p-6 backdrop-blur-md hover:shadow-blue-400/20 transition-all">
      <div className="flex flex-col items-center text-center">
        <PlusCircle className="text-blue-400 w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">AI Resume Builder</h3>
        <p className="text-gray-400 text-sm">
          Generate resumes tailored for your role — powered by AI precision.
        </p>
      </div>
    </div>

    <div className="bg-[#1d254f]/50 border border-purple-500/10 rounded-xl p-6 backdrop-blur-md hover:shadow-purple-400/20 transition-all">
      <div className="flex flex-col items-center text-center">
        <Github className="text-purple-400 w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Smart GitHub Sync</h3>
        <p className="text-gray-400 text-sm">
          Pull project data from GitHub automatically and summarize contributions.
        </p>
      </div>
    </div>

    <div className="bg-[#1d254f]/50 border border-pink-500/10 rounded-xl p-6 backdrop-blur-md hover:shadow-pink-400/20 transition-all">
      <div className="flex flex-col items-center text-center">
        <FileText className="text-pink-400 w-8 h-8 mb-3" />
        <h3 className="text-lg font-semibold text-white mb-2">Professional Templates</h3>
        <p className="text-gray-400 text-sm">
          Choose from multiple modern, ATS-friendly templates with one click.
        </p>
      </div>
    </div>
  </div>
</section>


      {/*  Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <Card className="bg-[#1d254f]/60 border border-blue-500/20 backdrop-blur-lg text-white shadow-lg hover:shadow-blue-400/30 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <User className="text-blue-400" />
            <CardTitle>Profile Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="max-w-3xl mx-auto text-black text-sm md:text-base leading-relaxed tracking-wide 
  bg-gradient-to-r from-white/10 via-transparent to-white/10 p-4 rounded-xl shadow-md backdrop-blur-sm text-justify">
              Complete your profile with your education, key skills, and professional experience to generate highly tailored resumes. ResumePilot AI uses your data to craft content that perfectly aligns with your career goals and target roles.
            </p>
            <Button variant="outline" className="mt-3 w-full border-blue-400 text-blue-300 hover:bg-blue-400/20">
              Edit Profile
            </Button>
          </CardContent>
        </Card>

        {/* GitHub Integration */}
        <Card className="bg-[#1d254f]/60 border border-blue-500/20 backdrop-blur-lg text-white shadow-lg hover:shadow-blue-400/30 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <Github className="text-gray-800" />
            <CardTitle>GitHub Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="max-w-3xl mx-auto text-black text-sm md:text-base leading-relaxed tracking-wide 
  bg-gradient-to-r from-white/10 via-transparent to-white/10 p-4 rounded-xl shadow-md backdrop-blur-sm text-justify">
Connect your GitHub to automatically fetch and analyze your  projects. ResumePilot AI summarizes your contributions and transforms them into achievements that strengthen your resume’s technical and professional profile.            </p>
            <Button variant="outline" className="mt-3 w-full border-blue-400 text-blue-300 hover:bg-blue-400/20">
              Connect GitHub
            </Button>
          </CardContent>
        </Card>

        {/* Resume Templates */}
        <Card className="bg-[#1d254f]/60 border border-blue-500/20 backdrop-blur-lg text-white shadow-lg hover:shadow-blue-400/30 transition-all duration-300">
          <CardHeader className="flex items-center gap-2">
            <FileText className="text-green-400" />
            <CardTitle>Resume Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="max-w-3xl mx-auto text-black text-sm md:text-base leading-relaxed tracking-wide 
  bg-gradient-to-r from-white/10 via-transparent to-white/10 p-4 rounded-xl shadow-md backdrop-blur-sm text-justify">
             Choose from a range of modern, ATS-friendly templates crafted with precision. Each template adapts seamlessly to your data, maintaining perfect structure, readability, and style — so your resume looks professional every time.
            </p>
            <Button variant="outline" className="mt-3 w-full border-green-400 text-green-300 hover:shadow-blue-400/20">
              Browse Templates
            </Button>
          </CardContent>
        </Card>
      </div>

      
    </div>
  );
}
