import { Sequelize, DataTypes, UUIDV4 } from 'sequelize';
import { Conversas, initModels, Participantes, Users } from './models/init-models';

import { v4 as uuidv4 } from 'uuid';


enum PgResponseStatus {
  success,
  failure,
}

class PostgresResponse<PayloadType> {
  status: PgResponseStatus;
  message: string;
  payload: PayloadType;

  constructor(status: PgResponseStatus, message: string, payload: PayloadType) {
    this.status = status;
    this.message = message;
    this.payload = payload;
  }
}

export default class db {
  sequelize: Sequelize;
  models: {
    Conversas: typeof Conversas,
    Participantes: typeof Participantes,
    Users: typeof Users
  }
  constructor() {
    this.sequelize = new Sequelize({
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false // <<<<<<< YOU NEED THIS
        }
      },
      host: 'ec2-52-70-120-204.compute-1.amazonaws.com',
      database: 'd2t09buc90j96p',
      username: 'yncpbtnklwlult',
      port: 5432,
      password: '1b983e0103400943db2b5e10367d572b3c5912103e136c5fbb3ff0f5f5bc1d89',
      ssl: true,
    })
    this.models = initModels(this.sequelize)


  }
  // sequelize-auto -h ec2-52-70-120-204.compute-1.amazonaws.com -d d2t09buc90j96p -u yncpbtnklwlult -x 1b983e0103400943db2b5e10367d572b3c5912103e136c5fbb3ff0f5f5bc1d89 -p 5432 --dialect postgres -o ./models.ts

  async init() {
    await this.sequelize.authenticate();
    await this.sequelize.sync();
  }


  async getUser(fone: string): Promise<Users | null> {
    const query = await this.models.Users.findAll({ where: { fone: fone } });
    if (query.length > 0) {
      return query[0]
    }
    return null;
  }

  async getAllUsers(): Promise<Users[]> {
    return await this.models.Users.findAll()
  }

  async createConversa(titulo: string, descricao: string, criador: Users, thumbnail: string,) {
    return await this.models.Conversas.create({
      conversaId: uuidv4(),
      titulo: titulo,
      descricao: descricao,
      criadorId: criador.userId,
      thumbnail: thumbnail
    })
  }

  async getConversasFromUser(user: Users): Promise<Conversas[]> {
    return await user.getConversas()
  }

  async criarParticipacao(participante: Users, conversa: Conversas) {
    return await this.models.Participantes.create({
      id: uuidv4(),
      conversaId: conversa.conversaId,
      participanteId: participante.userId
    })
  }

  async getParticipacoesFromUser(user: Users):Promise<Participantes[]>{
    return await user.getParticipantes();
  }
}


// async function main() {
//   const database = new db();
//   // await database.sequelize.sync();

//   await database.sequelize.query('DELETE FROM USERS WHERE 1=1');


//   await Users.create({
//     userId: uuidv4(),
//     nome: 'lara',
//     fone: "+5563992375408"
//   })

//   await Users.create({
//     userId: uuidv4(),
//     nome: 'pedro',
//     fone:'+55992496492'
//   })

//   const lara = await database.getUser("+5563992375408")
//   const pedro = await database.getUser("+55992496492")

//   if (lara == null || pedro == null) {
//     return;
//   }

//   await database.createConversa('conversada do larazaadaaa', 'opa', lara, 'eita',);
//   const conversas = await database.getConversasFromUser(lara);
//   console.log(conversas[0].toJSON());
//   await database.criarParticipacao(pedro,conversas[0]);


//   console.log(await database.getParticipacoesFromUser(pedro));

// }
// main();


// class Postgres {
//   static final Postgres _singleton = Postgres._internal();
//   factory Postgres() {
//     return _singleton;
//   }
//   Postgres._internal();



//   Future<PostgresResponse<User?>> getUser(
//     String fone,
//   ) async {
//     PostgreSQLResult result = await connection.query(
//     "SELECT * FROM USERS WHERE FONE = @a",
//     substitutionValues: {
//     "a": fone
//   },
//   );

//   if (result.isNotEmpty) {
//       User user = User(id: result[0][0], nome: result[0][1], fone: result[0][2]);
//     return PostgresResponse(
//       PgResponseStatus.success,
//       "Success: User ${result.asMap()} exists!",
//       payload: user,
//     );
//   } else {
//     return const PostgresResponse(
//       PgResponseStatus.failure,
//       'Failure: User does not exist!',
//       payload: null,
//       );
//   }
// }

// Future < PostgresResponse < bool >> createUser(
//   String nome,
//   String fone,
// ) async {
//   var userExistsQuery = await getUser(fone);
//   var userDoesNotExists = (userExistsQuery).status == PgResponseStatus.failure;

//   if (userDoesNotExists) {
//     await connection.query(
//       "INSERT INTO USERS VALUES (@a, @b, @c)",
//       substitutionValues: {
//       "a": const Uuid().v4(),
//       "b": nome,
//       "c": fone
//     },
//     );

//     return const PostgresResponse(
//       PgResponseStatus.success,
//       "Success: User Created!",
//       payload: true,
//       );
//   } else {
//     return const PostgresResponse(
//       PgResponseStatus.failure,
//       'Failure: User Already Exists!',
//       payload: false,
//       );
//   }
// }

// Future < PostgresResponse < Conversa ?>> getConversa(String id) async {
//     PostgreSQLResult conversaQuery = await connection.query(
//   "select * from conversas where conversa_id = @conversaId",
//   substitutionValues: {
//   "conversaId": id
// },
// );
//   if (conversaQuery.isEmpty) {
//     return const PostgresResponse(
//       PgResponseStatus.failure,
//       'Failure: Conversa não encontrada',
//       payload: null,
//       );
//   }

//   var unparsedConversa = conversaQuery[0];
//     Conversa conversa = Conversa(
//     id: unparsedConversa[0],
//     titulo: unparsedConversa[1],
//     descricao: unparsedConversa[2],
//     criadorId: unparsedConversa[3],
//     thumbnail: unparsedConversa[4],
//   );

//   return PostgresResponse(
//     PgResponseStatus.success,
//     "Success: Conversa achada",
//     payload: conversa,
//   );
// }

// Future < PostgresResponse < List < Conversa >>> getAllConversasFromUserAdmin(
//   String fone,
// ) async {
//   var userQueryResult = await getUser(fone);
//   if (userQueryResult.status == PgResponseStatus.failure) {
//     return PostgresResponse(
//       PgResponseStatus.failure,
//       userQueryResult.message,
//       payload: [],
//     );
//   }
//     String userId = userQueryResult.payload!.id;

//     PostgreSQLResult allConversasQuery = await connection.query(
//     "select * from conversas where criador_id = @userId",
//     substitutionValues: {
//     "userId": userId
//   },
//   );

//   List < Conversa > conversas = allConversasQuery.map((conversa) {
//     return Conversa(
//       id: conversa[0],
//       titulo: conversa[1],
//       descricao: conversa[2],
//       criadorId: conversa[3],
//       thumbnail: conversa[4],
//     );
//   }).toList();

//   return PostgresResponse(
//     PgResponseStatus.failure,
//     userQueryResult.message,
//     payload: conversas,
//   );
// }

// Future < PostgresResponse > createConversa(
//   String titulo,
//   String descricao,
//   String fone,
// ) async {
//   var userQueryResult = await getUser(fone);
//   if (userQueryResult.status == PgResponseStatus.failure) {
//     return userQueryResult;
//   }
//     String criadorId = userQueryResult.payload!.id;

//   print("Usuario existe, criando conversa...");
//   var response = await connection.query(
//     'INSERT INTO CONVERSAS VALUES (@uuid, @titulo, @descricao, @criadorId)',
//     substitutionValues: {
//     "uuid": const Uuid().v4(),
//     "titulo": titulo,
//     "descricao": descricao,
//     "criadorId": criadorId,
//   },
//   );

//   return PostgresResponse<PostgreSQLResult>(
//     PgResponseStatus.success,
//     'Success: ',
//     payload: response,
//   );
// }

// Future < PostgresResponse < dynamic >> adicionarUsuarioNaConversa(
//   String conversaId,
//   String fone,
// ) async {
//   var userQueryResult = await getUser(fone);
//   if (userQueryResult.status == PgResponseStatus.failure) {
//     return userQueryResult;
//   }

//   await connection.query(
//     'INSERT INTO participantes values (@id,@participanteId, @conversaId)',
//     substitutionValues: {
//     "id": const Uuid().v4(),
//     "participanteId": userQueryResult.payload!.id,
//     "conversaId": conversaId
//   },
//   );

//   return const PostgresResponse<bool>(
//     PgResponseStatus.success,
//     'Deu certo, na teoria',
//     payload: true,
//     );
// }

// Future < PostgresResponse < List < Conversa >>> getAllConversasFromUserParticipante(String fone) async {
//   var userQueryResult = await getUser(fone);
//   if (userQueryResult.status == PgResponseStatus.failure) {
//     return PostgresResponse(
//       PgResponseStatus.failure,
//       userQueryResult.message,
//       payload: [],
//     );
//   }

//   var allConversasQuery = await connection.query(
//     "select * from conversas where conversa_id in(select conversa_id from participantes where participante_id = @userId)",
//     substitutionValues: {
//     "userId": userQueryResult.payload!.id
//   },
//   );


//   List < Conversa > conversas = allConversasQuery.map((conversa) {
//     return Conversa(
//       id: conversa[0],
//       titulo: conversa[1],
//       descricao: conversa[2],
//       criadorId: conversa[3],
//       thumbnail: conversa[4],
//     );
//   }).toList();


//   return PostgresResponse(
//     PgResponseStatus.success,
//     'Success: Deu certo',
//     payload: conversas,
//   );
// }
// }

// void main(List < String > args) async {
//   var postgres = Postgres();
//   await postgres.connection.open();
//   print(await postgres.adicionarUsuarioNaConversa('8aa6c5ba-64e2-48cf-b1b7-4688f2d9fe51', '+5563992496492'));
//   print((await postgres.getAllConversasFromUserParticipante('+5563992496492')).payload);

//   postgres.connection.close();
// }
