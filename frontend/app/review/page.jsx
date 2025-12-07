"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ReviewPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // Fetch user details stored earlier
  useEffect(() => {
    const storedData = localStorage.getItem("resume_profile");

    if (storedData) {
      setUser(JSON.parse(storedData));
    }
  }, []);
  if (!user) return <div className="text-center text-white mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-10 text-gray-200">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">Review Your Information</h1>

      {/* SECTION WRAPPER */}
      <div className="space-y-10">

        {/* PERSONAL INFO */}
        <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Personal Details</h2>
          <div className="grid grid-cols-2 gap-4 text-gray-300">
            <p><strong className="text-white">Name:</strong> {user.name}</p>
            <p><strong className="text-white">Email:</strong> {user.email}</p>
            <p><strong className="text-white">Phone:</strong> {user.phone}</p>
            <p><strong className="text-white">Location:</strong> {user.location}</p>
            <p><strong className="text-white">Role:</strong> {user.role}</p>
          </div>
        </div>

        {/* LINKS */}
        <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Professional Links</h2>
          <ul className="space-y-2 text-gray-300">
            {user.github && <li><strong className="text-white">GitHub:</strong> {user.github}</li>}
            {user.linkedin && <li><strong className="text-white">LinkedIn:</strong> {user.linkedin}</li>}
            {user.portfolio && <li><strong className="text-white">Portfolio:</strong> {user.portfolio}</li>}

            {user.additionalLinks?.length > 0 && (
              <li><strong className="text-white">Additional:</strong>
                <ul className="ml-4 list-disc">
                  {user.additionalLinks.map((l,i)=>(
                    <li key={i}>{l.label}: {l.url}</li>
                  ))}
                </ul>
              </li>
            )}
          </ul>
        </div>

        {/* PROJECTS */}
        <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-semibold text-white mb-4">Projects</h2>

        {user.projects?.length > 0 ? (
            user.projects.map((project, index) => (
            <div key={index} className="mb-4">
                <p className="text-gray-200 font-semibold text-lg">{project.name}</p>
                
                {project.link && (
                <p className="text-blue-400 text-sm mb-1">
                    🔗 <a href={project.link} target="_blank" rel="noopener noreferrer" className="underline">
                    {project.link}
                    </a>
                </p>
                )}

                {project.techStack?.length > 0 && (
                <p className="text-gray-300 text-sm">
                    <strong className="text-white">Tech Used:</strong> {project.techStack.join(", ")}
                </p>
                )}

                <p className="text-gray-400 text-sm flex items-center">
                {project.startDate} → {project.endDate}
                </p>

                {project.description && (
                <p className="text-gray-300 mt-2">{project.description}</p>
                )}

                {/* Highlights */}
                {project.highlights?.length > 0 && (
                <ul className="list-disc ml-6 text-gray-300 mt-2">
                    {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
                )}

                <div className="w-full h-[1px] bg-white/10 mt-4" />
            </div>
            ))
        ) : (
            <p className="text-gray-400">No projects added yet.</p>
        )}
        </div>
 

        {/* EDUCATION */}
        <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Education</h2>
          {user.education.map((e,i)=>(
            <div key={i} className="mb-3">
              <p className="text-gray-300"><strong className="text-white">{e.degree}</strong> — {e.institution}</p>
              <p className="text-gray-400 text-sm">{e.startDate} → {e.endDate}</p>
            </div>
          ))}
        </div>

        {/* EXPERIENCE */}
        <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Experience</h2>
          {user.experience.map((ex,i)=>(
            <div key={i} className="mb-3">
              <p><strong className="text-white">{ex.title}</strong> — {ex.company}</p>
              <p className="text-gray-400 text-sm">{ex.startDate} → {ex.endDate}</p>
              <p className="text-gray-300 mt-1">{ex.description}</p>
            </div>
          ))}
        </div>

        {/* SKILLS & OTHER */}
        <div className="bg-[#1d254f]/60 border border-blue-500/20 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">Skills</h2>
          <p className="text-gray-300">{user?.skills && user.skills.join(", ")}</p>

          {user.achievements?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-white mt-6 mb-2">Achievements</h2>
              <ul className="list-disc ml-6 text-gray-300">
                {user.achievements.map((a,i)=> <li key={i}>{a}</li>)}
              </ul>
            </>
          )}

          {user.certificates?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-white mt-6 mb-2">Certificates</h2>
              <ul className="list-disc ml-6 text-gray-300">
                {user.certificates.map((c,i)=> <li key={i}>{c.title} → {c.issuer}</li>)}
              </ul>
            </>
          )}
          {user.languages?.length > 0 && (
            <>
              <h2 className="text-xl font-semibold text-white mt-6 mb-2">Languages</h2>
              <ul className="list-disc ml-6 text-gray-300">
                {user.languages.map((l, i)=> <li key={i}>{l}</li>)}
              </ul>
            </>
          )}
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex justify-between mt-10">
        <button
          onClick={()=> router.push("/profile")}
          className="px-6 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
        >
          Edit Details
        </button>

        <button
          onClick={()=> router.push("/templates")}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg"
        >
          Continue → Select Template
        </button>
      </div>
    </div>
  );
}
