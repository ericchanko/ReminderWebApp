let database = require("../database");

let authController = {
  login: (req, res) => {
    //TODO change login to auth/login by implementing an authRoute
    // in the meantime, this works when getting to the homepage
    res.render("login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    // implement
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
