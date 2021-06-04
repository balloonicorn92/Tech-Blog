const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create User model 
class User extends Model {
    verifyPassword(loginPassword) {
            //verify that the password entered matches the user password
        return bcrypt.compareSync(loginPassword, this.password)
    }
};

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            // validate: {
            //     len: [8]
            // }
        }
    },
    {
        hooks: {
             //we want a hook that will catch password just before it is created
            async beforeCreate(newUser) {
                newUser.password = await bcrypt.hash(newUser.password, 10);
                return newUser;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updateUser) {
                updateUser.password = await bcrypt.hash(updatedUser.password, 10)
                return updateUser;
            }
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User; 