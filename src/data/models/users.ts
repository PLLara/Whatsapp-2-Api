import * as Sequelize from 'sequelize';
import { DataTypes, Model} from 'sequelize';
import type { Conversas, ConversasId } from './conversas';
import type { Participantes, ParticipantesId } from './participantes';

export interface UsersAttributes {
  userId: string;
  nome: string;
  fone: string;
}

export type UsersPk = "userId";
export type UsersId = Users[UsersPk];
export type UsersCreationAttributes = UsersAttributes;

export class Users extends Model<UsersAttributes, UsersCreationAttributes> implements UsersAttributes {
  userId!: string;
  nome!: string;
  fone!: string;

  // Users hasMany Conversas via criadorId
  conversas!: Conversas[];
  getConversas!: Sequelize.HasManyGetAssociationsMixin<Conversas>;
  setConversas!: Sequelize.HasManySetAssociationsMixin<Conversas, ConversasId>;
  addConversa!: Sequelize.HasManyAddAssociationMixin<Conversas, ConversasId>;
  addConversas!: Sequelize.HasManyAddAssociationsMixin<Conversas, ConversasId>;
  createConversa!: Sequelize.HasManyCreateAssociationMixin<Conversas>;
  removeConversa!: Sequelize.HasManyRemoveAssociationMixin<Conversas, ConversasId>;
  removeConversas!: Sequelize.HasManyRemoveAssociationsMixin<Conversas, ConversasId>;
  hasConversa!: Sequelize.HasManyHasAssociationMixin<Conversas, ConversasId>;
  hasConversas!: Sequelize.HasManyHasAssociationsMixin<Conversas, ConversasId>;
  countConversas!: Sequelize.HasManyCountAssociationsMixin;
  // Users hasMany Participantes via participanteId
  participantes!: Participantes[];
  getParticipantes!: Sequelize.HasManyGetAssociationsMixin<Participantes>;
  setParticipantes!: Sequelize.HasManySetAssociationsMixin<Participantes, ParticipantesId>;
  addParticipante!: Sequelize.HasManyAddAssociationMixin<Participantes, ParticipantesId>;
  addParticipantes!: Sequelize.HasManyAddAssociationsMixin<Participantes, ParticipantesId>;
  createParticipante!: Sequelize.HasManyCreateAssociationMixin<Participantes>;
  removeParticipante!: Sequelize.HasManyRemoveAssociationMixin<Participantes, ParticipantesId>;
  removeParticipantes!: Sequelize.HasManyRemoveAssociationsMixin<Participantes, ParticipantesId>;
  hasParticipante!: Sequelize.HasManyHasAssociationMixin<Participantes, ParticipantesId>;
  hasParticipantes!: Sequelize.HasManyHasAssociationsMixin<Participantes, ParticipantesId>;
  countParticipantes!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof Users {
    return sequelize.define('Users', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'user_id'
    },
    nome: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fone: {
      type: DataTypes.TEXT,
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
  }) as typeof Users;
  }
}
