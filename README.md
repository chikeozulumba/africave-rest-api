# AFRICAVE API

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
- [Node.js](https://nodejs.org/en/) v12.13.1 or higher to support [ES2018](https://node.green/) syntax.
- [MongoDB](https://www.mongodb.com/) v3.0.x or higher [[more](https://mongoosejs.com/docs/compatibility.html)].

### **Initial Setup**
```sh
# Clone the repo
$ git clone https://github.com/chikeozulumba/africave-rest-api.git africave-rest-api

# Change directory to newly created one
$ cd africave-rest-api

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

### **Docker**
```sh
# Clone the repo
$ git clone https://github.com/chikeozulumba/africave-rest-api.git africave-rest-api

# Change directory to newly created one
$ cd africave-rest-api

# Docker compose
$ docker-compose up
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
