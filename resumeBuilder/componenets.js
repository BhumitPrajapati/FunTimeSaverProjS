import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType, BorderStyle, ExternalHyperlink, HyperlinkType } from 'docx';

export const bottomBorderLine = () => {
    return new Paragraph({
        border: {
            bottom: {
                style: BorderStyle.THICK,
                size: 8,
                color: "1155CC",
            },
        },
        spacing: { before: 50, after: 50 },
    });
};

export const personalInfo = () => {

    return new Table({
        width: {
            size: 100, // Make the table take 100% of available width
            type: WidthType.PERCENTAGE,
        },
        // No visible borders for the table itself
        borders: {
            top: { style: BorderStyle.NIL, size: 0, color: "auto" },
            bottom: { style: BorderStyle.NIL, size: 0, color: "auto" },
            left: { style: BorderStyle.NIL, size: 0, color: "auto" },
            right: { style: BorderStyle.NIL, size: 0, color: "auto" },
            insideHorizontal: { style: BorderStyle.NIL, size: 0, color: "auto" },
            insideVertical: { style: BorderStyle.NIL, size: 0, color: "auto" },
        },
        rows: [
            new TableRow({
                children: [
                    // Column 1: Location & LinkedIn (Left Aligned)
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: 'Waterloo, ON, CA', size: 24 }),
                                    new ExternalHyperlink({
                                        children: [

                                            new TextRun({
                                                text: 'LinkedIn', size: 24, style: "Hyperlink",
                                                break: 1
                                            }), // LinkedIn with hyperlink
                                        ],
                                        link: "https://www.linkedin.com/in/bhumit-prajapati-43a239247",
                                        alignment: AlignmentType.LEFT,
                                    })
                                ]
                            }),
                        ],

                        width: { size: 30, type: WidthType.PERCENTAGE }, // Approx 1/3 width
                        verticalAlign: AlignmentType.LEFT, // Align content vertically center
                    }),

                    // Column 2: Bhumit Prajapati (Center Aligned, Large Font)
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: 'Bhumit Prajapati', size: 46, bold: true }), // Larger font size (28pt), bold
                                ],
                                alignment: AlignmentType.CENTER,
                            }),
                        ],
                        width: { size: 40, type: WidthType.PERCENTAGE }, // Approx 1/3 width (slightly more to compensate)
                        verticalAlign: AlignmentType.CENTER, // Align content vertically center
                    }),

                    // Column 3: Phone & Email (Right Aligned)
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({ text: '+1 (437) 868-2903', size: 24 }),
                                    new ExternalHyperlink({
                                        children: [
                                            new TextRun({
                                                text: 'bhumitprajapati293@gmail.com', size: 24,
                                                style: "Hyperlink",
                                                break: 1
                                            }),
                                        ],
                                        link: 'mailto:bhumitprajapati293@gmail.com',
                                    })
                                ],
                                alignment: AlignmentType.RIGHT,
                            }),
                        ],
                        width: { size: 30, type: WidthType.PERCENTAGE }, // Approx 1/3 width
                        verticalAlign: AlignmentType.CENTER, // Align content vertically center
                    }),
                ],
            }),
        ],
    })
}

export const profSummarry = () => {
    return "With 2+ years of web development experience, I specialize in building fast, scalable, and reliable backend systems, leveraging technologies like JavaScript, SQL, and cloud infrastructure. My background includes database and API optimization, along with handling large datasets and implementing efficient CI/CD pipelines using tools like Docker. I am eager to apply my skills to developing performant software for Akamai's Edge Platform and am a fast learner, ready to contribute to the Image and Video Manager and EdgeKV products. I am also proficient with scripting languages in Linux/Unix environments.";
}

export const jobExperienceTable = (options) => {
    const { jobTitle, companyInfo, dates } = options;

    return new Table({
        width: {
            size: 100, // Full width
            type: WidthType.PERCENTAGE,
        },
        // No visible borders for the entire table
        borders: {
            top: { style: BorderStyle.NIL, size: 0, color: "auto" },
            bottom: { style: BorderStyle.NIL, size: 0, color: "auto" },
            left: { style: BorderStyle.NIL, size: 0, color: "auto" },
            right: { style: BorderStyle.NIL, size: 0, color: "auto" },
            insideHorizontal: { style: BorderStyle.NIL, size: 0, color: "auto" },
            insideVertical: { style: BorderStyle.NIL, size: 0, color: "auto" },
        },
        rows: [
            new TableRow({
                children: [
                    // Column 1: Job Position & Full-time
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: jobTitle.title,
                                        size: jobTitle.fontSize || 22,
                                        bold: jobTitle.boldTitle !== undefined ? jobTitle.boldTitle : true, // Default bold for title
                                    }),
                                    new TextRun({
                                        text: jobTitle.type,
                                        size: jobTitle.fontSize || 22,
                                        break: 1, // "Full-time" on a new line
                                    }),
                                ],
                                alignment: AlignmentType.LEFT,
                            }),
                        ],
                        width: { size: 33, type: WidthType.PERCENTAGE },
                        verticalAlign: AlignmentType.BOTTOM, // Align content vertically to bottom
                    }),

                    // Column 2: Company Name & Location
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: companyInfo.name,
                                        size: companyInfo.fontSize || 22,
                                        bold: companyInfo.boldName !== undefined ? companyInfo.boldName : true, // Default bold for name
                                    }),
                                    new TextRun({
                                        text: companyInfo.location,
                                        size: companyInfo.fontSize || 22,
                                        break: 1, // "location" on a new line
                                    }),
                                ],
                                alignment: AlignmentType.CENTER,
                            }),
                        ],
                        width: { size: 33, type: WidthType.PERCENTAGE },
                        verticalAlign: AlignmentType.BOTTOM, // Align content vertically to bottom
                    }),

                    // Column 3: Date Range
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: dates.range,
                                        size: dates.fontSize || 22,
                                        bold: dates.boldRange !== undefined ? dates.boldRange : true, // Default bold for range
                                    }),
                                ],
                                alignment: AlignmentType.RIGHT,
                            }),
                        ],
                        width: { size: 34, type: WidthType.PERCENTAGE }, // Remaining width
                        verticalAlign: AlignmentType.BOTTOM, // Align content vertically to bottom
                    }),
                ],
            }),
        ],
    });
};

export const bulletPoints = (sentences, level = 0, fontSize = 22, bold = false) => {
    if (!Array.isArray(sentences) || sentences.length === 0) {
        console.warn("createBulletPoints: No sentences provided or input is not an array. Returning empty array.");
        return [];
    }


    return sentences.map(sentence => {
        return new Paragraph({
            children: [
                new TextRun({
                    text: sentence,
                    size: fontSize,
                    bold: bold,
                }),
            ],
            bullet: {
                level: level,
            },
            // spacing: {
            //     after: 50, // Small spacing between bullet points for readability
            // },
        });
    });
};
const createTextElement = (text, fontSize, bold = false, breakLine = false) => {
    const textRunOptions = {
        text: text,
        size: fontSize,
        bold: bold,
    };
    // if (breakLine) {
    //     textRunOptions.break = 1;
    // }
    return new TextRun(textRunOptions);
};

export const customTable = (options) => { // Renamed to customTable
    const { columnWidths, data } = options;

    if (!columnWidths || columnWidths.length === 0) {
        throw new Error("customTable: 'columnWidths' array is required.");
    }
    if (!data || data.length === 0) {
        throw new Error("customTable: 'data' array (table rows) is required.");
    }

    const rows = data.map((rowData) => {
        const cells = rowData.map((cellData, cellIndex) => {
            const cellChildren = []; // This array will hold the Paragraphs for this cell
            const textInput = cellData.text;
            const fontSize = cellData.fontSize || 22;
            const bold = cellData.bold || false;
            const alignment = cellData.alignment || AlignmentType.LEFT;
            const isBullet = cellData.isBullet || false;
            const bulletLevel = cellData.bulletLevel || 0;

            if (isBullet && Array.isArray(textInput)) {
                // If it's a bullet list, EACH bullet point is its own Paragraph
                cellChildren.push(...bulletPoints(textInput, bulletLevel, fontSize, bold));
            } else if (Array.isArray(textInput)) {
                // Multiple lines of text, not bullets. Each line is in one Paragraph.
                const lineChildren = [];
                textInput.forEach((line, index) => {
                    // All TextRuns for multi-line non-bullet text go into one Paragraph
                    lineChildren.push(createTextElement(line, fontSize, bold, index > 0));
                });
                cellChildren.push(new Paragraph({
                    children: lineChildren,
                    alignment: alignment,
                }));
            } else {
                // Single line of text
                cellChildren.push(new Paragraph({
                    children: [createTextElement(textInput, fontSize, bold)],
                    alignment: alignment,
                }));
            }

            return new TableCell({
                children: cellChildren, // Assign the array of Paragraphs directly to TableCell children
                width: {
                    size: columnWidths[cellIndex % columnWidths.length],
                    type: WidthType.PERCENTAGE,
                },
                verticalAlign: cellData.verticalAlign || AlignmentType.LEFT, // Allow custom vertical align
            });
        });
        return new TableRow({ children: cells });
    });

    return new Table({
        rows: rows,
        width: {
            size: 100,
            type: WidthType.PERCENTAGE,
        },
        borders: {
            top: { style: BorderStyle.NIL, size: 0, color: "auto" },
            bottom: { style: BorderStyle.NIL, size: 0, color: "auto" },
            left: { style: BorderStyle.NIL, size: 0, color: "auto" },
            right: { style: BorderStyle.NIL, size: 0, color: "auto" },
            insideHorizontal: { style: BorderStyle.NIL, size: 0, color: "auto" },
            insideVertical: { style: BorderStyle.NIL, size: 0, color: "auto" },
        },
    });
};