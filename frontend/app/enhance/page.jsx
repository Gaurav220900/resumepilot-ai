"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// TODO: Replace with backend data
const initialData = JSON.parse(localStorage.getItem("resume_profile")) || {};

export default function EnhancePage() {
  const router = useRouter();

  const [user, setUser] = useState(initialData);
  const [loadingSection, setLoadingSection] = useState(null);
  const [aiData, setAiData] = useState({
    summary: null,
    experience: user.experience?.map(() => null) || [],
    projects: user.projects?.map(() => null) || [],
    achievements: null,
    skills: null,
  });

  const Spinner = () => (
  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
);

  // Save user changes automatically to local storage
  useEffect(() => {
    localStorage.setItem("resume_profile", JSON.stringify(user));
  }, [user]);

  // Generic handlers

  const enhanceAllSections = async () => {
    alert("Enhance entire resume (backend coming soon)");
  };

  const enhanceSection = async (section, index = null) => {
  if (section === "summary") {
   try {
    setLoadingSection("summary");

    const res = await fetch("http://localhost:5000/api/ai/enhance-summary", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        summary: user.summary
      })
    });

    const data = await res.json();

    if (data.success) {
      setAiData(prev => ({
        ...prev,
        summary: data.summary
      }));
    } else {
      alert(data.error || "Failed to enhance summary");
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong while enhancing summary");
  } finally {
    setLoadingSection(null);
  }
  }

  else if (section === "achievements") {
    try {
    setLoadingSection("achievements");

      const res = await fetch("http://localhost:5000/api/ai/enhance-achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          achievements: user.achievements
        })
      });

      const data = await res.json();

      if (data.success) {
        setAiData(prev => ({
          ...prev,
          achievements: data.achievements
        }));
      } else {
        alert(data.error || "Failed to enhance achievements");
      }

  } catch (err) {
    console.error(err);
    alert("Something went wrong while enhancing achievements");
  } finally {
    setLoadingSection(null);
  }
}else if(section === "skills") {
    try {
    setLoadingSection("skills");

      const res = await fetch("http://localhost:5000/api/ai/enhance-skills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          skills: user.skills
        })
      });

      const data = await res.json();

      if (data.success) {
        setAiData(prev => ({
          ...prev,
          skills: data.skills
        }));
      } else {
        alert(data.error || "Failed to enhance skills");
      }

  } catch (err) {
    console.error(err);
    alert("Something went wrong while enhancing skills");
  } finally {
    setLoadingSection(null);
  }
  }else if (section === "experience") {
    try {
      setLoadingSection("experience");

      const res = await fetch("http://localhost:5000/api/ai/enhance-experience", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          experience: user.experience[index]
        })
      });

      const data = await res.json();

      if (data.success) {
        setAiData(prev => ({
          ...prev,
          experience: prev.experience.map((v, i) => i === index ? data.experience : v)
        }));
      } else {
        alert(data.error || "Failed to enhance experience");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong while enhancing experience");
    } finally {
      setLoadingSection(null);
    }
  } else if (section === "projects") {
    try {
      setLoadingSection("projects");

      const res = await fetch("http://localhost:5000/api/ai/enhance-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projects: user.projects[index]
        })
      });

      const data = await res.json();

      if (data.success) {
        setAiData(prev => ({
          ...prev,
          projects: prev.projects.map((v, i) => i === index ? data.projects : v)
        }));
      } else {
        alert(data.error || "Failed to enhance projects");
      }

    } catch (err) {
      console.error(err);
      alert("Something went wrong while enhancing projects");
    } finally {
      setLoadingSection(null);
    }
  }
}

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
        loadingSection={loadingSection}
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
        loadingSection={loadingSection}
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
        loadingSection={loadingSection}
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
        loadingSection={loadingSection}
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
        loadingSection={loadingSection}
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
  rejectAI,
  loadingSection
}) {
  const isLoading = loadingSection === sectionKey;
  
  const Spinner = () => (
    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );

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
            disabled={isLoading}
            className={`px-3 py-2 rounded-lg flex items-center gap-2
              ${
                isLoading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
          >
            {isLoading ? (
              <>
                <Spinner />
                Enhancing...
              </>
            ) : (
              <>✨ Enhance</>
            )}
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
              disabled={isLoading}
              className={`px-3 py-2 rounded-lg flex items-center gap-2
                ${
                  isLoading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
              {isLoading ? (
                <>
                  <Spinner />
                  Regenerating...
                </>
              ) : (
                <>Regenerate 🔁</>
              )}
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
  rejectAI,
  loadingSection
}) {
  const Spinner = () => (
    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );

  return (
    <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">{title}</h2>

      {data?.map((item, index) => {
        const isLoading = loadingSection === `${sectionKey}-${index}`;
        
        return (
          <div key={index} className="mb-6 pb-6 border-b border-white/10">
            {/* Display item details based on section type */}
            {sectionKey === "experience" && (
              <div className="mb-3">
                <h4 className="text-white font-semibold">{item.company} - {item.title}</h4>
                <p className="text-gray-400 text-sm">{item.startDate} to {item.endDate}</p>
              </div>
            )}
            
            {sectionKey === "projects" && (
              <div className="mb-3">
                <h4 className="text-white font-semibold">{item.name}</h4>
                {item.link && <p className="text-blue-400 text-sm">{item.link}</p>}
                {item.highlights && <p className="text-gray-400 text-sm">Highlights: {item.highlights}</p>}
              </div>
            )}
            
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
                  disabled={isLoading}
                  className={`px-3 py-2 rounded-lg flex items-center gap-2
                    ${
                      isLoading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >
                  {isLoading ? (
                    <>
                      <Spinner />
                      Enhancing...
                    </>
                  ) : (
                    <>Enhance ✨</>
                  )}
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
                    disabled={isLoading}
                    className={`px-3 py-2 rounded-lg flex items-center gap-2
                      ${
                        isLoading
                          ? "bg-gray-500 cursor-not-allowed"
                          : "bg-purple-600 hover:bg-purple-700"
                      }`}
                  >
                    {isLoading ? (
                      <>
                        <Spinner />
                        Regenerating...
                      </>
                    ) : (
                      <>Regenerate 🔁</>
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
}