import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0.4,
  maxOutputTokens: 500,
});

const parser = new JsonOutputParser();

const prompt = PromptTemplate.fromTemplate(`
You are a SKILLS optimization agent.

Reorder and refine skills to:
- prioritize ATS relevance
- group related skills logically
- remove redundancy
- keep only resume-worthy skills

Return ONLY valid JSON:

{{ 
  "skills": ["string"]
}}

Skills input:
{skills}
`);

export const skillsAgent = RunnableSequence.from([
  prompt,
  llm,
  parser
]);
