// src/auth/interfaces/jwt-payload.interface.ts

export interface JwtPayload {
  username: string;
  sub: number; // The user's ID
  role: string; // 👈 Add this line
}
