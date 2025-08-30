import express from 'express';
//import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const PORT = process.env.PORT || 7860;
//const HF_API_URL = "https://api-inference.huggingface.co/models/username/model-name";

app.post('/api/message', async (req, res) => {
    try {
        const { text } = req.body;

        res.json({ reply: `Server received your message: ${text}` });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log('Server running on port ${PORT}'));