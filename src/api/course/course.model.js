const Promise = require('bluebird')
const mongoose = require('mongoose')
const httpStatus = require('http-status')
const APIError = require('../../libs/APIError')

/**
 * User Schema
 */
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  modules: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Module'
  }],
  subscribers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  views: {
    type: Number,
    default: 0
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isApproved: {
    type: Boolean,
    enum: [true, false],
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Methods
 */
CourseSchema.method({})

/**
 * Statics
 */
CourseSchema.statics = {
  /**
   * Get Course
   * @param {Object} conditions - conditions to find user for
   * @returns {Promise<Course, Error>}
   */
  async get (conditions) {
    const user = await this.findOne(conditions).exec()
    if (user) {
      return user
    }
    const err = new APIError('No such user exists!', httpStatus.NOT_FOUND)
    return Promise.reject(err)
  },

  /**
   * List courses in decending order of 'createdAt' timestamp
   * @param {number} skip - Number of courses to be skipped
   * @param {number} limit - Limit number of courses to be returned
   * @returns {Promise<Course[], Error>}
   */
  async list ({
    skip = 0,
    limit = 50
  } = {}) {
    const courses = await this.find({
      isApproved: true
    })
      .sort({
        createdAt: -1
      })
      .skip(+skip)
      .limit(+limit)
      .populate('modules')
      .exec()
    return courses
  }
}

/**
 * @typedef Course
 */
module.exports = mongoose.model('Course', CourseSchema)
