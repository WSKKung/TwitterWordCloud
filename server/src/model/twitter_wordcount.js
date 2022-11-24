import { searchTweet } from "./twitter_handle.js";
import WinkNLP from "wink-nlp"
import EngNLPModel from "wink-eng-lite-web-model"
import { extractTweetFromDB, insertTweetIntoDB } from "./database_handle.js";

const nlp = WinkNLP(EngNLPModel)
const its = nlp.its
const as = nlp.as

async function fetchTweets(keywords) {

	let query = keywords.concat("-is:retweet").join(" ")

	let searchParams = {
		q: query,
		lang: "en",
		tweet_mode: "extended"
	}

	let tweets = await searchTweet(searchParams)
	return tweets
}

export function extractKeywordFromTweet(tweet) {
	let text = tweet.full_text
	let doc = nlp.readDoc(text)
	let extractedKeywords = []
	doc.tokens().each(e => {
			// filter out stopwords
			if (e.out(its.stopWordFlag)) return
			switch (e.out(its.type)) {
				// filter in only word, mentions and hashtag
				case 'word':
					// filter out RT message (from quoted retweet)
					if (e.out() == 'RT') return
					extractedKeywords.push(e.out().toLowerCase())
					break
				case 'hashtag':
				case 'mention':
					extractedKeywords.push(e.out().toLowerCase())
					break
			}
	})

	return as.bow(extractedKeywords)
}

export async function getWordCountFromTweets(keywords) {
	let newTweets = await fetchTweets(keywords)
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
	await insertTweetIntoDB(newTweets)
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