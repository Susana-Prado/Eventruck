const session = require('express-session');
const MongoStore = require('connect-mongo');


module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SECRET,
      resave: true,
      saveUninitialized: false, 
      cookie: { maxAge: 3600000 },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 60 * 60 * 24 * 7 // Time to live - 7 days (14 days by)
      })
    })
  );
}

