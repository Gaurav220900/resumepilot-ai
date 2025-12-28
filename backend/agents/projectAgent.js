import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  temperature: 0.6,
  maxOutputTokens: 700,
});

const parser = new JsonOutputParser();

const prompt = PromptTemplate.fromTemplate(`
You are a resume PROJECT DESCRIPTION agent.

Rewrite the project description into **resume-ready bullet points**.

Guidelines:
- Clearly state the problem the project solves
- Mention key technologies and tools used
- Highlight impact, responsibility, or outcome
- Use strong action verbs
- Keep each bullet concise (1–2 lines max)
- Do NOT use placeholder text
- Do NOT add information not present in the input

Return ONLY valid JSON in this exact format:

{{ 
  "project": [
    "bullet point 1",
    "bullet point 2",
    "bullet point 3"
  ]
}}

Project input:
{project}
`);

export const projectsAgent = RunnableSequence.from([
  prompt,
  llm,
  parser
]);
