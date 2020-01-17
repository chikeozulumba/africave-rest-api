const Joi = require('joi')
const dotenv = require('dotenv').config()

/**
 * Error on unsuccessful loading of .env
 */
if (dotenv.error) {
  throw new Error(`Problem loading .env file: ${dotenv.error.message}`)
}

/**
 * Validation schema for .env
 */
const schema = Joi.object({
  APP_NAME: Joi.string()
    .default('africave-rest-api'),
  NODE_ENV: Joi.string().lowercase().trim()
    .allow(['dev', 'prod', 'test', 'stage'])
    .default('dev'),
  PORT: Joi.number()
    .default(9100),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_PORT: Joi.string().required()
    .description('Mongo DB port'),
  MONGO_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().equal('dev'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign')
}).unknown().required()

const { error, value } = Joi.validate(process.env, schema)

if (error) {
  throw new Error(`.env validation error: ${error.message}`)
}

/**
 * Const to contain validated env vers
 */
const env = {
  appName: value.APP_NAME,
  nodeEnv: value.NODE_ENV,
  port: value.PORT,
  mongo: {
    host: value.MONGO_HOST,
    port: value.MONGO_PORT,
    debug: true
  },
  jwtSecret: value.JWT_SECRET
}

module.exports = env
