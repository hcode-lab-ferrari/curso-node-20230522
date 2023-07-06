import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (field: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    console.log('REQUEST', request.user);
    if (field) {
      console.log('FIELD', field);
      if (request.user[field]) {
        return request.user[field];
      } else {
        return null;
      }
    } else {
      return request.user;
    }
  },
);
