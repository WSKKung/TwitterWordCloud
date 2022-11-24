import dotenv from "dotenv"
dotenv.config()

import { MongoClient, ServerApiVersion } from 'mongodb'

const uri = process.env.MONGODB_CONNECT_URI

async function connectToMongoDBClient() {
	let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
	return await client.connect()
}

export async function insertTweetIntoDB(tweets) {

	// gen _id field for mongodb
	tweets = tweets.map(twt => {
		twt._id = twt.tweetID
		return twt
	})

	let client = await connectToMongoDBClient()
	let collection = client.db("bigData").collection("tweets");

	// append new tweets
	for (let i in tweets) {
		let existingTweet = await collection.findOne({ _id: tweets[i]._id })
		if (existingTweet != null) continue // skip duplicates
		await collection.insertOne(tweets[i])
	}

	await client.close();
}

export async function extractTweetFromDB(keywords) {

	let client = await connectToMongoDBClient()
	let collection = client.db("bigData").collection("tweets");

	let query = {}

	// build query object to scan for every docs (tweet) 
	// whose field named 'keywords' contains every key from `keywords` parameters
	for (let i in keywords) {
		query['keywords.' + keywords[i]] = { $exists: true }
	}

	let result = collection.find(query)
	let resultAsArray = await result.toArray()

	await client.close();

	return resultAsArray

}