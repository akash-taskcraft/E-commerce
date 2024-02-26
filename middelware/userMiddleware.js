const express = require('express');
const {User, UserRoles} = require("../models/userModel");
const Joi = require('joi');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware for request validation
exports.validateUser = (req, res, next) => {
  // Define a Joi schema for user validation
  const schema = Joi.object({
    user_name: Joi.string().alphanum().min(5).max(30).required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    age : Joi.number().required().min(0).max(100),
    role: Joi.string().valid('customer', 'admin', 'vendor').default('customer'),
    phone_number: Joi.string()
    .length(10)
    .pattern(/[6-9]{1}[0-9]{9}/)
    .required().messages({
      'string.pattern.base': 'Phone number is invalid'
    }),
    nationality: Joi.string().required(),
    password_digest: Joi.string()
    .pattern(/^(?=.*[A-Z])(?=.*[#!@$&*?<>',\[\]}{=\-)(^%`~+.:;_])(?=.*[0-9])(?=.*[a-z]).{8,}$/)
    .messages({
      'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.'
    })

  });

  // Validate the request body against the schema
  const { error, value } = schema.validate(req.body,{abortEarly: false});
  console.log(error)
  // If validation fails, send a 400 Bad Request response with error details
  if (error) {
        const errorDetails = error.details.reduce((acc, detail) => {
        acc[detail.context.key] = detail.message;
        return acc;
      }, {});
      return res.status(400).json({ errors: errorDetails });
  }

  // If validation passes, attach the validated data to the request object for further processing
  req.validatedData = value;

  // Continue to the next middleware or route handler
  next();
};


