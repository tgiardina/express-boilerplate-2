require('dotenv').config({ path: `${__dirname}/.env` });

module.exports = {
  "type"                : "mysql",
  "host"                : process.env.MYSQL_HOST,
  "port"                : process.env.MYSQL_PORT,
  "username"            : process.env.MYSQL_USER,
  "password"            : process.env.MYSQL_PASSWORD,
  "database"            : process.env.MYSQL_DATABASE,
  "synchronize"         : false,
  "logging"             : false,
  "entities"            : [
    "src/entities/**/*.ts"
  ],
  "migrations"          : [
    "migrations/**/*.ts"
  ],
  "subscribers"         : [
    "src/subscribers/**/*.ts"
  ],
  "cli"                 : {
    "entitiesDir"    : "src/entities",
    "migrationsDir"  : "migrations",
    "subscribersDir" : "src/subscribers"
  }
}
