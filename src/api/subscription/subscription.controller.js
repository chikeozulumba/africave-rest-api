const _ = require('lodash')

const Subscription = require('./subscription.model')
const User = require('../user/user.model')
const service = require('./subscription.service')

/**
 * Load course and append to req object
 */
async function load (req, res, next, id) {
  try {
    req.course = await User.get({ '_id': id })
    return next()
  } catch (e) {
    next(e)
  }
}

/**
 * Get course
 * @property {string} req.params.courseId _id of course
 * @returns {<Subscription, Error>}
 */
function get (req, res, next) {
  const course = req.course
  const sendUser = _.pick(course, ['_id', 'coursename', 'mobileNumber'])
  return res.json(sendUser)
}

/**
 * Create new course
 * @property {string} req.body.coursename coursename of course
 * @property {string} req.body.mobileNumber mobileNumber of course
 * @property {string} req.body.password password of course
 * @returns {<Subscription, Error>}
 */
async function create (req, res, next) {
  const response = await service.createSubscription(req.body, req.user)
  return res.status(response.statusCode || response.code).json({ ...response })
}

/**
 * Update course
 * @property {string} req.params.courseId _id of course
 * @property {string} req.body.mobileNumber mobileNumber of course
 * @returns {<Subscription, Error>}
 */
async function update (req, res, next) {
  try {
    const course = req.course
    course.mobileNumber = req.body.mobileNumber
    const savedUser = await course.save()
    const sendUser = _.pick(savedUser, ['_id', 'coursename', 'mobileNumber'])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

/**
 * List courses
 * @property {string} req.params.limit number of courses to be listed
 * @property {string} req.params.skip number of courses to be skipped
 * @returns {<Subscription[], Error>}
 */
async function list (req, res, next) {
  try {
    const courses = await Subscription.list(req.query)
    return res.json(courses)
  } catch (e) {
    next(e)
  }
}

/**
 * Delete course
 * @property {string} req.params.courseId _id of course
 * @returns {<Subscription, Error>}
 */
async function remove (req, res, next) {
  try {
    const course = req.course
    const deletedUser = await course.remove()
    const sendUser = _.pick(deletedUser, ['_id', 'coursename', 'mobileNumber'])
    return res.json(sendUser)
  } catch (e) {
    next(e)
  }
}

module.exports = {
  load,
  get,
  create,
  list,
  update,
  remove
}
