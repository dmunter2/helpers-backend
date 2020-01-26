// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullasDefault: true,
    connection: {
      filename: './social.db3'
    },
    migrations: {
      directory: './data/migrations'
    },

    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
  }},


    production: {
      client: 'pg',
      connection: process.env.DATABASE_URL,
      migrations: {
        directory: './data/migrations',
      },
      seeds: { directory: './data/seeds' }
    }
}


