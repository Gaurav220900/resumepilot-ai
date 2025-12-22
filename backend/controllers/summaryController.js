import { summaryAgent } from "../agents/summaryAgent.js";

export const enhanceSummary = async (req, res) => {
  try {
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
