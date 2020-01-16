# Node Rest Starter 🌿

[![Build Status](https://travis-ci.com/chikeozulumba/africave-rest-api.svg?branch=master)](https://travis-ci.com/chikeozulumba/africave-rest-api)
[![Coverage Status](https://coveralls.io/repos/github/chikeozulumba/africave-rest-api/badge.svg?branch=master)](https://coveralls.io/github/chikeozulumba/africave-rest-api?branch=master)
[![dependencies Status](https://david-dm.org/chikeozulumba/africave-rest-api/status.svg)](https://david-dm.org/chikeozulumba/africave-rest-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/6efa84bef371d1d8a145/maintainability)](https://codeclimate.com/github/chikeozulumba/africave-rest-api/maintainability)
[![Inline docs](http://inch-ci.org/github/chikeozulumba/africave-rest-api.svg?branch=master)](http://inch-ci.org/github/chikeozulumba/node-r`est-starter)
[![License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://img.shields.io/badge/license-MIT-brightgreen.svg)


## Technologies

- [Node.js](https://nodejs.org/en/), [Express](http://expressjs.com/), [Javascript](https://github.com/sorrycc/awesome-javascript), [npm](https://www.npmjs.com/) - core platform
- [Helmet](https://www.npmjs.com/package/helmet), [compression](https://www.npmjs.com/package/compression), [cors](https://www.npmjs.com/package/cors) - common middlewares
- [MongoDB](https://www.mongodb.com/), [Mongoose](https://mongoosejs.com/) - database and schema modeling
- [JWT](https://www.npmjs.com/package/jsonwebtoken), [express-jwt](https://www.npmjs.com/package/express-jwt) - generate and validate access token
- [ESLint](https://eslint.org/) - check and fix linting of code
- [Jest](https://jestjs.io/) - unit testing javascript code and api
- [Husky](https://www.npmjs.com/package/husky) - precommit hooks for git

## Getting Started

### **Prerequisites**
- [Node.js](https://nodejs.org/en/) v10.3.0 or higher to support [ES2018](https://node.green/) syntax.
- [MongoDB](https://www.mongodb.com/) v3.0.x or higher [[more](https://mongoosejs.com/docs/compatibility.html)].

### **Initial Setup**
```sh
# Clone the repo
$ git clone git@github.com:skarif2/node-rest-starter.git awesomeapi

# Change directory to newly created one
$ cd awesomeapi

# Install dependencies
$ npm install

# Setup environment
$ cp .env.example .env

# Start development server
$ npm start

# Watch for file changes
$ npm run start:watch

# Run server in debug mode
$ npm run start:debug
```

### **Testing**
```sh
# Run tests in normal mode
$ npm test

# Run tests in watch mode
$ npm run test:watch

# Generate coverage report for tests
$ npm run test:coverage
```

### **Linting**
```sh
# Lint code using ESLint
$ npm run lint
```

### **Docker**
```sh
# Build docker image
$ docker-compose build

# Start newly built image
$ docker-compose up
```

## Directory Structure
```txt
+
+---docs
+---src
|   +---__test__
|   +---api
|   |   +---auth
|   |   |      auth.controller.js
|   |   |      auth.param.js
|   |   |      auth.route.js
|   |   +---user
|   |   |      user.controller.js
|   |   |      user.model.js
|   |   |      user.param.js
|   |   |      user.route.js
|   +---config
|   |       environment.js
|   |       express.js
|   |       mongoose.js
|   +---libs
|   |       APIError.js
|   |       jwToken.js
|   +---middleware
|   |   index.js
|   |   index.route.js
|   package.json
|   .env
```
