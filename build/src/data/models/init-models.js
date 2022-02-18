"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initModels = exports.Users = exports.Participantes = exports.Conversas = void 0;
const conversas_1 = require("./conversas");
Object.defineProperty(exports, "Conversas", { enumerable: true, get: function () { return conversas_1.Conversas; } });
const participantes_1 = require("./participantes");
Object.defineProperty(exports, "Participantes", { enumerable: true, get: function () { return participantes_1.Participantes; } });
const users_1 = require("./users");
Object.defineProperty(exports, "Users", { enumerable: true, get: function () { return users_1.Users; } });
function initModels(sequelize) {
    const Conversas = conversas_1.Conversas.initModel(sequelize);
    const Participantes = participantes_1.Participantes.initModel(sequelize);
    const Users = users_1.Users.initModel(sequelize);
    Participantes.belongsTo(Conversas, { as: "conversa", foreignKey: "conversaId" });
    Conversas.hasMany(Participantes, { as: "participantes", foreignKey: "conversaId" });
    Conversas.belongsTo(Users, { as: "criador", foreignKey: "criadorId" });
    Users.hasMany(Conversas, { as: "conversas", foreignKey: "criadorId" });
    Participantes.belongsTo(Users, { as: "participante", foreignKey: "participanteId" });
    Users.hasMany(Participantes, { as: "participantes", foreignKey: "participanteId" });
    return {
        Conversas: Conversas,
        Participantes: Participantes,
        Users: Users,
    };
}
exports.initModels = initModels;
