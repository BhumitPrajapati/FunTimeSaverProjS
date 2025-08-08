import {
    Document, Packer, Paragraph, TextRun, HeadingLevel
} from 'docx';
import { promises as fs } from 'fs'; // Use fs.promises for async file operations
import path from 'path';
import { fileURLToPath } from 'url';
import { bottomBorderLine, personalInfo, profSummarry, jobExperienceTable, bulletPoints, customTable } from './componenets.js';

// Resolve __dirname equivalent for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function createMyWordDocument(aiPrompt) {
    // 1. Define the output path for the new document
    const outputPath = path.resolve(__dirname, 'Bhumit Prajapati.docx');
    const narrowMargin = 720;
    console.log("Enter in doc.");

    // 2. Create a new Document instance
    const doc = new Document({
        // Add sections to the document
        sections: [{
            properties: {
                // Set page margins for this section
                page: {
                    margin: {
                        top: narrowMargin, // Assuming narrowMargin is defined elsewhere (e.g., 720 for 0.5 inch)
                        right: narrowMargin,
                        bottom: narrowMargin,
                        left: narrowMargin,
                    },
                    size: {
                        width: 12240,  // 8.5 inches
                        height: 15840, // 11 inches
                    },
                    orientation: 'portrait', // <--- This is the correct way
                },
            },
            children: [
                // Personal Information Header [Name, Location, Email...]
                personalInfo(),

                // Profeesional Summary
                new Paragraph({
                    children: [
                        new TextRun({ text: aiPrompt.profSummary, size: 22, break: 1 }),
                    ],
                }),

                // Work Experience Header
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Work Experience", bold: true, size: 28, color: "1155CC", break: 1,
                        }),
                        bottomBorderLine(),
                        // Job details table
                        jobExperienceTable({
                            jobTitle: {
                                title: 'Sr.Backend Developer',
                                type: 'Fulltime, (1-Year)',
                                fontSize: 24, // Example: 12pt
                                boldTitle: true,
                            },
                            companyInfo: {
                                name: 'Shivam Jewels',
                                location: 'Surat, IND',
                                fontSize: 24,
                                boldName: true,
                            },
                            dates: {
                                range: 'Jan 2023 – DEC 2023',
                                fontSize: 24,
                                boldRange: true,
                            },
                        }),
                        ...bulletPoints(aiPrompt.shivamFinalRes, 0),
                    ],
                    size: 2,
                }),


                jobExperienceTable({
                    jobTitle: {
                        title: 'Backend Developer',
                        type: 'Fulltime, (3-Years)',
                        fontSize: 24, // Example: 12pt
                        boldTitle: true,
                    },
                    companyInfo: {
                        name: 'Technokrit Solution',
                        location: 'Surat, IND',
                        fontSize: 24,
                        boldName: true,
                    },
                    dates: {
                        range: 'JULY 2019 – DEC 2022',
                        fontSize: 24,
                        boldRange: true,
                    },
                }),
                ...bulletPoints(aiPrompt.technokritFinalRes, 0),

                // Technology and skills
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Technologies and Languages", bold: true, size: 28, color: "1155CC", break: 1,
                        }),
                        bottomBorderLine(),
                        customTable({
                            columnWidths: [18, 82], // First column 30%, second 70%
                            data: [
                                [ // First row
                                    { text: ['Language:'], isBullet: true, bulletLevel: 0, fontSize: 22, bold: true }, // Use bullet for consistency
                                    { text: 'JavaScript, Python, C++, C#, PHP, Swift, .NET Framework, Selenium, Java, Kotlin' },
                                ],
                                [ // Second row
                                    { text: ["Technology:"], isBullet: true, bulletLevel: 0, fontSize: 22, bold: true },
                                    { text: 'Node.js, Express.js, SQL Server, MySQL, MongoDB, PostgreSQL, AWS, Git, Docker, CI/CD Pipelines, Python Pipelines, LLM integrations, PowerBI, React.js, TailwindCSS' },
                                ],
                                [ // Third row
                                    { text: ['Others:'], isBullet: true, bulletLevel: 0, fontSize: 22, bold: true },
                                    { text: 'Data Structures and Algorithms, REST APIs, Test Automation, Agile Methodologies', },
                                ],
                            ],
                        }),
                    ],
                }),
                // Education
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Education:", bold: true, size: 28, color: "1155CC"
                        }),
                        bottomBorderLine(),
                        customTable({
                            columnWidths: [82, 18], // First column 30%, second 70%
                            data: [
                                [ // First row
                                    { text: ['Mobile Solutions Development, Conestoga College.'], isBullet: true, bulletLevel: 0, fontSize: 22 }, // Use bullet for consistency
                                    { text: '2024 – 2025' },
                                ],
                                [ // Second row
                                    { text: ["Bachelor of Computer Applications, SDJ International College. "], isBullet: true, bulletLevel: 0, fontSize: 22 },
                                    { text: '2018 - 2021' },
                                ],
                            ],
                        }),
                    ],
                }),
                // Projects
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Project:", bold: true, size: 28, color: "1155CC"
                        }),
                        bottomBorderLine(),
                        new Paragraph({ text: "GigHub: Led the development of a web application for a temporary job marketplace, managing the full end-to-end process from system design to cloud deployment. As team leader, I coordinated a team of developers, assigned tasks based on strengths, and ensured timely delivery. Implemented real-time communication features using WebSocket.IO for chat and notifications, handling challenges with concurrent connections. Designed and optimized a scalable MongoDB schema to support efficient job listings and user interactions. Also introduced CI/CD pipelines and focused on system scalability and security, earning positive feedback from mentors.", bold: true, bullet: { level: 0 } }),
                    ],
                }),
                // Volunteer Work
                // new Paragraph({
                //     children: [
                //         new TextRun({
                //             text: "Volunteer Work:", bold: true, size: 28, color: "1155CC"
                //         }),
                //         bottomBorderLine(),
                //         new Paragraph({
                //             children: [
                //                 new TextRun({
                //                     text: "Hack The North, University of Waterloo ", bold: true, size: 22
                //                 }),],
                //             // text: "Hack The North, University of Waterloo ", bold: true, size: 22,
                //         }),
                //         new Paragraph({
                //             text: "Contributed to brainstorming and exploring innovative ideas while learning new technologies at the Hack the North event.", size: 22, indent: {
                //                 left: 720, // Indent 0.5 inches (720 twips) from the left margin
                //                 // You can also add right: 720,
                //             },
                //         }),
                //     ],
                // }),
            ],
        }],
    });

    try {
        console.log(`Document "${outputPath}" created successfully!`);
        return doc;
    } catch (error) {
        console.error('Error creating document:', error);
    }
}
