const router = require('express').Router()
const Postdb = require('./post-model')
const restricted = require('../auth/auth-middleware')







router.get('/', (req,res) => {
    Postdb.find()
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "this error is coming from the getting new req" })
        })
})


router.get('/me', restricted, (req, res) => {
    const id = req.decodedJwt.userid
    // const id = req.body.id
    Postdb.findById(id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ message: "this error is coming from the posting me" })
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
            res.status(500).json({message: "this error is coming from the posting new section"})
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
            res.status(500).json({message: "the catch error is happening after the delete call"})
        })
})

router.put('/change', (req, res) => {
    const id = req.body.id;
    const changes = req.body;
    

    Postdb.findById(id)
        .then(scheme => {
            if (scheme) {
                Postdb.update(id, changes)
                    .then(updatedScheme => {
                        res.json(updatedScheme);
                    })
                    .catch(err => {
                        res.status(500).json({message: "There was an error"})
                    })
            } else {
                res.status(404).json({ message: 'Could not find scheme with given id' });
            }
        })
        .catch(err => {
            res.status(500).json({ message: 'Failed to update scheme' });
        });
});


module.exports = router ;