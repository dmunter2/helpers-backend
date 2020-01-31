const db = require('../data/dbconfig')


module.exports = {
    add, 
    find,
    findBy,
    findById,
    remove,
    insert,

}



function add(user) {
    return db('users').returning('id').insert(user)
        .then(ids => {
            const [id] = ids;
            return findById(id);
        });
}

function find(){
    return db('users')
}

function findBy(filter) {
    return db('users').where(filter).first();
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