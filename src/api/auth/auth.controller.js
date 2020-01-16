const AuthService = require('./auth.service')

/**
 * Returns jwt token if valid mobileNumber and password is provided
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @property {string} req.body.password password of user
 * @returns {<{token, user}, Error>}
 */
async function login (req, res, next) {
  const response = await AuthService.loginuser(req.body)
  return res.status(response.code).json({ ...response })
}

/**
 * Returns jwt token if valid rregisteration credentials are valid
 * @property {string} req.body.email email of user
 * @property {string} req.body.username username of user
 * @property {string} req.body.mobileNumber mobileNumber of user
 * @property {string} req.body.password password of user
 * @property {string} req.body.fullName fullName of user
 * @returns {<{token, user}, Error>}
 */
async function register (req, res, next) {
  const response = await AuthService.registerUser(req.body)
  return res.status(response.code).json({
    ...response
  })
}

module.exports = {
  login,
  register
}
