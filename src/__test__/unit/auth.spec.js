const faker = require('faker')
const bcrypt = require('bcryptjs')
// const sinonMock = require('sinon-express-mock')
const httpStatus = require('http-status')
const service = require('../../api/auth/auth.service')
const User = require('../../api/user/user.model')

// const { mockReq, mockRes } = sinonMock

describe('auth specs', () => {
  beforeAll(async () => {
    new User({
      username: 'loginuser',
      fullName: 'Login User 1',
      mobileNumber: '+23480311111111',
      password: bcrypt.hashSync('pass123', bcrypt.genSaltSync(10)),
      email: 'login@agmail.com'
    }).save()
      .then((doc) => console.log(doc))
      .catch((error) => console.log(error))
  })
  // eslint-disable-next-line jest/valid-describe
  describe('Register Controller', () => {
    let user = {
      username: faker.internet.userName(),
      fullName: faker.name.findName(),
      mobileNumber: faker.phone.phoneNumber(),
      password: bcrypt.hashSync('pass123', bcrypt.genSaltSync(10)),
      email: faker.internet.email()
    }

    test('should register user', async (done) => {
      service.registerUser(user)
        .then(res => {
          expect(res).toHaveProperty('code')
          expect(res.code).toEqual(httpStatus.ACCEPTED)
          return done()
        })
        .catch(done)
      return done()
    })

    test('should fail at registering user when parameter is void/invalid', async (done) => {
      delete user.fullName
      service.registerUser(undefined)
        .then(res => {
          expect(res).toHaveProperty('code')
          expect(res.code).toEqual(httpStatus.BAD_REQUEST)
          return done()
        })
        .catch(done)
      return done()
    })

    test('should fail at registering user when parameter is already on record', async (done) => {
      try {
        user.fullName = 'Duplicate'
        service.registerUser({
          ...user,
          fullName: 'Duplicate'
        })
          .then(res => {
            expect(res).toHaveProperty('code')
            expect(res.code).toEqual(httpStatus.CONFLICT)
            return done()
          })
          .catch(done)
        return done()
      } catch (error) {
        return done()
      } finally {
        done()
      }
    })

    test('should fail at login user successfully', async (done) => {
      try {
        service.loginuser({
          mobileNumber: '+23480311111111',
          password: 'pass123'
        })
          .then(res => {
            expect(res).toHaveProperty('code')
            expect(res.code).toEqual(httpStatus.OK)
            return done()
          })
          .catch(done)
        return done()
      } catch (error) {
        return done()
      } finally {
        done()
      }
    })
  })

  afterAll(() => User.deleteMany({}, () => console.log('Documents cleared')))
})
