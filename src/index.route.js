const express = require('express')
const userRoutes = require('./api/user/user.route')
const authRoutes = require('./api/auth/auth.route')
const courseRoutes = require('./api/course/course.route')
const subscriptionRoutes = require('./api/subscription/subscription.route')

const router = express.Router()

/**
 * @api {get} /api Health Check
 * @apiName Health Check
 * @apiGroup API
 * @apiVersion 1.0.0
 *
 * @apiParam none
 *
 * @apiSuccess {String} OK Success Response
 * @apiError {Object} error Error Response
 */
router.get('/', (req, res) => res.send('OK'))

/**
 * @apiDescription Mounts user routes at /users
 * @apiGroup User
 */
router.use('/users', userRoutes)

/**
 * @apiDescription Mounts auth routes at /auth
 * @apiGroup Auth
 */
router.use('/auth', authRoutes)

/**
 * @apiDescription Mounts courses routes at /courses
 * @apiGroup Course
 */
router.use('/courses', courseRoutes)

/**
 * @apiDescription Mounts courses routes at /courses
 * @apiGroup Course
 */
router.use('/subscriptions', subscriptionRoutes)

module.exports = router
