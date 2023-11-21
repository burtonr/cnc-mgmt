import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

let mongoClient = null
let database = null

if (!process.env.MONGODB_URI) {
    throw new Error('Please add your Mongo URI to .env.local')
}

export async function connectToDatabase() {
    try {
        if (mongoClient && database) {
            return { mongoClient, database }
        }
        if (process.env.NODE_ENV === "development") {
            if (!global._mongoClient) {
                mongoClient = await (new MongoClient(uri,)).connect()
                global._mongoClient = mongoClient
            } else {
                mongoClient = global._mongoClient
            }
        } else {
            mongoClient = await (new MongoClient(uri,)).connect()
        }
        database = await mongoClient.db('cnc-mgmt')
        return { mongoClient, database }
    } catch (e) {
        console.error(e)
    }
}

export async function getProjectsCollection() {
    if (!database)
        await connectToDatabase()
    return await database.collection('projects')
}

export async function getDesignsCollection() {
    if (!database)
        await connectToDatabase()
    return await database.collection('designs')
}