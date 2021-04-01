const userModel = require("../database").userModel;
const dataModel = require("../database").database;


const getUserByEmailIdAndPassword = (email, password) => {
  let user = userModel.findOne(email);
  if (user) {
    if (isUserValid(user, password)) {
      return user;
    }
  }
  return null;
};
const getUserById = (id) => {
  let user = userModel.findById(id);
  if (user) {
    return user;
  }
  return null;
};

function isUserValid(user, password) {
  return user.password === password;
}

const getDataModel = (req, res) => {
  res.render("reminder/frens", {dataModel: dataModel});
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
  getDataModel
};
