const passport = require("../middleware/passport");

let authController = {
    login: (req, res) => {
        res.render("auth/login", { loggedIn: false });
    },

    register: (req, res) => {
        res.render("auth/register", { loggedIn: false });
    },

    loginSubmit: (req, res, next) => {
        passport.authenticate("local", {
            successRedirect: "/reminders",
            failureRedirect: "/login",
        })(req, res, next);
    },

    registerSubmit: (req, res) => {
        res.render("auth/register")
    },

    logout: (req, res) => {
        req.logout();
        res.redirect("/login")
    }
};

module.exports = authController;