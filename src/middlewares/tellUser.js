const router = require('express').Router();
const UserModel = require('../')
const users = require('../data/users');
const admins = require('../data/admins');

const tellUser = (role) => (req, res, next) => {
    const { userName } = req.query;
    if (role === "admin"){
     req.user = admins[userName];
     next();
     return;
    }
    req.user = users[userName];
   
    next();
 }

export {tellUser};