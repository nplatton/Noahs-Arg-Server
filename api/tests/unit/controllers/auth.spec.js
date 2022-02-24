const apiServer = require('../../../server');
const request = require('supertest');

describe('auth endpoints', () => {
    let api;
    let token;

    beforeAll(async () => {
        api = apiServer.listen(5000, () =>
          console.log("test server running on port 5000")
        );
      });

    afterAll(async () => {
        console.log('Gracefully stopping the server')
        await api.close()
    })

    it('registers new user successfully', async () => {
            const res = await request(api)
              .post("/auth/register")
              .send({ username: "vincent", password: "vincent", org: "Noahs_Arg" });
            console.log(res.error);
            expect(res.statusCode).toEqual(201);
    })

    it('logs in user successfully', async () => {
        let token;
        const resAuthed = await request(api)
            .post('/auth/login')
            .send({ username: "noah", password: "noah" });
            token = resAuthed.body.token;
        const res = await request(api)
            .get("/users/noah")
            .set("Authorization", `Bearer ${token}`);
          expect(res.statusCode).toEqual(200);

    })

    it('does not log in user if the user exists and their password is incorrect', async () => {
        const res = await request(api)
            .post('/auth/login')
            .send({ username: "noah", password: "blah" });
        expect(res.statusCode).toEqual(401);
    })

    it('does not log in user if user does not exist', async () => {
        const res = await request(api)
            .post('/auth/login')
            .send({ username: "bob", password: "bob" });
        expect(res.statusCode).toEqual(401);
    })


})
