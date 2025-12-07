"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import ClassicTemplate from "../templates/ClassicTemplate";
import ModernTemplate from "../templates/ModernTemplate";

export default function ResumePreview() {
  const searchParams = useSearchParams();
  const selectedTemplate = searchParams.get("template"); // classic or modern

  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("resume_profile");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  if (!user) return <div className="text-white text-center mt-8">Loading user data...</div>;

  return (
    <div className="w-full min-h-screen bg-gray-900 p-10 overflow-auto">

      <h1 className="text-white text-3xl font-bold text-center mb-6">
        Resume Preview ({selectedTemplate})
      </h1>

      <div className="bg-white rounded-xl shadow-xl mx-auto p-10">
        {selectedTemplate === "classic" && <ClassicTemplate data={user} />}
        {selectedTemplate === "modern" && <ModernTemplate data={user} />}
      </div>
    </div>
  );
}
