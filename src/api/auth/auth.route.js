const { Router } = require('express')
const validate = require('express-validation')
const authParam = require('./auth.param')
const authCtrl = require('./auth.controller')
const authMiddleware = require('./auth.middleware')

const { postBodyValidation } = authMiddleware

const router = Router()

router.route('/login')
  /**
   * @api {post} /api/auth/login User Login
   * @apiName User Login
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} username Username of user
   * @apiParam (body) {String} password Password of user
   *
   * @apiSuccess {String} token JWT token
   * @apiError {Object} error Error response
   */
  .post(validate(authParam.login), authCtrl.login)

router.route('/register')
  /**
   * @api {post} /api/auth/register User register
   * @apiName User Register
   * @apiGroup Auth
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} email Email address of user
   * @apiParam (body) {String} mobileNumber Mobile Number of user
   * @apiParam (body) {String} fullName Full Name of user
   * @apiParam (body) {String} password Password of user
   *
   * @apiSuccess {String} token JWT token
   * @apiError {Object} error Error response
   */
  .post(postBodyValidation(authParam.register), authCtrl.register)

module.exports = router
