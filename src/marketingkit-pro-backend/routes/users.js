import express from 'express';
import { getUserProfile } from '../db.js';

const router = express.Router();

router.get("/:id/profile", async (req, res) => {
    try {
        res.json("Successfully called the users.js route");
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;