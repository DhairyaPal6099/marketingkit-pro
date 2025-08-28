import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

app.post('/api/replicate', async (req, res) => {
    try {
        const response = await fetch("https://api.replicate.com/v1/predictions", {
            method: "POST",
            headers: {
                "Authorization": "Token MY_API_TOKEN",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(req.body)
        });
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
app.listen(5000, () => console.log('Server running on port 5000'));