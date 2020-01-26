
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id')

        table    
            .string('username', 128)
            .unique()
            .notNullable()
        
        table
            .string('password', 128)
            .notNullable()
    })
        .createTable('posts', table => {
        table.increments('id')

        table
            .string('title', 128)
            .notNullable()

        table
            .string('postdescript')
        
        table
            .date('date')


        table
            .integer('users_id').notNullable().unsigned().references('users.id')
    })
    .createTable('darkmode', table => {
        table
            .integer('users_id')
            .notNullable()
            .unsigned()
            .references('users.id')
        
        table
            .boolean('is_dark')
    })
    .createTable('comments', table => {
        table.increments('id')

        table
            .string('description')
        
        table
            .integer('post_id')
            .notNullable()
            .references('posts.id')
    })

    .createTable('likes', table => {
        table
            .string('post_id')
            .notNullable()
            .references('posts.id')
        
        table
            .boolean('is_liked')
        
        table
            .integer('user_id')
            .notNullable()
            .references('users.id')
    })

  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('darkmode').dropTableIfExists('likes').dropTableIfExists('comments').dropTableIfExists('posts')
  
};
