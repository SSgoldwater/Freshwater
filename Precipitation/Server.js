var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var precipitation = express();
var router = express.Router();
var pg = require('pg');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

var client = new pg.Client({ database: "freshwater_dev" });
;

router.get('/users', function(req, res) {
  client.connect(function(err) {
    if (err) throw err;
    client.query("SELECT * FROM users", function(err, result) {
      if (err) {
        throw err;
      } else {
        console.log(result.rows);
        res.json({ rows: result.rows });
      }
    });
  });
});

precipitation.use('/api', router);
precipitation.use(bodyParser.urlencoded({ extended: true }));
precipitation.use(bodyParser.json());

// precipitation.listen(8080);


// Testing Facebook Login
var app = express();
var facebook_api_key = "239746973163692";
var facebook_api_secret = "8d9a97a8191d34e306b6dc1e17a98ec2";
var callback_url = "http://localhost:8081/auth/facebook/callback";

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new FacebookStrategy({
    clientID: facebook_api_key,
    clientSecret: facebook_api_secret,
    callbackURL: callback_url,
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      console.log(profile._json.picture);
      return done(null, profile);
    });
  }
));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(session({
  secret: 'keyboard cat',
  key: 'sid',
  resave: true,
  saveUninitialized: true
}));

app.get("/", function(req, res) { res.send('Home') });

app.get("/login", passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { 
       failureRedirect: '/login' 
  }),
  function(req, res) {
    console.log('redirecting');
    res.redirect('/');
  });

app.listen("8081");
