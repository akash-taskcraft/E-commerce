
var User = require('./userModel')
class Customer extends User {
    static get role() {
      return 'customer';
    }
  }
module.exports = Customer;