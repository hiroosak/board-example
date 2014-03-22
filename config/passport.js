'use strict';

var passport = require('passport')
  , secrets = require('./secrets')
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy = require('passport-twitter').Strategy
  , _ = require('underscore')
  , User = require('../app/models/user');


passport.use(new FacebookStrategy(secrets.facebook,
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ facebook: profile.id }, function(err, existingUser) {
      if (existingUser) {
        return done(null, existingUser);
      }
      var user = new User();
      user.facebook = profile.id;
      user.tokens.push({ kind: 'facebook', accessToken: accessToken });
      user.profile.name = profile.displayName;
      user.profile.picture = "http://graph.facebook.com/" + profile.id + "/picture?height=64&width=64&type=square";
      user.save(function(err) {
        done(err, user);
      });
    });
  }
));

passport.use(new TwitterStrategy(secrets.twitter,
  function(req, accessToken, tokenSecret, profile, done) {
    if (req.user) {
      User.findOne({twitter: profile.id}, function(err, existingUser) {
        if (existingUser) {
          req.flash('errors', { msg: 'There is already a Twitter account that belongs to you. Sign in with that account or delete it, then link it with your current account.' });
          done(err);
        } else {
          User.findById(req.user.id, function(err, user) {
            user.twitter = profile.id;
            user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
            user.profile.name = user.profile.name || profile.displayName;
            user.profile.picture = user.profile.picture || profile._json.profile_image_url;
            user.save(function(err) {
              req.flash('info', { msg: 'Twitter account has been linked.' });
              done(err, user);
            });
          });
        }
      });
    } else {
      User.findOne({ twitter: profile.id }, function(err, existingUser) {
        if (existingUser) {
          return done(null, existingUser);
        }
        var user = new User();
        user.twitter = profile.id;
        user.tokens.push({ kind: 'twitter', accessToken: accessToken, tokenSecret: tokenSecret });
        user.profile.name = profile.displayName;
        user.profile.picture = profile._json.profile_image_url;
        user.save(function(err) {
          done(err, user);
        });
      });
    }
  }
));

/**
 * session利用の場合は必要
 */
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id).exec(function (err, user) {
    done(null, user);
  });
});

exports.isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

exports.isAuthorized = function(req, res, next) {
  var provider = req.path.split('/').slice(-1)[0];
  if (_.findWhere(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect('/auth/' + provider);
  }
};
