import { summaryAgent } from "../agents/summaryAgent.js";

export const enhanceSummary = async (req, res) => {
  try {
    if (!req.body.summary) {
      return res.status(400).json({
        success: false,
        error: "Summary is required"
      });
    }

    const result = await summaryAgent.invoke({
      summary: req.body.summary
    });

    res.json({
      success: true,
      summary: result.summary
    });

  } catch (error) {
    console.error("Summary Agent Error:", error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
