import { Request } from 'express';


export interface UserRequestInterface extends Request {
  payload: {
    username: string;
    password: string;
    email: string;
  };
}
