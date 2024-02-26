var User = require('./userModel')
class Vendor extends User {
    static get role() {
      return 'vendor';
    }
  }
module.exports = Vendor;