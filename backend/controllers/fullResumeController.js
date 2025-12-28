import { fullResumeAgent } from "../agents/fullResumeAgent.js";

export const enhanceEntireResume = async (req, res) => {
  try {
    const resumeData = req.body;

    if (!resumeData) {
      return res.status(400).json({
        success: false,
        error: "Resume data is required",
      });
    }

    const enhancedData = await fullResumeAgent(resumeData);

    res.json({
      success: true,
      ...enhancedData,
    });
  } catch (error) {
    console.error("Full Resume Agent Error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
