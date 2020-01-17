const httpStatus = require('http-status')
const JWToken = require('../libs/jwToken')

const acl = (...role) => (req, res, next) => {
  console.log('User  ------- ', req.user)
  const userRole = req.user.role
  if (!role.includes(userRole)) {
    return res.status(httpStatus.FORBIDDEN).json({
      message: 'You do not have sufficient permission to manage this resource.'
    })
  }
  return next()
}

const auth = (req, res, next) => {
  let authToken = req.headers['authorization']
  if (typeof authToken === 'string') {
    authToken = authToken.split(' ')[1]
    const user = JWToken.verifyToken(authToken)
    if (user !== null) {
      req.user = user
      return next()
    }
  }
  return res.status(httpStatus.UNAUTHORIZED).json({
    message: 'You are not authorized'
  })
}

module.exports = {
  acl,
  auth
}
