const { Router } = require('express')
const validate = require('express-validation')

const courseParam = require('./course.param')
const courseCtrl = require('./course.controller')
const middleware = require('../../middlewares/middleware')

const router = Router()

router.route('/')
  /**
   * @api {get} /api/courses List Courses
   * @apiName List Courses
   * @apiGroup Course
   * @apiVersion 1.0.0
   *
   * @apiParam none
   *
   * @apiSuccess {Array} courses List of courses
   * @apiError {Object} error Error response
   */
  .get(middleware.auth, middleware.acl('author', 'admin', 'subscriber'), validate(courseParam.list), courseCtrl.list)

  /**
   * @api {post} /api/courses Create Course
   * @apiName Create Course
   * @apiGroup Course
   * @apiVersion 1.0.0
   *
   * @apiParam (body) {String} coursename Coursename of course
   * @apiParam (body) {String} mobileNumber Mobile number of course
   * @apiParam (body) {String} password Password of course
   *
   * @apiSuccess {Object} courses List of courses
   * @apiError {Object} error Error response
   */
  .post(middleware.auth, middleware.acl('author', 'admin'), validate(courseParam.create), courseCtrl.create)

router.route('/:courseId')
  /**
   * @api {get} /api/courses/:courseId Get Course
   * @apiName Get Course
   * @apiGroup Course
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} courseId _id of course
   *
   * @apiSuccess {Object} course Details of course
   * @apiError {Object} error Error response
   */
  .get(middleware.auth,
    validate(courseParam.get),
    courseCtrl.get)

  /**
   * @api {put} /api/courses/:courseId Update Course
   * @apiName Update Course
   * @apiGroup Course
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} courseId _id of course
   * @apiParam (body) {String} mobileNumber Mobile number of course
   *
   * @apiSuccess {Object} courses List of courses
   * @apiError {Object} error Error response
   */
  .put(middleware.auth,
    validate(courseParam.update),
    courseCtrl.update)

  /**
   * @api {delete} /api/courses/:courseId Delete Course
   * @apiName Delete Course
   * @apiGroup Course
   * @apiVersion 1.0.0
   *
   * @apiParam (param) {String} courseId _id of course
   *
   * @apiSuccess {Object} course Deleted course details
   * @apiError {Object} error Error response
   */
  .delete(middleware.auth,
    validate(courseParam.remove),
    courseCtrl.remove)

module.exports = router
