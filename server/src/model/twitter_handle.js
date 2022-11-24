import Twitter from 'twitter';

// Init .env 
import dotenv from "dotenv"
dotenv.config()

const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
});

/**
 * 
 * @param {*} params 
 * @returns {Promise<Object[]>} statuses
 */
export function searchTweet(params) {
	return new Promise((resolve, reject) => {
		twitterClient.get('search/tweets', params, function(error, tweets) {
			if (!error) {
				resolve(tweets.statuses)
				return
			}
			console.error(error)
			reject(error)
		})
	})
}