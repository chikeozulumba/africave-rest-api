const httpStatus = require('http-status')

const postBodyValidation = (schema) => async (req, res, next) => {
  if (!schema) return next()
  if (!req.body) return next()
  try {
    await schema.validateAsync(req.body)
    return next()
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: error.details[0].message || error })
  }
}

module.exports = {
  postBodyValidation
}
