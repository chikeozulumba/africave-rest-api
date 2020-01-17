const mongoose = require('mongoose')
// const httpStatus = require('http-status')
// const APIError = require('../../libs/APIError')

/**
 * Subscription Schema
 */
const SubscriptionSchema = new mongoose.Schema({
  subscriber: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course'
  },
  courseLength: {
    type: Number,
    default: 0
  },
  dateSubscribed: {
    type: String,
    required: true
  },
  activeDays: [{
    type: String,
    default: 'all',
    required: true
  }],
  deliveryTime: {
    type: String,
    required: true
  },
  timezone: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

/**
 * Methods
 */
SubscriptionSchema.method({})

/**
 * Statics
 */
SubscriptionSchema.statics = {
}

/**
 * @typedef Subscription
 */
module.exports = mongoose.model('Subscription', SubscriptionSchema)
