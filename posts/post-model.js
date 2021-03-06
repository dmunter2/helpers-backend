const db = require('../data/dbconfig')


module.exports = {
    add,
    remove, 
    findBy,
    findById, 
    insert,
    find,
    update

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



function findById(user_id) {
    return db('posts')
        .where({ user_id })
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
        .then(() => { return findById(id) })

}

async function update(id, changes, userid) {
    await db('posts')
        .where({ id })
        .update(changes)

    return findById(userid);
}








