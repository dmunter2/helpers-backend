
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').unique()

        table    
            .string('username', 128)
            .unique()
            .notNullable()
        
        table
            .string('password', 128)
            .notNullable()
    })
        .createTable('posts', table => {
        table.increments('id').unique()

        table
            .string('title', 128)
            .notNullable()

        table
            .string('postdescript')
        
        table
            .date('date')


        table
            .integer('user_id').notNullable().unsigned().references('id').inTable('users')
    })
    .createTable('darkmode', table => {

        table
            .integer('user_id')
            .notNullable()
            .unsigned()
            .references('id')
            .inTable('users')
        
        table
            .boolean('is_dark')
    })
    .createTable('comments', table => {
        table.increments('id').unique()

        table
            .string('description')
        
        table
            .integer('post_id')
            .notNullable()
            .references('id')
            .inTable('posts')
    })

    .createTable('likes', table => {
        table
            .integer('post_id')
            .notNullable()
            .references('id')
            .inTable('posts')
        
        table
            .boolean('is_liked')
        
        table
            .integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
    })

  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users').dropTableIfExists('darkmode').dropTableIfExists('comments').dropTableIfExists('posts').dropTableIfExists('likes')
  
};
