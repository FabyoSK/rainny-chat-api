const request = require('supertest');
const app = require('../src/http');

describe('Room test', () => {
  let token;

  beforeEach(async () => {
    jest.setTimeout(20000);

    const user = await request(app)
      .post('/users')
      .send({
        username: 'fabyosk',
        password: 'fabyosk1234'
      });

    token = user.body.token;
  });

  afterEach(async () => {
    await truncate();
  });

  describe('Creating cases', () => {
    describe('Success cases', () => {
      it('should return 201 when creating a room successfully ', async () => {
        const response = await request(app)
          .post('/rooms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Room 01',
            password: '',
            max_participants: 10
          });
        expect(response.status).toBe(201);
      });
    });
    describe('Error cases', () => {
      it('should return 400 when creating a room with a inexsistent user', async () => {
        const response = await request(app)
          .post('/rooms')
          .set('Authorization', 'Bearer 1234567890')
          .send({
            name: 'Room 01',
            max_participants: 10
          });
        expect(response.status).toBe(400);
      });
    });
  });
  describe('Join cases', () => {
    describe('Success cases', () => {
      it('should return 200 when join in a room successfully', async () => {
        const room = await request(app)
          .post('/rooms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Room 01',
            password: 'password',
            max_participants: 10
          });

        const joinRoom = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${token}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });

        expect(joinRoom.status).toBe(200);
      });

      it('should be able to join in a room without limit if the room max_participants is 0', async () => {
        const room = await request(app)
          .post('/rooms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Room 01',
            password: 'password',
            max_participants: 0
          });

        const user1 = await request(app)
          .post('/users')
          .send({
            username: 'user1',
            password: 'password'
          });

        const user2 = await request(app)
          .post('/users')
          .send({
            username: 'user2',
            password: 'password'
          });

        const user3 = await request(app)
          .post('/users')
          .send({
            username: 'user3',
            password: 'password'
          });

        const joinRoomUser1 = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${user1.body.token}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });

        const joinRoomUser2 = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${user2.body.toke}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });
        const joinRoomUser3 = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${user3.body.toke}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });

        expect(joinRoomUser1.status).toBe(201);
        expect(joinRoomUser2.status).toBe(201);
        expect(joinRoomUser3.status).toBe(201);
      });
    });

    describe('Error cases', () => {
      it('should return 400 when join in a room with invalid credentials', async () => {
        const room = await request(app)
          .post('/rooms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Room 01',
            password: 'password',
            max_participants: 10
          });

        const joinRoom = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${token}`)
          .send({
            room_name: room.body.name,
            password: 'wrongPassword'
          });

        expect(joinRoom.status).toBe(400);
      });

      it('should return 400 when join in a public room with credentials', async () => {
        const room = await request(app)
          .post('/rooms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Room 01',
            password: '',
            max_participants: 10
          });

        const joinRoom = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${token}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });

        expect(joinRoom.status).toBe(400);
      });

      it('should return 400 when join a room that is full', async () => {
        const room = await request(app)
          .post('/rooms')
          .set('Authorization', `Bearer ${token}`)
          .send({
            name: 'Room 01',
            password: 'password',
            max_participants: 3
          });

        const user1 = await request(app)
          .post('/users')
          .send({
            username: 'user1',
            password: 'password'
          });

        const user2 = await request(app)
          .post('/users')
          .send({
            username: 'user2',
            password: 'password'
          });

        const user3 = await request(app)
          .post('/users')
          .send({
            username: 'user3',
            password: 'password'
          });

        const joinRoomUser1 = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${user1.body.token}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });

        const joinRoomUser2 = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${user2.body.toke}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });
        const joinRoomUser3 = await request(app)
          .post('/rooms/join')
          .set('Authorization', `Bearer ${user3.body.toke}`)
          .send({
            room_name: room.body.name,
            password: 'password'
          });

        expect(joinRoomUser1.status).toBe(201);
        expect(joinRoomUser2.status).toBe(201);
        expect(joinRoomUser3.status).toBe(400);
      });
    });
  });
});
