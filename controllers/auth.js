const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");


exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address." );
  if (validator.isEmpty(req.body.password))
    validationErrors.push("Password cannot be blank.");

  if (validationErrors.length) {
    return res.status(400).json({isError: true, msgs: validationErrors})
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({isError: true, msgs: [info.msg]})
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      res.status(200).json({isError: false, msgs: ["Success! You are logged in."]})
    });
  })(req, res, next);
};

exports.logout = (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.status(200).json({isError: false, msgs: ['Success! You are logged out.']});
  });
  }

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push("Please enter a valid email address.");
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push("Password must be at least 8 characters long");
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push("Passwords do not match" );

  if (validationErrors.length) {
    return res.status(400).json({isError: true, msgs: validationErrors});
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });

  User.findOne(
    {email: req.body.email},
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        return res.status(400).json({isError: true, msgs: ["Account with that email address already exists."]});
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.status(200).json({isError: false, msgs: ['Successfully registered!']});
        });
      });
    }
  );
};
