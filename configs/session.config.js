const session = require('express-session');
const MongoStore = require('connect-mongo');


module.exports = (app) => {
  app.use(
    session({
      secret: "basic-auth-secret",
      resave: true,
      saveUninitialized: false, 
      cookie: { maxAge: 3600000 },
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/eventruck',
        ttl: 60 * 60 * 24 * 7 // Time to live - 7 days (14 days by)
      })
    })
  );
}

