import type { Sequelize } from "sequelize";
import { Conversas as _Conversas } from "./conversas";
import type { ConversasAttributes, ConversasCreationAttributes } from "./conversas";
import { Participantes as _Participantes } from "./participantes";
import type { ParticipantesAttributes, ParticipantesCreationAttributes } from "./participantes";
import { Users as _Users } from "./users";
import type { UsersAttributes, UsersCreationAttributes } from "./users";

export {
  _Conversas as Conversas,
  _Participantes as Participantes,
  _Users as Users,
};

export type {
  ConversasAttributes,
  ConversasCreationAttributes,
  ParticipantesAttributes,
  ParticipantesCreationAttributes,
  UsersAttributes,
  UsersCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const Conversas = _Conversas.initModel(sequelize);
  const Participantes = _Participantes.initModel(sequelize);
  const Users = _Users.initModel(sequelize);

  Participantes.belongsTo(Conversas, { as: "conversa", foreignKey: "conversaId"});
  Conversas.hasMany(Participantes, { as: "participantes", foreignKey: "conversaId"});
  Conversas.belongsTo(Users, { as: "criador", foreignKey: "criadorId"});
  Users.hasMany(Conversas, { as: "conversas", foreignKey: "criadorId"});
  Participantes.belongsTo(Users, { as: "participante", foreignKey: "participanteId"});
  Users.hasMany(Participantes, { as: "participantes", foreignKey: "participanteId"});

  return {
    Conversas: Conversas,
    Participantes: Participantes,
    Users: Users,
  };
}
