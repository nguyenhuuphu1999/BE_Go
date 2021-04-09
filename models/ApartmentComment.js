const { Sequelize, Model, DataTypes, STRING } = require('sequelize');
const sequelize = require('./sequelize');



class ApartmentComment extends Model {

}

// db..belongsTo(db.posts);


ApartmentComment.init({
  id_apartment: DataTypes.NUMBER,
  comment: DataTypes.STRING,
  rattings: DataTypes.NUMBER
}, { 
    
    sequelize, 
    modelName: 'ApartmentComment', 
    tableName: 'bnb_apartment_comment',
    timestamps: false
});


module.exports = ApartmentComment