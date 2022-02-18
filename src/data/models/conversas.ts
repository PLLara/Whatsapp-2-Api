import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { Participantes, ParticipantesId } from './participantes';
import type { Users, UsersId } from './users';

export interface ConversasAttributes {
  conversaId: string;
  titulo: string;
  descricao: string;
  criadorId: string;
  thumbnail?: any;
}

export type ConversasPk = "conversaId";
export type ConversasId = Conversas[ConversasPk];
export type ConversasOptionalAttributes = "thumbnail";
export type ConversasCreationAttributes = Optional<ConversasAttributes, ConversasOptionalAttributes>;

export class Conversas extends Model<ConversasAttributes, ConversasCreationAttributes> implements ConversasAttributes {
  conversaId!: string;
  titulo!: string;
  descricao!: string;
  criadorId!: string;
  thumbnail?: any;

  // Conversas hasMany Participantes via conversaId
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
  // Conversas belongsTo Users via criadorId
  criador!: Users;
  getCriador!: Sequelize.BelongsToGetAssociationMixin<Users>;
  setCriador!: Sequelize.BelongsToSetAssociationMixin<Users, UsersId>;
  createCriador!: Sequelize.BelongsToCreateAssociationMixin<Users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof Conversas {
    return sequelize.define('Conversas', {
    conversaId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: 'conversa_id'
    },
    titulo: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    descricao: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    criadorId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      field: 'criador_id'
    },
    thumbnail: {
      type: DataTypes.BLOB,
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
  }) as typeof Conversas;
  }
}
