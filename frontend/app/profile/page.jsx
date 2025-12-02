"use client";
import React, { useState } from "react";
import { PlusCircle, Trash2, Calendar, Languages } from "lucide-react";

export default function ProfileForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    location: "",
    github: "",
    linkedin: "",
    portfolio: "",
    additionalLinks: [
      { label: "", url: "" }
    ],
    skills: "",
    softSkills: "",
    summary: "",
    education: [
      { degree: "", institution: "", startDate: "", endDate: "" }
    ],
    experience: [
      { company: "", title: "", startDate: "", endDate: "", description: "" }
    ],
    achievements: "",
    certifications: [{ name: "", issuingOrganization: "", issueDate: "", URL: "" }],
    Languages: [{ name: "", proficiency: "" }],
    projects: [ {name: "", description: "", highlights: "", link: ""} ], 
  });

  // Handle input for top-level fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle dynamic array updates
  const handleArrayChange = (index, field, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  // Add new entry
  const handleAdd = (type) => {
    const newItem =
      type === "education"
        ? { degree: "", institution: "", year: "" }
        : { company: "", title: "", duration: "", description: "" };
    setFormData({ ...formData, [type]: [...formData[type], newItem] });
  };

  // Remove entry
  const handleRemove = (type, index) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Profile Data:", formData);
    // Later: send to backend API

    const updatedUSer =  await fetch(`${BASE_URL}/api/users/profile`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

  
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#1d254f]/60 border border-blue-500/10 rounded-2xl p-8 mt-10 text-gray-200 backdrop-blur-md shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-6 text-center">
        Fill Your Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="role"
            placeholder="Current Role (e.g. MERN Stack Developer)"
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Current Location (City, Country)"
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>

        { /* summary */ }
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Professional Summary</h3>
          <textarea
            name="summary"
            placeholder="A brief summary about yourself, your career goals, and what you bring to the table."
            rows="4"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          ></textarea>
        </div>

        {/* Professional Links Section */}
  <div>
  <h3 className="text-xl font-semibold text-white mb-3">Professional Links</h3>

  {/* Default Links */}
  <div className="space-y-4 mb-5">
    <div className="flex flex-col">
      <label className="text-gray-400 text-sm mb-1">GitHub URL</label>
      <input
        type="url"
        name="github"
        placeholder="https://github.com/username"
        value={formData.github || ""}
        onChange={handleChange}
        className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
        focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-gray-400 text-sm mb-1">LinkedIn URL</label>
      <input
        type="url"
        name="linkedin"
        placeholder="https://linkedin.com/in/username"
        value={formData.linkedin || ""}
        onChange={handleChange}
        className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
        focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />
    </div>

    <div className="flex flex-col">
      <label className="text-gray-400 text-sm mb-1">Portfolio / Website</label>
      <input
        type="url"
        name="portfolio"
        placeholder="https://yourportfolio.com"
        value={formData.portfolio || ""}
        onChange={handleChange}
        className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
        focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />
    </div>
  </div>

  {/* Dynamic Extra Links */}
  <h4 className="text-lg font-semibold text-white mb-2">Additional Links</h4>

  {formData.additionalLinks?.map((link, index) => (
    <div key={index} className="flex flex-col mb-4">
      <label className="text-gray-400 text-sm mb-1">Label (e.g. LeetCode, Medium, etc.)</label>
      <input
        type="text"
        placeholder="Platform Name"
        value={link.label}
        onChange={(e) => handleArrayChange(index, "label", e.target.value, "additionalLinks")}
        className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
        focus:border-blue-500 outline-none text-white placeholder-gray-400 mb-2"
      />

      <label className="text-gray-400 text-sm mb-1">URL</label>
      <input
        type="url"
        placeholder="https://example.com/yourprofile"
        value={link.url}
        onChange={(e) => handleArrayChange(index, "url", e.target.value, "additionalLinks")}
        className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
        focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />

      <button
        type="button"
        onClick={() => handleRemove("additionalLinks", index)}
        className="text-red-400 hover:text-red-500 flex items-center mt-2"
      >
        <Trash2 size={18} />
        <span className="ml-1 text-sm">Remove Link</span>
      </button>
    </div>
  ))}

  {/* Add More Button */}
  <button
    type="button"
    onClick={() => handleAdd("additionalLinks")}
    className="flex items-center text-blue-400 hover:text-blue-300 mt-2"
  >
    <PlusCircle className="w-4 h-4 mr-2" /> Add Another Link
  </button>
  </div>

        {/* Education Section */}
  <div>
  <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
  {formData.education.map((edu, index) => (
    <div key={index} className="space-y-3 mb-4 border-b border-blue-500/10 pb-3">
      {/* Degree + Institution */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">Degree</label>
          <input
            type="text"
            placeholder="e.g. B.Tech in Computer Science"
            value={edu.degree}
            onChange={(e) =>
              handleArrayChange(index, "degree", e.target.value, "education")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">Institution</label>
          <input
            type="text"
            placeholder="e.g. Delhi University"
            value={edu.institution}
            onChange={(e) =>
              handleArrayChange(index, "institution", e.target.value, "education")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Start + End Dates */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">Start Date</label>
          <input
            type="month"
            value={edu.startDate}
            onChange={(e) =>
              handleArrayChange(index, "startDate", e.target.value, "education")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
          />
           <Calendar
    className="absolute right-3 top-10 text-white/70 pointer-events-none"
    size={18}
  />
        </div>

        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">End Date</label>
          <input
            type="month"
            value={edu.endDate}
            onChange={(e) =>
              handleArrayChange(index, "endDate", e.target.value, "education")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
          />
           <Calendar
    className="absolute right-3 top-10 text-white/70 pointer-events-none"
    size={18}
  />
        </div>
      </div>

      {/* Remove Button */}
      {formData.education.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemove("education", index)}
          className="text-red-400 hover:text-red-500 flex items-center mt-2"
        >
          <Trash2 size={18} />
          <span className="ml-1 text-sm">Remove Education</span>
        </button>
      )}
    </div>
  ))}

  {/* Add More */}
  <button
    type="button"
    onClick={() => handleAdd("education")}
    className="flex items-center text-blue-400 hover:text-blue-300 mt-2"
  >
    <PlusCircle className="w-4 h-4 mr-2" /> Add More Education
  </button>
</div>


        {/* Experience Section */}
<div>
  <h3 className="text-xl font-semibold text-white mb-3">
    Professional Experience
  </h3>

  {formData.experience.map((exp, index) => (
    <div key={index} className="space-y-4 mb-1 border-b border-blue-500/10 pb-5">
      {/* Company + Job Title */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">Company</label>
          <input
            type="text"
            placeholder="e.g. Google, Microsoft, or StartupX"
            value={exp.company}
            onChange={(e) =>
              handleArrayChange(index, "company", e.target.value, "experience")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
            focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">Job Title</label>
          <input
            type="text"
            placeholder="e.g. Software Engineer, Backend Developer"
            value={exp.title}
            onChange={(e) =>
              handleArrayChange(index, "title", e.target.value, "experience")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
            focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>
      </div>

      {/* Start + End Dates */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">Start Date</label>
          <input
            type="month"
            value={exp.startDate}
            onChange={(e) =>
              handleArrayChange(index, "startDate", e.target.value, "experience")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
            focus:border-blue-500 outline-none text-white"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-white-400 text-sm mb-1">End Date</label>
          <input
            type="month"
            value={exp.endDate}
            onChange={(e) =>
              handleArrayChange(index, "endDate", e.target.value, "experience")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 
            focus:border-blue-500 outline-none text-white"
          />
        </div>
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-white-400 text-sm mb-1">
          Description / Achievements
        </label>
        <textarea
          placeholder="Describe your responsibilities, projects, and key achievements (e.g. built scalable APIs, improved performance by 40%)"
          rows="4"
          value={exp.description}
          onChange={(e) =>
            handleArrayChange(index, "description", e.target.value, "experience")
          }
          className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 
          focus:border-blue-500 outline-none text-white placeholder-gray-400"
        ></textarea>
      </div>

      {/* Remove Button */}
      {formData.experience.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemove("experience", index)}
          className="text-red-400 hover:text-red-500 flex items-center"
        >
          <Trash2 size={18} />
          <span className="ml-1 text-sm">Remove Experience</span>
        </button>
      )}
    </div>
  ))}

  {/* Add More Button */}
  <button
    type="button"
    onClick={() => handleAdd("experience")}
    className="flex items-center text-blue-400 hover:text-blue-300"
  >
    <PlusCircle className="w-4 h-4 mr-2" /> Add More Experience
  </button>
</div>

{ /* Projects Section */}
<div>
  <h3 className="text-xl font-semibold text-white mb-3">Projects</h3>
  {formData.projects.map((project, index) => (
    <div key={index} className="space-y-4 mb-4 border-b border-blue-500/10 pb-4">
      <input
        type="text"
        placeholder="Project Name"
        value={project.name}
        onChange={(e) =>
          handleArrayChange(index, "name", e.target.value, "projects")  
        }
        className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />
      <textarea
        placeholder="Project Description"
        value={project.description}
        onChange={(e) =>
          handleArrayChange(index, "description", e.target.value, "projects")
        }
        className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
      ></textarea>
      <input
        type="url"
        placeholder="Project Link (e.g. GitHub URL)"
        value={project.link}
        onChange={(e) =>
          handleArrayChange(index, "link", e.target.value, "projects")
        }
        className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />
      <input
        type="text"
        placeholder="Key Highlights (comma separated)"
        value={project.highlights}
        onChange={(e) =>
          handleArrayChange(index, "highlights", e.target.value, "projects")
        }
        className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
      />

      {/* Remove Button */}
      {formData.projects.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemove("projects", index)}
          className="text-red-400 hover:text-red-500 flex items-center mt-2"
        >
          <Trash2 size={18} />
          <span className="ml-1 text-sm">Remove Project</span>
        </button>
      )}
      </div>
  ))}
  
</div>


        {/* Skills */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Key Skills</h3>
          <input
            type="text"
            name="skills"
            placeholder="e.g. React, Node.js, MongoDB, Tailwind"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>

        { /* soft skills */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Soft Skills</h3>
          <input
            type="text"
            name="softSkills"
            placeholder="e.g. Leadership, Communication, Problem-Solving"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>    

        { /* achievements */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Achievements</h3>
          <textarea
            name="achievements"
            placeholder="List any notable achievements, awards, or recognitions you've received."
            rows="4"
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          ></textarea>
        </div>

        { /* certifications */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Certifications</h3>  
          {formData.certifications.map((cert, index) => (
            <div key={index} className="space-y-3 mb-4 border-b border-blue-500/10 pb-3">
              <input
                type="text"
                placeholder="Certification Name (e.g. AWS Certified Solutions Architect)"
                value={cert.name}
                onChange={(e) =>
                  handleArrayChange(index, "name", e.target.value, "certifications")
                }
                className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
              />
              <input
                type="text"
                placeholder="Issuing Organization (e.g. Amazon Web Services)"
                value={cert.issuingOrganization}
                onChange={(e) =>
                  handleArrayChange(index, "issuingOrganization", e.target.value, "certifications")
                }
                className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
              />
              <input
                type="month"
                value={cert.issueDate}
                onChange={(e) =>
                  handleArrayChange(index, "issueDate", e.target.value, "certifications")
                }
                className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
              />
              <input
                type="url"
                placeholder="Certification URL (e.g. link to credential)"
                value={cert.URL}
                onChange={(e) =>
                  handleArrayChange(index, "URL", e.target.value, "certifications")
                }
                className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
              />

              {/* Remove Button */}
              {formData.certifications.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove("certifications", index)}
                  className="text-red-400 hover:text-red-500 flex items-center mt-2"
                >
                  <Trash2 size={18} />
                  <span className="ml-1 text-sm">Remove Certification</span>
                </button>
              )}
            </div>
          ))}

          {/* Add More Button */}
          <button
            type="button"
            onClick={() => handleAdd("certifications")}
            className="flex items-center text-blue-400 hover:text-blue-300 mt-2"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add More Certification
          </button>

        </div>

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium shadow-md"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
}
