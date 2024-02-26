let mongoose = require('mongoose');
UserRoles = {
    ADMIN: 'admin',
    VENDOR: 'vendor',
    CUSTOMER: 'customer'
  };
  
var userSchema = mongoose.Schema({
    user_name: String,
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    role: {
        type: String,
        enum: Object.values(UserRoles), // Enforce the role to be one of the defined values
        default: UserRoles.CUSTOMER, // Set a default role if none is provided
    },
    phone_number: Number,
    nationality: String,
    password_digest: String,
    profile_image: {
      public_id: String,
      url: String
    }
 },{collection: 'User', timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'modifiedAt'
 }});
module.exports = mongoose.model('User', userSchema);

 