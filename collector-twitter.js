require('dotenv').config()

const TwitterStreamChannels = require('twitter-stream-channels')
  , MongoClient = require('mongodb').MongoClient
  , { omit, merge } = require('ramda')

const client = new TwitterStreamChannels(
    { 'consumer_key': process.env['TWITTER_CONSUMER_KEY']
    , 'consumer_secret': process.env['TWITTER_CONSUMER_SECRET']
    , 'access_token': process.env['TWITTER_TOKEN']
    , 'access_token_secret': process.env['TWITTER_TOKEN_SECRET']
    }
  )

const channels = require('./filter-keywords-twitter')

const stream = client.streamChannels({ track: channels })

function setupStreamListening (err, client) {
  const db = client.db(process.env['MONGO_DBNAME']);

  stream.on('channels', message => {
    db.collection('twitter').insert(
      merge(
        omit(['$channels', '$keywords'], message),
        { channels: message['$channels'], keywords: message['$keywords'] }
      )
    )
  })
}

MongoClient.connect(
  `mongodb://${process.env['MONGO_HOST']}:${process.env['MONGO_PORT']}/`,
  setupStreamListening
);
