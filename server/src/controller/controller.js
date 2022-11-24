import { getWordCountFromTweets } from "../model/twitter_wordcount.js"

export function getKeywordFromTweets(req, res) {

	let keywordQuery = req.body.keywords

	// split keyword query string into each keyword
	let pattern = RegExp("[, ]+")
	let keywords = keywordQuery.split(pattern)

	// trim out whitespaces
	keywords = keywords.map(s => s.trim())

	// filter out empty string
	keywords = keywords.filter(s => s.length > 0)

	getWordCountFromTweets(keywords).then((val) => {
		console.log("word count success")
		res.status(200).send(val)
	}).catch((err) => {
		console.log(err)
		res.status(400).send(err.message)
	})
	
}