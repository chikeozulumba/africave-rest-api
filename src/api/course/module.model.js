
// const Promise = require('bluebird')
const mongoose = require('mongoose')
// const httpStatus = require('http-status')
// const APIError = require('../../libs/APIError')

/**
 * User Schema
 */
const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Methods
 */
ModuleSchema.method({})

/**
 * Statics
 */
ModuleSchema.statics = {}

/**
 * @typedef Module
 */
module.exports = mongoose.model('Module', ModuleSchema)
