const { createServer } = require('http');
const { Server } = require('socket.io');
const Client = require('socket.io-client');

describe('Connection test', () => {
  let io; let serverSocket; let
    clientSocket;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address();
      clientSocket = new Client(`http://localhost:${port}`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should return the broadcast the message when a message is sended', (done) => {
    const msg = 'message';

    serverSocket.on('send_message', (message) => {
      expect(message).toBe(msg);
      done();
    });

    clientSocket.emit('send_message', msg);
  });
});
