import dotenv from "dotenv";
dotenv.config();

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",   // fast + free tier model
  temperature: 0.6,
  apiKey: process.env.GOOGLE_API_KEY,
  maxOutputTokens: 512,
});

const parser = new JsonOutputParser();

const prompt = PromptTemplate.fromTemplate(`
You are a professional resume summary rewriting agent.

Rewrite the user's resume summary to be:
- concise
- confident
- achievement focused
- ATS friendly
- written in third person
- 3–4 lines max

DO NOT add skills or experience not provided.
DO NOT include placeholder content.

Return response in pure JSON format:

{{ 
  "summary": "string" 
}}

User Summary:
{summary}
`);

export const summaryAgent = RunnableSequence.from([
  prompt,
  llm,
  parser
]);
