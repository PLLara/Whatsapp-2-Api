"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Participantes = void 0;
const sequelize_1 = require("sequelize");
class Participantes extends sequelize_1.Model {
    static initModel(sequelize) {
        return sequelize.define('Participantes', {
            id: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                primaryKey: true
            },
            participanteId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                field: 'participante_id'
            },
            conversaId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'conversas',
                    key: 'conversa_id'
                },
                field: 'conversa_id'
            }
        }, {
            tableName: 'participantes',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "participantes_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
    }
}
exports.Participantes = Participantes;
