import { achievementsAgent } from "../agents/achievementsAgent.js";

export const enhanceAchievements = async (req, res) => {
  try {
    if (!req.body.achievements || !Array.isArray(req.body.achievements)) {
      return res.status(400).json({
        success: false,
        error: "Achievements array is required"
      });
    }

    const result = await achievementsAgent.invoke({
      achievements: req.body.achievements
    });

    res.json({
      success: true,
      achievements: result.achievements
    });

  } catch (error) {
    console.error("Achievements Agent Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
}