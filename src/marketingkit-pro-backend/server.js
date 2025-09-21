import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToDatabase } from './db.js';
import usersRouter from './routes/users.js';

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const PORT = process.env.PORT || 7860;

//Connecting to database
await connectToDatabase();

//Route: Talk to Python worker
app.post('/api/inference', async (req, res) => {
    try {
        const { image } = req.body;

        const response = await fetch("http://127.0.0.1:5000/predict", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
        });

        const data = await response.json();
        res.json({ result: data.result });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

//Route: User Profile get/save
app.use('/users', usersRouter);


app.listen(PORT, () => console.log('Server running on port ${PORT}'));