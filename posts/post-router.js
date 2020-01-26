const router = require('express').Router()
const Postdb = require('./post-model')
const restricted = require('../auth/auth-middleware')

router.get('/', restricted, (req,res) => {
    Postdb.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.post('/new', restricted, (req,res) => {
    const body = req.body
    const item = {...body, user_id: req.decodedJwt.userid, date: Date()}
    Postdb.add(item)
        .then(() => {
            res.status(200).json({message: `The post of '${body.title}' has been added`})
        })
})




module.exports = router;