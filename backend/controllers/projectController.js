import { projectsAgent } from "../agents/projectAgent.js";

export const enhanceProjects = async (req, res) => {
  try {

    if(!req.body.projects) {
      return res.status(400).json({
        success: false,
        error: "Project data is required"
      });
    }

    const result = await projectsAgent.invoke({
      project: req.body.projects
    });

    const enhancedProject = result.project;

    res.status(200).json({ success: true, projects: enhancedProject });
  } catch (error) {
    console.error("Error enhancing project:", error);
    res.status(500).json({ error: "An error occurred while enhancing project." });
  }
};