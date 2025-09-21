import express from 'express';
import { getUserProfile } from '../db.js';
import { saveUserProfile } from '../db.js';

const router = express.Router();

router.get("/:id/profile", async (req, res) => {
    try {
        res.json("Successfully called the users.js route");
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/:id/profile", async (req, res) => {
    try {
        const userId = req.params.id;
        const profileData = req.params.body;
        const result = await saveUserProfile(userId, profileData);
        res.json(result);
    } catch (error) {
        console.error("Error saving user profile:", error);
        res.status(500).json({ message: error.message });
    }
});

export default router;