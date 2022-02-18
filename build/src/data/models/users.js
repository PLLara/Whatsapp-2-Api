"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const sequelize_1 = require("sequelize");
class Users extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('Users', {
            userId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                field: 'user_id'
            },
            nome: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            fone: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                unique: "users_fone_key"
            }
        }, {
            tableName: 'users',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "users_fone_key",
                    unique: true,
                    fields: [
                        { name: "fone" },
                    ]
                },
                {
                    name: "users_pkey",
                    unique: true,
                    fields: [
                        { name: "user_id" },
                    ]
                },
            ]
        });
    }
}
exports.Users = Users;
