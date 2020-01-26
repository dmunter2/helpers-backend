const db = require('../data/dbconfig')


module.exports = {
    add, 
    find,
    findById,
    remove,
    insert,

}



async function add(user){
    const [id] = await db('users').insert(user)
    return findById(id)
}

function find(){
    return db('users').select('username')
}

function findById(id){
    return db('users')
        .where({id})
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