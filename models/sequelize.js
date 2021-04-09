const { Sequelize, Model, DataTypes } = require('sequelize');


const sequelize = new Sequelize('freedbtech_Go', 'freedbtech_nguyen huu phu', 'Nyc2019@', {
    host: 'freedb.tech',
    dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */

    
});




module.exports = sequelize