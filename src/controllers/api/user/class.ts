import { inject } from 'inversify';
import {
  controller,
  interfaces,
  httpGet,
  httpPost,
} from 'inversify-express-utils';

import { TYPES } from '../../../constants/';
import {
  IBaseRequest,
  IBodyRequest,
  IBodyResponse,
  IUserCreateDto,
  IUserResponseDto,
} from '../../interfaces';
import { IUserService } from './interfaces';

@controller("")
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private service: IUserService) { }

  @httpPost("/users")
  public async create(
    req: IBodyRequest<IUserCreateDto>,
    res: IBodyResponse<IUserResponseDto | string>,
  ): Promise<void> {
    const username = req.body.username;
    if (!username) {
      res.status(400).json(`400 - Username "${username}" is invalid.`);
    }
    const result = await this.service.create({ username: req.body.username });
    if (result.isOk) {
      res.status(201).json(result.value);
    } else if (result.error == "ER_DUP_ENTRY") {
      res.status(409).json(`409 - User "${username}" already exists.`);
    } else {
      res.status(500).json("500 - Server error");
    }
  }

  @httpGet("/user")
  public async getByAuth(
    req: IBaseRequest,
    res: IBodyResponse<IUserResponseDto | string>,
  ): Promise<void> {
    const id = req.locals && req.locals.user && req.locals.user.id;
    if (!id) res.status(401).json(`401 - Missing valid authorization.`);
    const result = await this.service.findById(id);
    if (result.isOk) {
      res.status(200).json(result.value);
    } else if (result.error == "ER_NOT_FOUND") {
      res.status(404).json(`404 - No user associated with token.`);
    } else {
      res.status(500).json("500 - Server error");
    }
  }
}
