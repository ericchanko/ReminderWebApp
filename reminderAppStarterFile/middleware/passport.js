const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const database = require("../database"); // or controller?


const localLogin = new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    },
    //TODO callback that can succesfully authenticate user
);
