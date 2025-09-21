import { MongoClient } from 'mongodb';
import { uri } from '../../atlas_uri.js'

const client = new MongoClient(uri);
let db

export const connectToDatabase = async() => {
    try {
        await client.connect();
        db = client.db("Cluster0");
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export async function getUserProfile(userId) {
    try {
        return await db.collection('users').findOne({ _id: userId });
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
}

export async function saveUserProfile(userId, profileData) {
    try {
        return await db.collection('users').updateOne(
            { _id: userId },
            { preferences: profileData },
        );
    } catch (error) {
        console.error("Error saving user profile:", error);
        throw error;
    }
}