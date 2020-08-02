import { Request, Response } from 'express';
import { inject } from 'inversify';
import { controller, interfaces, httpPost } from 'inversify-express-utils';

import { IUser, IUserService } from '../interfaces';
import { TYPES } from '../constants/';

@controller("/users")
export class UserController implements interfaces.Controller {

  constructor(@inject(TYPES.UserService) private service: IUserService) { }

  @httpPost("/")
  private async create(req: Request, res: Response) {
    const data: IUser = req.body;
    const result = await this.service.create(data);
    if (result.isOk) {
      res.status(201).json(result.value);
    } else if (result.error == "ER_NO_DEFAULT_FOR_FIELD") {
      res.status(400).json(`400 - Username "${data.username}" is invalid.`);
    } else if (result.error == "ER_DUP_ENTRY") {
      res.status(409).json(`409 - User "${data.username}" already exists.`);
    } else {
      console.log(result);
      res.status(500).json("500 - Server error");
    }
  }
}
