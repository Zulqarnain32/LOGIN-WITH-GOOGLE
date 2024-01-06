require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");

const session = require("express-session");
const passport = require("passport");
const OAuth2Strategy = require("passport-google-oauth20").Strategy;

const UserModel = require("./model/UserSchema");

const port = 5000;
const clientId =
  "889302706488-e4t4u2vfa7rh48s7hokbk2admd38r53l.apps.googleusercontent.com";
const clientSecret = "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";

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/loginwithgoogle")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => console.log(err));

// Setup Session
app.use(
  session({
    secret: "123456789",
    resave: false,
    saveUninitialized: true,
  })
);

//Setup Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new OAuth2Strategy(
    {
      clientID: clientId,
      clientSecret: clientSecret,
      // callbackURL:'/auth/google/callback',
      callbackURL: "http://localhost:5000/auth/google/callback",
      scope: ["profile", "email"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        let user = await UserModel.findOne({ googleId: profile.id });
        if (!user) {
          user = new UserModel({
            googleId: profile.id,
            displayName: profile.displayName,
            image: profile.photos[0].value,
            email: profile.emails[0].value,
          });
          await user.save();
        }
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:5173/dashboard",
    failureRedirect: "http://localhost:5173/login",
  })
);

app.get("/login/success", async (req, res) => {
  console.log("request" + req.user);
  return res.json({ message: req.user });
});

app.listen(port, () => {
  console.log("server is running at port no 5000");
});
