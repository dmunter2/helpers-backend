const router = require('express').Router()
const Postdb = require('./post-model')
const restricted = require('../auth/auth-middleware')







router.get('/', (req,res) => {
    Postdb.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


router.post('/new', restricted, (req,res) => {
    const today = new Date();
    const body = req.body;
    const item = {...body, user_id: req.decodedJwt.userid, date: today}
    Postdb.add(item)
        .then(() => {
            res.status(200).json({message: `The post of '${body.title}' has been added`})
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.delete('/delete', restricted, (req,res) => {

    const id = req.decodedJwt.userid
    const postId = req.body.id

    Postdb.remove(postId, id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})




module.exports = router;