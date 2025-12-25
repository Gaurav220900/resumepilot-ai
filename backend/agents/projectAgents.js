import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  temperature: 0.6,
  maxOutputTokens: 700,
});

const parser = new JsonOutputParser();

const prompt = PromptTemplate.fromTemplate(`
You are a resume PROJECT DESCRIPTION agent.

Rewrite the project description to:
- highlight problem solved
- mention technologies
- focus on impact and responsibility
- be resume-ready
- use bullet points

Return ONLY valid JSON:

{{ 
  "project": "string"
}}

Project input:
{project}
`);

export const projectsAgent = RunnableSequence.from([
  prompt,
  llm,
  parser
]);
