import { getWordCountFromTweets } from "../model/twitter_wordcount.js"

export function getKeywordFromTweets(req, res) {
	let keywordQuery = req.body.keywords
	let pattern = RegExp("[, ]+")
	let keywords = keywordQuery.split(pattern)
	keywords = keywords.filter(s => s.length > 0)
	keywords = keywords.map(s => s.trim())
	getWordCountFromTweets(keywords).then((val) => {
		res.status(200).send(val)
	}).catch((err) => {
		res.status(400).send(err.message)
	})
}