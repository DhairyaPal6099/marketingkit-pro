import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const PORT = process.env.PORT || 7860;
const HF_API_URL = "https://api-inference.huggingface.co/models/username/model-name";
app.post('/api/huggingface', async (req, res) => {
    try {
        const response = await fetch(HF_API_URL, {
            method: "POST",
            headers: {
                "Authorization": "Bearer ${process.env.HF_API_TOKEN}",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: req.body.inputs,
                parameters: req.body.parameters || {},
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(response.status).json({ error: errorText });
        }

        const data = await response.json();
        res.json(data);

    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => console.log('Server running on port ${PORT}'));

//Comment for testing SSH push to hf space