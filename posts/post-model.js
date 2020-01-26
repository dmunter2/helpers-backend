const db = require('../data/dbconfig')


module.exports = {
    add,
    remove, 
    findBy,
    findById, 
    insert,
    find

}




async function add(post) {
    const [id] = await db('posts').insert(post)
    return findById(id)
}

function find() {
    return db('users').select()
}

function findBy(filter) {
    return db('users').where(filter)
}



function findById(id) {
    return db('posts')
        .where({ id })
        .first()
}

function insert(user) {
    return db('users')
        .insert(user)
        .then(ids => {
            return getById(ids[0]);
        });
}

function remove(id) {
    return db('users')
        .where('id', id)
        .del();
}