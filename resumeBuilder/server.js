import express from 'express';
import cors from 'cors';
import { Document, Packer, Paragraph } from 'docx';
import extractKeywords from '../openAI/keywordExtractor.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/generate-doc', async (req, res) => {
  const { content } = req.body;
  // console.log("Api calling");
  // console.log(content);
  
  const doc = await extractKeywords(content);

  try {
    // await createMyWordDocument();
    const buffer = await Packer.toBuffer(doc);
    res.setHeader('Content-Disposition', 'attachment; filename=document.docx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
    res.send(buffer);
  } catch (error) {
    console.error('Error creating document:', error);
  }
});
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
