export default function ClassicTemplate({ data }) {

  return (
    <div className="bg-white text-black px-10 py-12 max-w-3xl mx-auto font-serif leading-6">

      {/* Header */}
      <h1 className="text-4xl font-bold">{data.name}</h1>
      <p className="mt-1">{data.role}</p>

      <p className="text-sm mt-2 text-gray-700">
        📧 {data.email} | 📱 {data.phone} | 📍 {data.location}
      </p>

      {/* Links */}
      <div className="mt-2 text-sm text-blue-600">
        {data.github && <p>GitHub: {data.github}</p>}
        {data.linkedin && <p>LinkedIn: {data.linkedin}</p>}
        {data.portfolio && <p>Portfolio: {data.portfolio}</p>}
      </div>

      {/* Summary */}
      {data.summary && (
        <section className="mt-6">
          <h2 className="text-lg font-bold border-b pb-1">Profile Summary</h2>
          <p className="text-sm mt-2">{data.summary}</p>
        </section>
      )}

      {/* Skills */}
      {data.skills?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold border-b pb-1">Technical Skills</h2>
          <p className="text-sm mt-2">{data.skills.join(", ")}</p>
        </section>
      )}

      {data.softSkills?.length > 0 && (
        <section className="mt-4">
          <h2 className="text-lg font-bold border-b pb-1">Soft Skills</h2>
          <p className="text-sm mt-2">{data.softSkills.join(", ")}</p>
        </section>
      )}

      {/* Experience */}
      <section className="mt-6">
        <h2 className="text-lg font-bold border-b pb-1">Experience</h2>
        {data.experience.map((job, i) => (
          <div key={i} className="mt-3">
            <p className="font-bold">{job.title} — {job.company}</p>
            <p className="text-sm text-gray-700">{job.startDate} → {job.endDate}</p>
            <p className="text-sm mt-1">{job.description}</p>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mt-6">
        <h2 className="text-lg font-bold border-b pb-1">Education</h2>
        {data.education.map((ed, i) => (
          <div key={i} className="mt-3">
            <p className="font-bold">{ed.degree} — {ed.institution}</p>
            <p className="text-sm text-gray-700">{ed.startDate} → {ed.endDate}</p>
          </div>
        ))}
      </section>

      {/* Projects */}
      {data.projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-bold border-b pb-1">Projects</h2>
          {data.projects.map((p, i) => (
            <div key={i} className="mt-3">
              <p className="font-bold">{p.name}</p>
              <p className="text-sm text-gray-700">{p.startDate} → {p.endDate}</p>
              <p className="text-sm">{p.description}</p>
              {p.highlights?.length > 0 && (
                <ul className="list-disc ml-6 text-sm mt-1">
                  {p.highlights.map((h, j) => <li key={j}>{h}</li>)}
                </ul>
              )}
            </div>
          ))}
        </section>
      )}
    </div>
  );
}
