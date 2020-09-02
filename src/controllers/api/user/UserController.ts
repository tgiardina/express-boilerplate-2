import { Request, Response } from 'express';
import { body } from 'express-validator';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import { IUserRepository } from './interfaces';
import { validate } from '../../middleware';

@controller('/api')
export class UserController implements interfaces.Controller {
  constructor(
    @inject(TYPES.UserRepository) private repository: IUserRepository,
  ) { }

  @httpPost(
    '/users',
    body('email').isEmail(),
    body('password').isString(),
    body('username').isString(),
    validate,
  )
  public async create(req: Request, res: Response) {
    const user = await this.repository.createAndSaveAuth({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    res.status(201).json({
      user: {
        bio: user.bio || null,
        email: user.email,
        image: user.image || null,
        token: user.token,
        username: user.username,
      },
    });
  }
}
