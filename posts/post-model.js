const db = require('../data/dbconfig')


module.exports = {
    add,
    remove, 
    findBy,
    findById, 
    insert,
    find

}




function add(user) {
    return db('posts').returning('id').insert(user)
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function find() {
    return db('posts')
}

function findBy(filter) {
    return db('posts').where(filter)
}



function findById(id) {
    return db('posts')
        .where({ id })
        .first()
}

function insert(user) {
    return db('posts')
        .insert(user)
        .then(ids => {
            return getById(ids[0]);
        });
}

function remove(postId, id) {
    return db('posts')
        .where('id', postId)
        .del()
        .then(() => { return findBy(id) })

}



