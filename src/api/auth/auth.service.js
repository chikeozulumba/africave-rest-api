const bcrypt = require('bcryptjs')
const httpStatus = require('http-status')

const User = require('../user/user.model')
const JWToken = require('../../libs/jwToken')
const APIError = require('../../libs/APIError')

class AuthService {
  async loginuser (credentials) {
    try {
      const user = await User.get({
        mobileNumber: credentials.mobileNumber
      })
      if (bcrypt.compareSync(credentials.password, user.password)) {
        const payload = {
          username: user.username,
          mobileNumber: user.mobileNumber
        }
        const token = JWToken.create(payload, '1d')
        return {
          code: httpStatus.CREATED,
          token,
          user: {
            _id: user._id,
            username: user.username,
            mobileNumber: user.mobileNumber
          }
        }
      }
      throw new APIError('Authentication error!', httpStatus.UNAUTHORIZED, true)
    } catch (error) {
      return {
        error,
        message: error.message || 'Authentication error!',
        code: error.status || httpStatus.BAD_REQUEST
      }
    }
  }

  async registerUser (credentials) {
    try {
      const checkUser = await User.findOne({
        email: credentials.email
      })

      if (!checkUser) {
        const user = await User.create({
          ...credentials,
          password: bcrypt.hashSync(credentials.password, bcrypt.genSaltSync(10))
        })
        const payload = {
          username: user.username,
          mobileNumber: user.mobileNumber
        }
        const token = JWToken.create(payload, '1d')
        return {
          code: httpStatus.ACCEPTED,
          token,
          user: {
            _id: user._id,
            username: user.username,
            mobileNumber: user.mobileNumber
          }
        }
      }
      throw new APIError('Credentials already in use!', httpStatus.CONFLICT, true)
    } catch (error) {
      return {
        error,
        message: error.message || 'Authentication error!',
        code: error.status || httpStatus.BAD_REQUEST
      }
    }
  }
}

module.exports = new AuthService()
