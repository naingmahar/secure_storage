import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';
import { IAuth } from './type/auth';

export const AuthUser = createParamDecorator(
  (data: any, ctx: ExecutionContext): IAuth => {
    const req = ctx.switchToHttp().getRequest();
    // if route is protected, there is a user set in auth.middleware
    if (!!req.user) {
      return !!data ? req.user[data] : req.user;
    }

    // in case a route is not protected, we still want to get the optional auth user from jwt
    const token = req.headers.authorization
      ? (req.headers.authorization as string).split(' ')
      : null;

    if (token && token[1]) {
      const decoded: any = jwt.verify(token[1], jwtConstants.secret);
      return !!data ? decoded[data] : decoded.user;
    }
  },
);