const router = require('express').Router();
const bcrypt = require('bcryptjs');
const Userdb = require('../users/users-model');
const secret = require('../config/secret');
const jwt = require('jsonwebtoken');
const restricted = require('./auth-middleware');




router.get('/', restricted, (req,res) => {
    Userdb.find()
    .then(user =>{
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({ message: "this error is coming from getting  /" })
    })
})

router.post('/register', (req,res) => {
    
    if(!req.body.username || !req.body.password){
        res.status(500).json({message: "Please Enter a Username and Password"})
    } else if(req.body.username && req.body.password){
        const user = req.body
        const hash = bcrypt.hashSync(user.password, 10)
        user.password = hash;

        Userdb.add(user)
            .then(user => {
                res.status(200).json({message: `${user.username} has been added to the system`})
            })
            .catch(err => {
                res.status(200).json({ message: "this error is coming from registering a new account" })
            })
    }
})



router.post('/login', (req,res) => {
    let {username, password} = req.body;
    Userdb.findBy({username})
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = genToken(user)
                res.status(200).json({
                    user_id: `${user.id}`,
                    username: `${user.username}`,
                    token: token,
                    message: `Welcome to Helperz.com ${user.username}` 
                })
                // res.status(200).json({message: "working"})
        } else{
            res.status(500).json({error: 'Invalid Credentials'})
        }
    })
    .catch(err => {
        res.status(500).json({error: "Username not found"})
    })
})




function genToken(user){

    const payload = {
        userid: user.id,
        username: user.username
    }
    const options = {expiresIn: "1h"}
    const token = jwt.sign(payload, secret.jwtSecret, options)

    return token;
};




module.exports = router;
