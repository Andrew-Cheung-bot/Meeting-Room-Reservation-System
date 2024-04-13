const { MongoClient, ObjectId } = require('mongodb');

process.env.MONGODB_URI = 'mongodb://cmos:IlIKDNEa84ya1YJxXXE7Ss4w9AGKmj71tAr5hxAuHFpFhOeALC2nT57F7zqJLRkwaGvMPg59fa27ACDbD98zoA%3D%3D@cmos.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false';

if (!process.env.MONGODB_URI) {
    // throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
    process.env.MONGODB_URI = 'mongodb://localhost:27017';
}

// Connect to MongoDB
async function connectToDB() {
    const client = await MongoClient.connect(process.env.MONGODB_URI);
    const db = client.db('Library');
    db.client = client;
    return db;
}

module.exports = { connectToDB, ObjectId };