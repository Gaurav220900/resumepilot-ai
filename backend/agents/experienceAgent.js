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
You are a professional resume EXPERIENCE rewriting agent.

Rewrite the experience description to:
- use strong action verbs
- include measurable impact where possible
- be ATS friendly
- use bullet points
- keep it concise and professional

Return ONLY valid JSON in this format:

{{ 
  "experience": "string"
}}

Experience input:
{experience}
`);

export const experienceAgent = RunnableSequence.from([
  prompt,
  llm,
  parser
]);
