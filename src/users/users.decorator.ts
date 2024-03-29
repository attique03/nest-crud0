import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Users = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log('Request ==> ', request);
    return (request.user = 'libra');
  },
);
