import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";
import createMyWordDocument from '../resumeBuilder/main.js';



// const jobDescription = `Play a role in the development of business intelligence projects related to external forces. You will have to work with business analysts, programmers, and project managers. You will be responsible for the delivery of these projects. Your role will be:

// Participate in the development of new projects or maintain existing projects, based on business intelligence, generally related to service, productivity, vehicle fleet and customer experience
// Participate in the implementation of documentation and programming in accordance with the standards established within the team. Documentation includes, among other things, design, testing, deployments and support.
// Participate in the development of web tools such as reports, dashboards, forms and applications
// Participate in the development of solutions to guarantee data quality (availability and reliability)
// Maintain and improve your knowledge of business intelligence and current technologies through training

// Essential Skills / Qualifications

// University or college diploma in the IT sector or equivalent work experience in this field
// Ease of working on multiple projects and priorities at the same time
// Knowledge of the SQL programming language for the purpose of storing, transforming, importing and exporting data
// Technical knowledge of OLAP cubes, report design and ETL principle
// Knowledge of the Microsoft SQL server environment: Database, SSAS and SSIS
// Have excellent listening skills, quickly understand the customer's needs in order to offer the best appropriate solutions to better meet their needs
// Have a keen sense of detail and accuracy
// Have good team spirit as well as good organizational and interpersonal skills
// Be flexible and adapt easily to a complex and changing environment with short deadlines
// Knowledge of English and French without any significant restrictions. As part of this role, this person will be required to interact with English-speaking and French-speaking stakeholders across Canada.

// Desired Skills / Qualifications

// Operational knowledge of external services
// Knowledge of data warehouses based on business intelligence
// Knowledge of the basic principles for working with large and complex data sets
// Knowledge of the SAS programming environment and language
// Knowledge of Jira, Confluence, Power BI tools
// Knowledge of Oracle, MySql, Terradata
// Knowledge of GCP
// Knowledge of C#, ASP.net programming language

// Working conditions

// Occasional overtime as needed by the team`;

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
// const genAI = new GoogleGenAI({ apiKey: "process" });

// let prompt = {
//   profSummary: `Generate a 3-5 sentence professional summary, tailored specifically to the provided job description. The summary should immediately highlight my 2+ years of web development experience, with a strong emphasis on my proficiency in database and API optimization, large data handling, and efficient CI/CD implementation. Incorporate technical keywords from the job description that align with my skills (JavaScript, APIs, SQL, Docker, cloud) while demonstrating my ability to build fast, scalable, and reliable systems. Prioritize the skills and requirements emphasized in the job description that directly align with my past experience. and i have capability of fast learning. 
//   Job Description:${jobDescription}`,
//   technokritPrompt: `Generate 3 unique sentences, in ATS-friendly paragraph for a resume's "Work Experience" section. Each sentence must start with a strong action verb, highlight specific accomplishments (following an "Action + Result" or "Challenge/Context, Action, Result" structure), incorporate keywords and mirror phrasing from the provided job description, and implicitly or explicitly demonstrate quantifiable impact where appropriate. Ensure all Sentences are grammatically correct and free of typos. Only give me output, not even extra word.
//   My Core Experience Summary (for AI reference):
//   Designed, developed, and maintained server-side applications and APIs to enhance system efficiency and reliability.
//   Worked on client-based projects, delivering high-quality backend solutions using JavaScript, Node.js, and MongoDB.
//   Debugged and resolved API performance issues, ensuring smooth functionality.


//   job description: ${jobDescription}`,
//   shivamPrompt: `Generate 3 to 4 unique sentences, in ATS-friendly paragraph for a resume's "Work Experience" section. Each sentence must start with a strong action verb, highlight specific accomplishments (following an "Action + Result" or "Challenge/Context, Action, Result" structure), incorporate keywords and mirror phrasing from the provided job description, and implicitly or explicitly demonstrate quantifiable impact where appropriate. Ensure all Sentences are grammatically correct and free of typos. Only give me output, not even extra word.
//   My Core Experience Summary (for AI reference):
//   Designed and implemented scalable APIs to enhance the CRM system’s functionality and integration.Optimized SQL queries and stored procedures to improve database performance and reliability.Managed deployments using CI/CD pipelines and Docker, streamlining the release process.Collaborated with cross-functional teams and clients to deliver robust backend solutions.My Key Skills/Expertise (for AI reference): JavaScript, APIs, SQL, Docker, cloud technologies, database optimization, API optimization, large data handling, efficient CI/CD implementation, building fast/scalable/reliable systems, client-facing project delivery, cross-functional collaboration, problem-solving, debugging, fast learning.

// //   job description: ${jobDescription}`,
//   //   skills: ``
// }
const aiPrompt = async (jobDescriptionParam, options) => {
  if (options == "profSummary") {
    // console.log("from prof summary");

    return `Generate a 3-5 sentence professional summary, tailored specifically to the provided job description. The summary should immediately highlight my 2+ years of web development experience, with a strong emphasis on my proficiency in database and API optimization, large data handling, and efficient CI/CD implementation. Incorporate technical keywords from the job description that align with my skills (JavaScript, APIs, SQL, Docker, cloud) while demonstrating my ability to build fast, scalable, and reliable systems. Prioritize the skills and requirements emphasized in the job description that directly align with my past experience. and i have capability of fast learning. 
    Job Description: ${jobDescriptionParam}`
  } else if (options == "shivamPrompt") {
    // prompt.shivamPrompt;

    return `Generate 3 to 4 unique sentences, in ATS-friendly paragraph for a resume's "Work Experience" section. Each sentence must start with a strong action verb, highlight specific accomplishments (following an "Action + Result" or "Challenge/Context, Action, Result" structure), incorporate keywords and mirror phrasing from the provided job description, and implicitly or explicitly demonstrate quantifiable impact where appropriate. Ensure all Sentences are grammatically correct and free of typos. Only give me output, not even extra word.
  My Core Experience Summary (for AI reference):
  Designed and implemented scalable APIs to enhance the CRM system’s functionality and integration.Optimized SQL queries and stored procedures to improve database performance and reliability.Managed deployments using CI/CD pipelines and Docker, streamlining the release process.Collaborated with cross-functional teams and clients to deliver robust backend solutions.My Key Skills/Expertise (for AI reference): JavaScript, APIs, SQL, Docker, cloud technologies, database optimization, API optimization, large data handling, efficient CI/CD implementation, building fast/scalable/reliable systems, client-facing project delivery, cross-functional collaboration, problem-solving, debugging, fast learning.

  job description: ${jobDescriptionParam}`
  } else if (options == "technokritPrompt") {
    // prompt.technokritPrompt;
    return `Generate 3 unique sentences, in ATS-friendly paragraph for a resume's "Work Experience" section. Each sentence must start with a strong action verb, highlight specific accomplishments (following an "Action + Result" or "Challenge/Context, Action, Result" structure), incorporate keywords and mirror phrasing from the provided job description, and implicitly or explicitly demonstrate quantifiable impact where appropriate. Ensure all Sentences are grammatically correct and free of typos. Only give me output, not even extra word.
    My Core Experience Summary (for AI reference):
    Designed, developed, and maintained server-side applications and APIs to enhance system efficiency and reliability. Worked on client-based projects, delivering high-quality  backend solutions using JavaScript, Node.js, and MongoDB. Debugged and resolved API performance issues, ensuring  smooth functionality.

    job description: ${jobDescriptionParam}`
  }
  else {
    console.log("Something was wrong on prompt side.");
  }
}


export default async function extractKeywords(jobDesc) {
  // console.log("from extrect keyword", jobDesc);
  if (!jobDesc) {
    return console.log("Something was wrong on job description");
  }
  const profSummaryAI = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: await aiPrompt(jobDesc, "profSummary"),
    // contents: prompt.profSummary
  });
  const technokritExperience = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: await aiPrompt(jobDesc, "technokritPrompt"),
    // contents: prompt.technokritPrompt
  });
  const shivamExperience = await genAI.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: await aiPrompt(jobDesc, "shivamPrompt"),
    // contents: prompt.shivamPrompt
  });

  // console.log("ProfSummary: ", profSummaryAI.text);
  let technokritFinalRes = technokritExperience.text.replace(/\s*\n\s*/g, ' ').split(/\. (?=[A-Z])/).map(s => s.trim());

  let shivamFinalRes = shivamExperience.text.replace(/\s*\n\s*/g, ' ').split(/\. (?=[A-Z])/).map(s => s.trim());
  const aiResponse = {
    profSummary: profSummaryAI.text,
    technokritFinalRes,
    shivamFinalRes
  }
  // console.log("Ai response successfully build",aiResponse);
  const finalResult = await createMyWordDocument(aiResponse);
  return finalResult;
}

// extractKeywords(jobDescription);