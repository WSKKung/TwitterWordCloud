# Twitter Word Cloud 

Word cloud generator from collections of tweets specified by user-defined keywords and hashtags.

## Requirements

This project requires [NodeJS](https://nodejs.org/en/download/) to run.

## Structures

The project consists of 2 main folders, client and server

- **client** : Frontend project which mainly focus on user interface. Uses React framework.
- **server** : Backend project which mainly focus on behind-the-scene functionality such as databases. Uses Express framework.

## Initialization

Before starting either server, the initialization step is required to setup all dependencies first.

Initialize by change the directory to the project directory.

- **client**: ```cd <path-to-project>/client```
- **server**: ```cd <path-to-project>/server```

Then, run the following command.

```npm install```

For **server**, you should create a new file named `.env` and fill in the following field to the file as the following format.
```
TWITTER_CONSUMER_KEY=<twitter-consumer-key>
TWITTER_CONSUMER_SECRET=<twitter-consumer-secret>
TWITTER_ACCESS_TOKEN=<twitter-access-token-key>
TWITTER_ACCESS_SECRET=<twitter-access-token-secret>
MONGODB_CONNECT_URI=<uri-to-mongodb-database-server>
```

Now, you should be ready to run the server in either folders.

## Running

Run the following command in either folder.

```
npm start
```

*Note that you should run both server in seperate console to fully test the project functionality.*