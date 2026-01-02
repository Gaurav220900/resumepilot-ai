export default function ModernTemplate({ data }) {

  return (
    <div className="bg-white text-gray-900 px-12 py-10 max-w-4xl mx-auto font-sans">

      {/* Header */}
      <div className="border-l-8 border-blue-600 pl-4">
        <h1 className="text-4xl font-bold">{data.name}</h1>
        <p className="text-lg text-blue-700">{data.role}</p>
      </div>

      <div className="flex justify-between text-sm mt-4">
        <p>📧 {data.email}</p>
        <p>📱 {data.phone}</p>
        <p>📍 {data.location}</p>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-3 gap-8 mt-8">

        {/* LEFT PANEL */}
        <div className="col-span-1 space-y-6">

          {/* Skills */}
          {data.skills?.length > 0 && (
            <div>
              <h2 className="font-bold text-blue-700">Technical Skills</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.skills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {data.softSkills?.length > 0 && (
            <div>
              <h2 className="font-bold text-blue-700 mt-4">Soft Skills</h2>
              <ul className="list-disc ml-5 text-sm">
                {data.softSkills.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {/* Links */}
          <div>
            <h2 className="font-bold text-blue-700">Links</h2>
            <ul className="text-sm space-y-1">
              {data.github && <li>GitHub → {data.github}</li>}
              {data.linkedin && <li>LinkedIn → {data.linkedin}</li>}
              {data.portfolio && <li>Portfolio → {data.portfolio}</li>}
            </ul>
          </div>

        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-2 space-y-8">

          {/* Summary */}
          {data.summary && (
            <div>
              <h2 className="font-bold text-xl border-b pb-1">Profile Summary</h2>
              <p className="text-sm mt-2">{data.summary}</p>
            </div>
          )}

          {/* Experience */}
          <div>
            <h2 className="font-bold text-xl border-b pb-1">Experience</h2>
            {data.experience.map((ex, i) => (
              <div key={i} className="mt-3">
                <p className="font-semibold">{ex.title} — {ex.company}</p>
                <p className="text-xs text-gray-600">{ex.startDate} → {ex.endDate}</p>
                <p className="text-sm mt-1">{ex.description}</p>
              </div>
            ))}
          </div>

          {/* Projects */}
          {data.projects?.length > 0 && (
            <div>
              <h2 className="font-bold text-xl border-b pb-1">Projects</h2>
              {data.projects.map((p, i) => (
                <div key={i} className="mt-3">
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-xs text-gray-600">{p.startDate} → {p.endDate}</p>
                  <p className="text-sm">{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          <div>
            <h2 className="font-bold text-xl border-b pb-1">Education</h2>
            {data.education.map((ed, i) => (
              <div key={i} className="mt-3">
                <p className="font-semibold">{ed.degree} — {ed.institution}</p>
                <p className="text-xs text-gray-600">{ed.startDate} → {ed.endDate}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          { data.certifications?.length > 0 && (
           <section className="mt-6">
            <h2 className="text-lg font-bold border-b pb-1">Certifications</h2>
            {data.certifications.map((cert, i) => (
              <div key={i} className="mt-3">
                <p className="font-bold">{cert.name} — {cert.issuingOrganization}</p>
                <p className="text-sm text-gray-700">Issued: {cert.issueDate}</p>
                <p className="text-sm text-gray-700">Certificate url: {cert.URL}</p>
              </div>
            ))}
          </section>
          )}
          { /* languages */}
          { data.Languages?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold border-b pb-1">Languages</h2>
          <p className="text-sm mt-2">{data.Languages.map(lang => `${lang.name} (${lang.proficiency})`).join(", ")}</p>
        </section>
        )}
        </div>
      </div>
    </div>
  );
}
