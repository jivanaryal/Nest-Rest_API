import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    console.log('AuthGuard Info:', info);
    console.log('AuthGuard User:', user);
    console.log('AuthGuard Error:', err);
    return super.handleRequest(err, user, info, context);
  }
}
