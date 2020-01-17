'use strict'

const bcrypt = require('bcryptjs')
const supertest = require('supertest')
const httpStatus = require('http-status')
const faker = require('faker')

const app = require('../../index')
const User = require('../../api/user/user.model')

const salt = bcrypt.genSaltSync(10)

describe('auth specs', () => {
  describe('POST /api/auth/register', () => {
    let user = {
      username: faker.internet.userName(),
      fullName: faker.name.findName(),
      mobileNumber: faker.phone.phoneNumber(),
      password: 'pass123',
      email: faker.internet.email()
    }

    test('should return unauthorized', async (done) => {
      // cons
      supertest(app)
        .post('/api/auth/register')
        .send({ username: user.username, password: 'wrongpass' })
        .expect(httpStatus.BAD_REQUEST)
        .then(done())
        .catch(done)
    })

    test('should return signed user', async (done) => {
      const saveUser = new User({
        ...user,
        password: bcrypt.hashSync(user.password, salt)
      })
      await saveUser.save()
      supertest(app)
        .post('/api/auth/register')
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST)
        .then(done())
        .catch(done)
    })

    test('should return thrown error on duplicate credentials', async (done) => {
      supertest(app)
        .post('/api/auth/register')
        .send({ ...user })
        .expect(httpStatus.BAD_REQUEST)
        .then(done())
        .catch(done)
    })
  })

  describe('POST /api/auth/login', () => {
    let loginUser = {
      username: 'loginUser',
      fullName: 'Login User',
      mobileNumber: '+1234567890',
      password: 'pass123',
      email: 'email@rmail.com'
    }

    test('should return unauthorized if user credentials fail', async (done) => {
      const savedUser = new User({
        ...loginUser,
        mobileNumber: loginUser.mobileNumber + '1',
        username: loginUser.username + '1',
        email: faker.internet.email()
      })
      await savedUser.save()
      supertest(app)
        .post('/api/auth/login')
        .send({
          mobileNumber: savedUser.mobileNumber,
          password: 'wrongpass'
        })
        .expect(httpStatus.UNAUTHORIZED)
        .then(done())
        .catch(done)
    })

    test('should return unauthorized if user credentials are not found', async (done) => {
      supertest(app)
        .post('/api/auth/login')
        .send({ mobileNumber: '+2349000000000', password: 'wrongpass' })
        .expect(httpStatus.NOT_FOUND)
        .then(done())
        .catch(done)
    })

    test('should return user with JWT', async (done) => {
      let newUser = {
        username: faker.internet.userName(),
        fullName: faker.name.findName(),
        mobileNumber: faker.phone.phoneNumber(),
        password: bcrypt.hashSync('pass123', salt),
        email: faker.internet.email()
      }
      let saveNewUser = new User(newUser)
      await saveNewUser.save()
      supertest(app)
        .post('/api/auth/login')
        .send({
          mobileNumber: newUser.mobileNumber,
          password: 'pass123'
        })
        .then((res) => {
          expect(res.body).toHaveProperty('token')
          expect(res.body.token.split('.')).toHaveLength(3)
          expect(res.body.user).toHaveProperty('_id')
          expect(res.body.user.username).toEqual(loginUser.username)
          expect(res.body.user.mobileNumber).toEqual(loginUser.mobileNumber)
          expect(res.body.user).not.toHaveProperty('password')
          return done()
        })
        .catch(done)
      done()
    })
  })

  beforeAll(() => User.deleteMany({}, () => console.log('Documents cleared')))
  // afterAll(() => User.deleteMany({}, () => console.log('Documents cleared')))
})
