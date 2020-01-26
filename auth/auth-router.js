const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require('../config/secret');
const Userdb = require('../users/users-model');




router.post('/register', (req,res) => {
    
    if(!req.body.username || !req.body.password){
        res.status(500).json({message: "Please Enter a Username and Passowrd"})
    } else if(req.body.username && req.body.password){
        const user = req.body
        const hash = bcrypt.hashSync(user.password, 10)
        user.password = hash;

        Userdb.add(user)
            .then(user => {
                res.status(200).json({message: `${user.username} has been added to the system`})
            })
            .catch(err => {
                res.status(500).json({error: 'User has not been added'})
            })
    }
})



// router.post('/login', (req,res) => {
//     const {username, password} = req.body

// })








module.exports = router;















module.exports = router;
