var express = require('express');
const router = require("express").Router();
const upload = require('../services/upload');
const {isTokenValid} = require('../middelware/authMiddleware')
const {validateUser} = require('../middelware/userMiddleware')
//const validateProfileImage = require('../middelware/profileMiddleware')
const userData = require('../controller/usersController');
router.post('/users',upload.single('profile_image'),validateUser, userData.createUser);
router.post('/login', userData.loginUser);
router.post('/users/:id', upload.single('profile_image'),isTokenValid, userData.updateProfile);
router.get('/users/getProfile',isTokenValid, userData.getProfile)
module.exports = router; 