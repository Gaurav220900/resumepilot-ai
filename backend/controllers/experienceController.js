import { experienceAgent } from "../agents/experienceAgent.js";

export const enhanceExperience = async (req, res) => {
  try {
     if (!req.body.experience) {
      return res.status(400).json({
        success: false,
        error: "Experience is required"
      });
    }
      const result = await experienceAgent.invoke({
         experience: req.body.experience
       });

      res.status(200).json({
         success: true,
         experience: result.experience
        });
  } catch (error) {
    console.error("Error enhancing experience:", error);
    res.status(500).json({ error: "An error occurred while enhancing experience." });
  }
};