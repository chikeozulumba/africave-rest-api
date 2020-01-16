const mongoose = require('mongoose')
const util = require('util')
const debug = require('debug')('africave-rest-api:index')

const env = require('./environment')

/**
 * make bluebird default Promise
 */
Promise = require('bluebird') // eslint-disable-line no-global-assign

/**
 * plugin bluebird promise in mongoose
 */
mongoose.Promise = require('bluebird')

/**
 * set Username and Password of user
 * enable 'useCreateIndex' for mongoose
 */
const mongoOption = {
  useCreateIndex: true,
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}

/**
 * connect to mongo db
 */
const mongoUri = env.mongo.host
mongoose.connect(mongoUri, mongoOption)
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database: ${mongoUri}`)
})

/**
 * print mongoose logs in dev env
 */
if (env.mongo.debug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc)
  })
}

module.exports = mongoose
