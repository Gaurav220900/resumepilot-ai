"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";

export default function ResumePreview() {
  const resumeRef = useRef(null);
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template"); // classic or modern

  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("resume_profile");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return <div className="text-white text-center mt-8">Loading user data...</div>;

   const handleDownloadPDF = async () => {
    const resumeHtml = document.getElementById("resume-root").outerHTML;

    const res = await fetch("http://localhost:5000/api/pdf/resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ html: resumeHtml }),
    });

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ResumePilot.pdf";
    a.click();
  };

  return (
    <div className="w-full min-h-screen bg-gray-900 p-10 overflow-auto">
       {/* ACTION BAR */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:opacity-90"
        >
          📄 Download PDF
        </button>
      </div>
      <h1 className="text-white text-3xl font-bold text-center mb-6">
        Resume Preview ({selectedTemplate})
      </h1>

      <div id="resume-root" className="bg-white rounded-xl shadow-xl mx-auto p-10">
        {selectedTemplate === "classic" && <ClassicTemplate data={user} />}
        {selectedTemplate === "modern" && <ModernTemplate data={user} />}
      </div>
    </div>
  );
}
