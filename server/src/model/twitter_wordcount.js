import { searchTweet } from "./twitter_handle.js";
import WinkNLP from "wink-nlp"
import EngNLPModel from "wink-eng-lite-web-model"
import { extractTweetFromDB, insertTweetIntoDB } from "./database_handle.js";

const nlp = WinkNLP(EngNLPModel)
const its = nlp.its
const as = nlp.as

async function fetchTweets(keywords) {

	// filter out retweets
	let query = keywords.concat("-filter:retweets").join(" ")

	let searchParams = {
		q: query,
		lang: "en",
		count: 200,
		tweet_mode: "extended" // do not want the truncated text from tweets
	}

	let tweets = await searchTweet(searchParams)
	return tweets
}

export function extractKeywordFromTweet(tweet) {

	let text = tweet.full_text
	text = text.replace("&amp;", "&")

	let doc = nlp.readDoc(text)
	let extractedKeywords = []

	doc.tokens().each(e => {
			// filter out stopwords
			if (e.out(its.stopWordFlag)) return
			switch (e.out(its.type)) {
				// filter in only word, mentions and hashtag
				case 'word':
					// filter out short words
					if (e.out().length < 3) return
					extractedKeywords.push(e.out().toLowerCase())
					break
				case 'hashtag':
				case 'mention':
					extractedKeywords.push(e.out().toLowerCase())
					break
			}
	})

	// return as bag of words object
	return as.bow(extractedKeywords)
}

/**
 * 
 * @param {*} keywords 
 * @returns 
 */
export async function getWordCountFromTweets(keywords) {

	try {
		// try to fetch tweets from twitter api
		let newTweets = await fetchTweets(keywords)
		// transform to db entry
		newTweets = newTweets.map(tweet => {
			let keywords = extractKeywordFromTweet(tweet)
			return ({
				tweetID: tweet.id_str,
				userID: tweet.user.screen_name,
				username: tweet.user.name,
				text: tweet.full_text,
				keywords
			})
		})
		// insert into db
		await insertTweetIntoDB(newTweets)
	} catch (err) {
		// continue on error from twitter api
		console.log(err.message)
	}

	let tweets = await extractTweetFromDB(keywords)

	// Collect keywords from each tweets
	let bagOfWords = new Map()
	tweets.forEach(tweet => {
		let curKeys = Object.keys(tweet.keywords)
		curKeys.forEach(kw => {
			let prev = bagOfWords.get(kw) || 0
			bagOfWords.set(kw, prev + 1)
		})
	})

	// Collect map to array
	let wordCounts = []
	bagOfWords.forEach((cnt, kw) => {
		wordCounts.push({
			text: kw,
			value: cnt
		})
	})

	// sort by keyword count
	wordCounts = wordCounts.sort((a, b) => b.value - a.value)

	return wordCounts
}