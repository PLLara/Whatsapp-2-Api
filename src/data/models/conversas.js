"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Conversas = void 0;
const sequelize_1 = require("sequelize");
class Conversas extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('Conversas', {
            conversaId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
                field: 'conversa_id'
            },
            titulo: {
                type: sequelize_1.DataTypes.STRING(25),
                allowNull: false
            },
            descricao: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false
            },
            criadorId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                field: 'criador_id'
            },
            thumbnail: {
                type: sequelize_1.DataTypes.BLOB,
                allowNull: true
            }
        }, {
            tableName: 'conversas',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "conversas_pkey",
                    unique: true,
                    fields: [
                        { name: "conversa_id" },
                    ]
                },
            ]
        });
    }
}
exports.Conversas = Conversas;
