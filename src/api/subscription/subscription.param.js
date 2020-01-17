const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)

module.exports = {
  /**
   * @apiName Create Subscription
   * @apiGroup Subscription
   */
  create: {
    body: {
      course: Joi.objectId(),
      dateSubscribed: Joi.string().required(),
      activeDays: Joi.array().items(Joi.valid('all', 'monday', 'tuesday', 'wednessday', 'thursday', 'friday', 'saturday', 'sunday')),
      deliveryTime: Joi.string().required(),
      timezone: Joi.string().required()
    }
  },

  /**
   * @apiName Get Subscription
   * @apiGroup Subscription
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
   * @apiName Update Subscription
   * @apiGroup Subscription
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
   * @apiName List Subscriptions
   * @apiGroup Subscription
   */
  list: {
    query: {
      skip: Joi.string(),
      limit: Joi.string(),
      owner: Joi.objectId()
    }
  },

  /**
   * @apiName Delete Subscription
   * @apiGroup Subscription
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
