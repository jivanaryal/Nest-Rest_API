import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service'; // Import AuthService
import { JwtPayload } from './jwt-payload.interface'; // You'll define this in the next step

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    console.log('Payload:', payload);
    if (!payload || !payload.sub || !payload.username) {
      console.log('Invalid payload');
      return null;
    }

    return {
      userId: payload.sub,
      username: payload.username,
      role: payload.role,
    }; // You can add more user info if needed
  }
}
