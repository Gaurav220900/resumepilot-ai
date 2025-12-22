"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// TODO: Replace with backend data
const initialData = JSON.parse(localStorage.getItem("resume_profile")) || {};

export default function EnhancePage() {
  const router = useRouter();

  const [user, setUser] = useState(initialData);
  const [aiData, setAiData] = useState({
    summary: null,
    experience: user.experience?.map(() => null) || [],
    projects: user.projects?.map(() => null) || [],
    achievements: null,
    skills: null,
  });

  // Save user changes automatically to local storage
  useEffect(() => {
    localStorage.setItem("resume_profile", JSON.stringify(user));
  }, [user]);

  // Generic handlers

  const enhanceAllSections = async () => {
    alert("Enhance entire resume (backend coming soon)");
  };

  const enhanceSection = async (section, index = null) => {
    alert(`Enhance ${section} section (backend coming soon)`);
  };

  const regenerateSection = (section, index = null) => {
    enhanceSection(section, index);
  };

  const acceptAI = (section, index = null) => {
    if (index !== null) {
      // update array section
      const updated = [...user[section]];
      updated[index] = {
        ...updated[index],
        description: aiData[section][index]
      };
      setUser(prev => ({ ...prev, [section]: updated }));

      setAiData(prev => ({
        ...prev,
        [section]: prev[section].map((v, i) => i === index ? null : v)
      }));
    } else {
      // update single value section
      setUser(prev => ({ ...prev, [section]: aiData[section] }));
      setAiData(prev => ({ ...prev, [section]: null }));
    }
  };

  const rejectAI = (section, index = null) => {
    setAiData(prev => ({
      ...prev,
      [section]: index !== null 
        ? prev[section].map((v, i) => i === index ? null : v)
        : null
    }));
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white py-12 px-4">
      
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-3 tracking-wide">
        AI Resume Enhancement
      </h1>
      <p className="text-center text-gray-300 mb-12">
        Improve your resume with smart, professional AI rewriting.
      </p>

      {/* Enhance Entire Resume */}
      <div className="flex justify-center mb-10">
        <button
          onClick={enhanceAllSections}
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90"
        >
          ✨ Enhance Entire Resume
        </button>
      </div>

      {/* Summary Section */}
      <SectionBlock
        sectionName="Summary"
        sectionKey="summary"
        content={user.summary}
        aiContent={aiData.summary}
        enhanceSection={enhanceSection}
        regenerateSection={regenerateSection}
        acceptAI={acceptAI}
        rejectAI={rejectAI}
      />

      {/* Experience Section */}
      <MultiSectionBlock
        title="Experience"
        sectionKey="experience"
        data={user.experience}
        aiData={aiData}
        enhanceSection={enhanceSection}
        regenerateSection={regenerateSection}
        acceptAI={acceptAI}
        rejectAI={rejectAI}
      />

      {/* Projects Section */}
      <MultiSectionBlock
        title="Projects"
        sectionKey="projects"
        data={user.projects}
        aiData={aiData}
        enhanceSection={enhanceSection}
        regenerateSection={regenerateSection}
        acceptAI={acceptAI}
        rejectAI={rejectAI}
      />

      {/* Achievements Section */}
      <SectionBlock
        sectionName="Achievements"
        sectionKey="achievements"
        content={user.achievements?.join("\n")}
        aiContent={aiData.achievements}
        enhanceSection={enhanceSection}
        regenerateSection={regenerateSection}
        acceptAI={acceptAI}
        rejectAI={rejectAI}
      />

      {/* Skills Section */}
      <SectionBlock
        sectionName="Skills"
        sectionKey="skills"
        content={user.skills?.join(", ")}
        aiContent={aiData.skills}
        enhanceSection={enhanceSection}
        regenerateSection={regenerateSection}
        acceptAI={acceptAI}
        rejectAI={rejectAI}
      />

      {/* Continue Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => router.push("/resume/templates")}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:opacity-90"
        >
          Continue to Template Selection →
        </button>
      </div>
    </div>
  );
}

/* ---------------------------
   Single Section Component
---------------------------- */

function SectionBlock({ 
  sectionName, 
  sectionKey, 
  content, 
  aiContent, 
  enhanceSection, 
  regenerateSection, 
  acceptAI, 
  rejectAI 
}) {
  return (
    <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">{sectionName}</h2>

      <p className="text-gray-300 whitespace-pre-line">
        {content || "No data provided."}
      </p>

      {aiContent && (
        <div className="mt-4 bg-black/30 border border-green-500/30 p-4 rounded-lg">
          <h3 className="text-green-400 text-sm font-bold">AI Suggested Version</h3>
          <p className="text-gray-200 whitespace-pre-line mt-2">
            {aiContent}
          </p>
        </div>
      )}

      <div className="flex gap-3 mt-4">
        {!aiContent ? (
          <button 
            onClick={() => enhanceSection(sectionKey)} 
            className="px-3 py-2 bg-blue-600 text-white rounded-lg"
          >
            Enhance ✨
          </button>
        ) : (
          <>
            <button
              onClick={() => acceptAI(sectionKey)}
              className="px-3 py-2 bg-green-600 text-white rounded-lg"
            >
              Accept ✔
            </button>

            <button
              onClick={() => rejectAI(sectionKey)}
              className="px-3 py-2 bg-red-600 text-white rounded-lg"
            >
              Ignore ✖
            </button>

            <button
              onClick={() => regenerateSection(sectionKey)}
              className="px-3 py-2 bg-purple-600 text-white rounded-lg"
            >
              Regenerate 🔁
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ---------------------------
   Multi Section Component
---------------------------- */

function MultiSectionBlock({
  title,
  sectionKey,
  data,
  aiData,
  enhanceSection,
  regenerateSection,
  acceptAI,
  rejectAI
}) {
  return (
    <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

      {data?.map((item, index) => (
        <div key={index} className="mb-6 pb-6 border-b border-white/10">
          <p className="text-gray-300 whitespace-pre-line">
            {item.description || "No description provided."}
          </p>

          {aiData[sectionKey][index] && (
            <div className="mt-4 bg-black/30 border border-green-500/30 p-4 rounded-lg">
              <h3 className="text-green-400 text-sm font-bold">AI Suggested</h3>
              <p className="text-gray-200 whitespace-pre-line mt-2">
                {aiData[sectionKey][index]}
              </p>
            </div>
          )}

          <div className="flex gap-3 mt-4">
            {!aiData[sectionKey][index] ? (
              <button
                onClick={() => enhanceSection(sectionKey, index)}
                className="px-3 py-2 bg-blue-600 text-white rounded-lg"
              >
                Enhance ✨
              </button>
            ) : (
              <>
                <button
                  onClick={() => acceptAI(sectionKey, index)}
                  className="px-3 py-2 bg-green-600 text-white rounded-lg"
                >
                  Accept ✔
                </button>

                <button
                  onClick={() => rejectAI(sectionKey, index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg"
                >
                  Ignore ✖
                </button>

                <button
                  onClick={() => regenerateSection(sectionKey, index)}
                  className="px-3 py-2 bg-purple-600 text-white rounded-lg"
                >
                  Regenerate 🔁
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
