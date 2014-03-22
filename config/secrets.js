"use strict";

var db, twitter, facebook;

if ('production' === process.env.NODE_ENV) {
  db = 'mongodb://dbuser:dbpass@localhost:31407/boardapp';
  twitter = {
    consumerKey: 'twitter-consumer-key',
    consumerSecret: 'twitter-consumer-secret',
    callbackURL: '/auth/twitter/callback'
  };
  facebook = {
    clientID: 'facebook-client-id',
    clientSecret: 'facebook-client-secret',
    callbackURL: 'http://localhost/auth/facebook/callback'
  };

} else {
  db = 'localhost:17017/board';
  twitter = {
    consumerKey: 'twitter-consumer-key',
    consumerSecret: 'twitter-consumer-secret',
    callbackURL: '/auth/twitter/callback'
  };
  facebook = {
    clientID: 'facebook-client-id',
    clientSecret: 'facebook-client-secret',
    callbackURL: 'http://localhost/auth/facebook/callback'
  };
}

module.exports = {

  // session solt
  cookie: {
    salt: 'ohh2jeelah6eiGho7ropahbeiXu4phaV'
  },
  session: {
    secret: 'perae8oheob3miet9aemaiPeigh6uush'
  },
  jwt: {
    secret: 'heeJ5nee4Lacif5boo1sheogibeere2',
    options: {
      expiresInMinutes: 60 * 60 * 24 * 30
    }
  },
  db: db,
  facebook: facebook,
  twitter: twitter
};
