import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Conversas, ConversasId } from './conversas';
import type { Users, UsersId } from './users';

export interface ParticipantesAttributes {
  id: string;
  participanteId: string;
  conversaId: string;
}

export type ParticipantesPk = "id";
export type ParticipantesId = Participantes[ParticipantesPk];
export type ParticipantesCreationAttributes = ParticipantesAttributes;

export class Participantes extends Model<ParticipantesAttributes, ParticipantesCreationAttributes> implements ParticipantesAttributes {
  id!: string;
  participanteId!: string;
  conversaId!: string;

  // Participantes belongsTo Conversas via conversaId
  conversa!: Conversas;
  getConversa!: Sequelize.BelongsToGetAssociationMixin<Conversas>;
  setConversa!: Sequelize.BelongsToSetAssociationMixin<Conversas, ConversasId>;
  createConversa!: Sequelize.BelongsToCreateAssociationMixin<Conversas>;
  // Participantes belongsTo Users via participanteId
  participante!: Users;
  getParticipante!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setParticipante!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createParticipante!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Participantes {
    return sequelize.define('Participantes', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    participanteId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      field: 'participante_id'
    },
    conversaId: {
      type: DataTypes.UUID,
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
  }) as typeof Participantes;
  }
}
