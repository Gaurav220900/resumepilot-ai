import { summaryAgent } from "./summaryAgent.js";
import { experienceAgent } from "./experienceAgent.js";
import { projectsAgent } from "./projectAgent.js";
import { achievementsAgent } from "./achievementsAgent.js";
import { skillsAgent } from "./skillsAgent.js";

export const fullResumeAgent = async (resume) => {
  const enhancedResult = {
    summary: null,
    experience: [],
    projects: [],
    achievements: null,
    skills: null,
  };

  /* ---------- SUMMARY ---------- */
  if (resume.summary?.trim()) {
    const summaryRes = await summaryAgent.invoke({
      summary: resume.summary,
    });
    enhancedResult.summary = summaryRes.summary;
  }

  /* ---------- EXPERIENCE ---------- */
  if (Array.isArray(resume.experience)) {
    for (const exp of resume.experience) {
      if (exp.description?.trim()) {
        const expRes = await experienceAgent.invoke({
          experience: exp.description,
        });
        enhancedResult.experience.push(expRes.experience);
      } else {
        enhancedResult.experience.push(null);
      }
    }
  }

  /* ---------- PROJECTS ---------- */
  if (Array.isArray(resume.projects)) {
    for (const project of resume.projects) {
      if (project.description) {
        const projRes = await projectsAgent.invoke({
          project: project.description,
        });
        enhancedResult.projects.push(projRes.project);
      } else {
        enhancedResult.projects.push(null);
      }
    }
  }

  /* ---------- ACHIEVEMENTS ---------- */
  if (resume.achievements?.length) {
    const achRes = await achievementsAgent.invoke({
      achievements: resume.achievements.join("\n"),
    });
    enhancedResult.achievements = achRes.achievements;
  }

  /* ---------- SKILLS ---------- */
  if (resume.skills?.length) {
    const skillsRes = await skillsAgent.invoke({
      skills: resume.skills.join(", "),
    });
    enhancedResult.skills = skillsRes.skills;
  }

  return enhancedResult;
};
