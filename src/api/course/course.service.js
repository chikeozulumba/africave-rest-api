const httpStatus = require('http-status')

const Course = require('./course.model')
const CourseModule = require('./module.model')
const APIError = require('../../libs/APIError')

class CourseService {
  async createCourse (data, user) {
    try {
      let course = await new Course({
        ...data.course,
        owner: user._id
      }).save()
      let modules = data.modules.map(module => ({
        ...module,
        course: course._id
      }))
      modules = await CourseModule.collection.insertMany(modules)
      await Course.findByIdAndUpdate({
        _id: course._id
      }, {
        modules: Object.values(modules.insertedIds)
      })
      return {
        code: httpStatus.CREATED,
        message: 'Course added successfully',
        course: {
          title: course.title,
          _id: course._id
        }
      }
    } catch (e) {
      let err = e
      if (err.code && err.code === 11000) {
        err = new APIError(err.errmsg, httpStatus.BAD_REQUEST, false)
      }
      if (!err.statusCode) err.statusCode = 500
      return err
    }
  }
}

module.exports = new CourseService()
