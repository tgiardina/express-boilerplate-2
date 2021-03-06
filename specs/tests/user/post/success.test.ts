import { assert, expect, request } from 'chai';
import { Application, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { Connection } from 'typeorm';

import '../../../loaders';
import initApp from '../../../../src/app';
import { IToken, IUser, IUserDbSchema } from '../interfaces';
import { initConnection } from '../../../utils';

describe('POST /api/users - success', () => {
  const user = {
    email: "username@example.com",
    password: "password",
    username: "username",
  };
  const data = { user };
  let app: Application;
  let body: IUser;
  let connection: Connection;
  let response: Response;
  let status: number;

  before(async () => {
    app = await initApp();
    connection = await initConnection();
  });

  after(async () => {
    await connection.close();
  });

  it('should run.', (done) => {
    request(app)
      .post('/api/users')
      .type('json')
      .send(data)
      .end((_err, res) => {
        response = res;
        body = res.body;
        status = res.status;
        done();
      });
  });

  it('should match OpenApi spec', () => {
    expect(response).to.satisfyApiSpec;
  });

  it('should have a 201 status', () => {
    assert.equal(status, 201);
  });

  it('should include properties.', () => {
    assert.equal(body.user.bio, "");
    assert.equal(body.user.email, user.email);
    assert.equal(body.user.image, "");
    assert.equal(body.user.token.substring(0, 3), "eyJ");
    assert.equal(body.user.username, user.username);
  })

  it('should include valid token.', () => {
    const decodedToken = <IToken>verify(
      body.user.token,
      <string>process.env.JWT_SECRET,
    );
    assert.equal(decodedToken.id, 1);
    assert.equal(decodedToken.email, user.email);
    assert.equal(decodedToken.password, user.password);
  });

  it('should have saved in the database.', async () => {
    const dbUser = <IUserDbSchema>(await connection.manager.query(
      'SELECT * FROM user;'
    ))[0];
    assert.equal(dbUser.bio, null);
    assert.equal(dbUser.email, user.email);
    assert.equal(dbUser.image, null);
    assert.equal(dbUser.password, user.password);
    assert.equal(dbUser.username, user.username);
  });
})  
