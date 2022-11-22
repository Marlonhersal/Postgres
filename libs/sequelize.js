const { Sequelize } = require('sequelize');
const setupModels = require('../db/models')
const {config} = require('../config/config');

const options = {
    dialect: 'postgres',
    logging: config.isProd ? false: true,   
}

if(config.isProd){
    options.ssl = {
        rejectUnauthorized: false
    }
}

const sequelize = new Sequelize(config.dbUrl,options); // Se crea una instancia de Sequelize, ya gestiona el pooling.

setupModels(sequelize);

module.exports = sequelize;