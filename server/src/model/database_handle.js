import dotenv from "dotenv"
dotenv.config()

import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'

const uri = process.env.MONGODB_CONNECT_URI

const tweetsId = ObjectId("637e5128a72ea89a10be6fde");

export async function insertTweetIntoDB(tweets) {

	// insert _id for mongodb
	tweets = tweets.map(twt => {
		twt._id = twt.tweetID
		return twt
	})

	let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
	client = await client.connect()
	let collection = client.db("bigData").collection("tweets");

	// append new tweets
	for (let i in tweets) {
		let existingTweet = await collection.findOne({ _id: tweets[i]._id })
		if (existingTweet != null) continue
		await collection.insertOne(tweets[i])
	}

	await client.close();
}

export async function extractTweetFromDB(keywords) {

	let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
	client = await client.connect()
	let collection = client.db("bigData").collection("tweets");

	let query = {}
	
	for (let i in keywords) {
		query['keywords.' + keywords[i]] = { $exists: true }
	}

	let result = collection.find(query)
	let resultAsArray = await result.toArray()

	await client.close();

	return resultAsArray

}