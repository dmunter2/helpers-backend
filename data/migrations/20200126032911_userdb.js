
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
        users.increments('id')

        users    
            .string('username', 128)
            .unique()
            .notNullable()
        
        users
            .string('password', 128)
            .notNullable()
    })
    .createTable('posts', posts => {
        posts.increments('id')

        posts
            .string('title', 128)
            .notNullable()

        posts
            .string('postdescript')
        
        posts
            .date('date')


        posts
            .integer('users_id').notNullable().unsigned().references('users.id')
    })
    .createTable('darkmode', darkmode => {
        darkmode
            .integer('users_id')
            .notNullable()
            .unsigned()
            .references('users.id')
        
        darkmode
            .boolean('mode')
    })
    .createTable('comments', comments => {
        comments.increments('id')

        comments
            .string('description')
        
        comments
            .integer('post_id')
            .notNullable()
            .references('posts.id')
    })

    .createTable('likes', likes => {
        likes
            .string('post_id')
            .notNullable()
            .references('posts.id')
        
        likes
            .boolean('liked')
        
        likes
            .integer('user_id')
            .notNullable()
            .references('users.id')
    })

  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('darkmode').dropTableIfExists('likes').dropTableIfExists('comments').dropTableIfExists('posts')
  
};
