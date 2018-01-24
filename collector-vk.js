require('dotenv').config()

const vkflow = require('vkflow')
  , rules = require('./filter-keywords-vk')
  , streamToMongoDB = require('stream-to-mongo-db').streamToMongoDB
  , JSONStream = require('JSONStream')

const dbConf =
  { dbURL: `mongodb://${
      process.env['MONGO_HOST']
    }:${
      process.env['MONGO_PORT']
    }/${
      process.env['MONGO_DBNAME']
    }`
  , collection: 'vk'
  }

const stream = vkflow(process.env['VK_SERVICE_KEY'], rules)
  .pipe(JSONStream.parse())
  .pipe(streamToMongoDB(dbConf))

stream.on('error', error => {
  console.log('STREAM ERROR', error)
})
