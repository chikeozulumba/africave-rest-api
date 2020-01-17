const Joi = require('@hapi/joi')

const login = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

const register = Joi.object({
  fullName: Joi.string().required(),
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),
  password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: {
        allow: ['com', 'net']
      }
    }),
  mobileNumber: Joi.string().required(),
  role: Joi.string().valid('subscriber', 'author', 'admin').optional()
})

module.exports = {
  /**
   * @apiName User Login
   * @apiGroup Auth
   */
  login,
  /**
   * @apiName User Register
   * @apiGroup Auth
   */
  register
}
