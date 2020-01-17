const httpStatus = require('http-status')
const moment = require('moment-timezone')
const APIError = require('../../libs/APIError')
const Subscription = require('./subscription.model')
const Course = require('../course/course.model')

class CourseService {
  async createSubscription (data, user) {
    try {
      const course = await Course.findById(data.course)
      if (!course) {
        return {
          code: httpStatus.NOT_FOUND,
          message: 'Course not found'
        }
      }
      if (!course.isApproved) {
        return {
          code: httpStatus.FORBIDDEN,
          message: 'Course is not available for subscription.'
        }
      }
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

      const formattedTimezone = moment.tz(data.dateSubscribed, data.timezone).tz(timezone).format('HH:mm')
      const checkIfSubscriptionActive = await Subscription.find({
        course: course._id,
        subscriber: user._id
      })
      if (checkIfSubscriptionActive.length > 0) {
        return {
          code: httpStatus.CONFLICT,
          message: 'Course subscription active!',
          active: checkIfSubscriptionActive
        }
      }
      const subscription = await new Subscription({
        ...data,
        author: course.owner,
        subscriber: user._id,
        deliveryTime: formattedTimezone
      }).save()
      return {
        code: httpStatus.CREATED,
        subscription
      }
    } catch (e) {
      let err = e
      console.log(err)
      if (err.code && err.code === 11000) {
        err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
      }
      if (!err.statusCode) err.statusCode = 500
      return err
    }
  }
}

module.exports = new CourseService()
