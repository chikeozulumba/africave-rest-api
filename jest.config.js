// const {
//   readFileSync
// } = require('fs')
// const babelConfig = JSON.parse(readFileSync('./.babelrc', 'utf8'))

// require('@babel/register')()
// require('@babel/polyfill')

module.exports = {
  clearMocks: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['json', 'text', 'lcovonly', 'clover'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/index.js',
    '<rootDir>/src/config/express.js',
    '<rootDir>/src/config/mongoose.js',
    '<rootDir>/src/config/environment.js',
    '<rootDir>/node_modules/@hapi/joi/lib/errors.js',
    '<rootDir>/node_modules/(?!@hapi/joi).+\\.js$'
  ],
  testEnvironment: 'node',
  verbose: true,
  cache: false
}
