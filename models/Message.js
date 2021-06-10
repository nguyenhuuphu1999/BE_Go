const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('./sequelize');


class Message extends Model {}

Message.init({
    
    id: {
        type: DataTypes.NUMBER,
        primaryKey: true,
        autoIncrement: true,
      },
    name_user	:DataTypes.STRING,
    message:DataTypes.STRING,
    create_at:DataTypes.DATE
   
}, { 
    sequelize, 
    modelName: 'Message',
    tableName: 'bnb_message',
    timestamps: false
});


module.exports = Message