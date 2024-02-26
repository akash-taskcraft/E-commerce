var Admin = require('./userModel')
module.exports = Admin;

var User = require('./userModel')
class Admin extends User {
    static get role() {
      return 'admin';
    }
  }
module.exports = Admin;