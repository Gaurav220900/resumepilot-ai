import { skillsAgent } from "../agents/skillsAgent.js";

export const enhanceSkills = async (req, res) => {
  try {
    if (!req.body.skills || !Array.isArray(req.body.skills)) {
      return res.status(400).json({
        success: false,
        error: "Skills array is required"
      });
    }

    const result = await skillsAgent.invoke({
      skills: req.body.skills
    });

    res.json({
      success: true,
      skills: result.skills
    });

  } catch (error) {
    console.error("Skills Agent Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};