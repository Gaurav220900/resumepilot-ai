"use client";
import React, { useState, useEffect } from "react";
import { PlusCircle, Trash2, Calendar, Languages } from "lucide-react";
import {  useRouter} from 'next/navigation'
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

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
    skills: [],
    softSkills: [],
    summary: "",
    education: [
      { degree: "", institution: "", startDate: "", endDate: "" }
    ],
    experience: [
      { company: "", title: "", startDate: "", endDate: "", description: "" }
    ],
    achievements: [],
    certifications: [{ name: "", issuingOrganization: "", issueDate: "", URL: "" }],
    Languages: [{ name: "", proficiency: "" }],
    projects: [ {name: "", description: "", highlights: "", link: ""} ], 
  });

  const router = useRouter();
  // Handle input for top-level fields
  const handleChange = (e) => {
   
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};
  

useEffect(() => {
  const savedData = localStorage.getItem("resume_profile");
  if (savedData) {
    setFormData(JSON.parse(savedData));
  }
}, []);

useEffect(() => {
  localStorage.setItem("resume_profile", JSON.stringify(formData));
}, [formData]);

  // Handle dynamic array updates
  const handleArrayChange = (index, field, value, type) => {
    const updatedArray = [...formData[type]];
    updatedArray[index][field] = value;
    setFormData({ ...formData, [type]: updatedArray });
  };

  // Add new entry
  const handleAdd = (type) => {
    const templates = {
      education: { degree: "", institution: "", startDate: "", endDate: "" },
      experience: { company: "", title: "", startDate: "", endDate: "", description: "" },
      additionalLinks: { label: "", url: "" },
      certifications: { name: "", issuingOrganization: "", issueDate: "", URL: "" },
      projects: { name: "", description: "", highlights: "", link: "" },
      Languages: { name: "", proficiency: "" }
    };
    setFormData({ ...formData, [type]: [...formData[type], templates[type]] });
  };

  // Remove entry
  const handleRemove = (type, index) => {
    const updatedArray = formData[type].filter((_, i) => i !== index);
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
   const formattedData = {
    ...formData,
    skills: Array.isArray(formData.skills)
    ? formData.skills
    : formData.skills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),

  softSkills: Array.isArray(formData.softSkills)
    ? formData.softSkills
    : formData.softSkills
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),

  achievements: Array.isArray(formData.achievements)
    ? formData.achievements
    : formData.achievements
        .split("\n")
        .map(line => line.trim())
        .filter(Boolean),
  };  

  console.log("Submitted Profile Data:", formattedData);

  // 1️⃣ Save to Local Storage
  localStorage.setItem("resume_profile", JSON.stringify(formattedData));
  // 2️⃣ (Optional) Save to backend too
  // await fetch(`${BASE_URL}/api/users/profile`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(formData)
  // });

  // 3️⃣ Navigate to review page
  router.push("/review");
  
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
            value={formData.name}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="role"
            placeholder="Current Role (e.g. MERN Stack Developer)"
            value={formData.role}
            onChange={handleChange}
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
          />
          <input
            type="text"
            name="location"
            placeholder="Current Location (City, Country)"
            value={formData.location}
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
            value={formData.summary}
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

      {formData.additionalLinks.length > 1 && (
        <button
          type="button"
          onClick={() => handleRemove("additionalLinks", index)}
          className="text-red-400 hover:text-red-500 flex items-center mt-2"
        >
          <Trash2 size={18} />
          <span className="ml-1 text-sm">Remove Link</span>
        </button>
      )}
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
        <div className="flex flex-col relative">
          <label className="text-white-400 text-sm mb-1">Start Date</label>
          <input
            type="month"
            value={edu.startDate}
            onChange={(e) =>
              handleArrayChange(index, "startDate", e.target.value, "education")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
          />
          <Calendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={18} />
        </div>

        <div className="flex flex-col relative">
          <label className="text-white-400 text-sm mb-1">End Date</label>
          <input
            type="month"
            value={edu.endDate}
            onChange={(e) =>
              handleArrayChange(index, "endDate", e.target.value, "education")
            }
            className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
          />
          <Calendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={18} />
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
        <div className="flex flex-col relative">
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
          <Calendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={18} />
        </div>

        <div className="flex flex-col relative">
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
          <Calendar className="absolute right-3 top-9 text-gray-400 pointer-events-none" size={18} />
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

  <button
    type="button"
    onClick={() => handleAdd("projects")}
    className="flex items-center text-blue-400 hover:text-blue-300 mt-2"
  >
    <PlusCircle className="w-4 h-4 mr-2" /> Add More Project
  </button>
</div>


        {/* Skills */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Key Skills</h3>
          <input
            type="text"
            name="skills"
            placeholder="e.g. React, Node.js, MongoDB, Tailwind"
            value={formData.skills}
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
            value={formData.softSkills}
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
            value={formData.achievements}
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
              <div className="relative">
                <input
                  type="month"
                  value={cert.issueDate}
                  onChange={(e) =>
                    handleArrayChange(index, "issueDate", e.target.value, "certifications")
                  }
                  className="w-full p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
                />
                <Calendar className="absolute right-3 top-3 text-gray-400 pointer-events-none" size={18} />
              </div>
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

        {/* Languages Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-3">Languages</h3>
          {formData.Languages.map((lang, index) => (
            <div key={index} className="grid md:grid-cols-2 gap-4 mb-4 border-b border-blue-500/10 pb-3">
              <input
                type="text"
                placeholder="Language (e.g. English, Spanish)"
                value={lang.name}
                onChange={(e) =>
                  handleArrayChange(index, "name", e.target.value, "Languages")
                }
                className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white placeholder-gray-400"
              />
              <select
                value={lang.proficiency}
                onChange={(e) =>
                  handleArrayChange(index, "proficiency", e.target.value, "Languages")
                }
                className="p-3 rounded-lg bg-[#111735] border border-blue-500/20 focus:border-blue-500 outline-none text-white"
              >
                <option value="">Select Proficiency</option>
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Professional">Professional</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>

              {formData.Languages.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemove("Languages", index)}
                  className="text-red-400 hover:text-red-500 flex items-center"
                >
                  <Trash2 size={18} />
                  <span className="ml-1 text-sm">Remove Language</span>
                </button>
              )}
            </div>
          ))}

  <button
    type="button"
    onClick={() => handleAdd("Languages")}
    className="flex items-center text-blue-400 hover:text-blue-300"
  >
    <PlusCircle className="w-4 h-4 mr-2" /> Add More Language
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
