import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { uri } from '../../atlas_uri.js'

dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(cors());

const PORT = process.env.PORT || 7860;

const client = new MongoClient(uri);
const dbname = "bank"

const connectToDatabase = async() => {
    try {
        await client.connect();
        console.log("Connected to MongoDB");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

const main = async() => {
    try {
        await connectToDatabase();
    } catch (error) {
        console.error(`Error connecting to databsae: ${error}`);
    } finally {
        await client.close();
    }
}

main();

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

app.listen(PORT, () => console.log('Server running on port ${PORT}'));