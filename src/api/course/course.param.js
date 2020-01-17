const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  /**
   * @apiName Create Course
   * @apiGroup Course
   */
  create: {
    body: {
      course: Joi.object({
        title: Joi.string().required()
      }),
      modules: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        length: Joi.number().required()
      }))
    }
  },

  /**
   * @apiName Get Course
   * @apiGroup Course
   */
  get: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      courseId: Joi.string().required()
    }
  },

  /**
   * @apiName Update Course
   * @apiGroup Course
   */
  update: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      courseId: Joi.string().required()
    },
    body: {
      title: Joi.string().required()
    }
  },

  /**
   * @apiName List Courses
   * @apiGroup Course
   */
  list: {
    query: {
      skip: Joi.string(),
      limit: Joi.string(),
      owner: Joi.objectId()
    }
  },

  /**
   * @apiName Delete Course
   * @apiGroup Course
   */
  remove: {
    headers: {
      authorization: Joi.string().required()
    },
    params: {
      courseId: Joi.objectId().required()
    }
  }
}
