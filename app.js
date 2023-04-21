import Server from './models/server.js';

const server = new Server();

await server.conectarDB();
server.listen();