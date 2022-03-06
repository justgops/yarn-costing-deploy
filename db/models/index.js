'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('../config/config');
//postgres://vdmtigqqlbkhca:1248460f600c4af10ac580606f71ba2702df9c15f254727a9cb66679442094b2@ec2-54-83-21-198.compute-1.amazonaws.com:5432/de3nlpe6p2230f
const sequelize = new Sequelize({
  database: "de3nlpe6p2230f",
  username: "vdmtigqqlbkhca",
  password: "1248460f600c4af10ac580606f71ba2702df9c15f254727a9cb66679442094b2",
  host: "ec2-54-83-21-198.compute-1.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // <<<<<<< YOU NEED THIS
    }
  }
,"define": { freezeTableName: true}
});
const db = {};

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log(config);

module.exports = db;


