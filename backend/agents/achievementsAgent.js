import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.5,
  maxOutputTokens: 600,
});

const parser = new JsonOutputParser();

const prompt = PromptTemplate.fromTemplate(`
You are an ACHIEVEMENTS optimization agent.

Rewrite achievements to:
- be result-oriented
- use action verbs
- remove fluff
- make them resume-impactful

Return ONLY valid JSON:

{{ 
  "achievements": ["string"]
}}

Achievements input:
{achievements}
`);

export const achievementsAgent = RunnableSequence.from([
  prompt,
  llm,
  parser
]);
