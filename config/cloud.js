var cloudinary = require("cloudinary").v2;
const cloudConnect = () => {
    cloudinary.config({
        cloud_name: "dtdj3qisb",
        api_key: "346214835419977",
        api_secret: "BVHcxoex3FfoV_97eZS7OdTrJB0",
        secure: true,
    });    
};

module.exports = cloudConnect;
