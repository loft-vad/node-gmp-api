import { Sequelize } from "sequelize";

const DB_NAME = process.env.DB_NAME || "";
const DB_USER = process.env.DB_USER || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_HOST = process.env.DB_HOST || "";
const DB_PORT = Number(process.env.DB_PORT);

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  dialect: "postgres",
  host: DB_HOST,
  port: DB_PORT,
});

// const pg = require("pg");
// //or native libpq bindings
// //var pg = require('pg').native

// const conString = "postgres://fyuuuqai:y5hn60KQzLb_F8peEirRaENZZBWgSLJe@mouse.db.elephantsql.com/fyuuuqai"; //Can be found in the Details page
// const client = new pg.Client(conString);
// client.connect(function (err) {
//   if (err) {
//     return console.error("could not connect to postgres", err);
//   }
//   client.query('SELECT NOW() AS "theTime"', function (err, result) {
//     if (err) {
//       return console.error("error running query", err);
//     }
//     console.log(result.rows[0].theTime);
//     // >> output: 2018-08-23T14:02:57.117Z
//     client.end();
//   });
// });

export default sequelize;
