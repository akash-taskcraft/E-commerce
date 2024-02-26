const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect("mongodb://localhost:27017/e_commerce")
    .then((data) => {
      console.log("Mongodb connected with server: 3000");
    });
};
module.exports = connectDatabase;

