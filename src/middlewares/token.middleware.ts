import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TokenMiddleware implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    try {
      const request = context.switchToHttp().getRequest();
      const authHeader = request.headers['authorization'];
  
      const token: string = authHeader && authHeader.split('Bearer ')[1];

      const verifyToken = jwt.verify(token, process.env.SECRET_KEY || "")
      
      return  verifyToken && authHeader.startsWith('Bearer ');
    } catch (error) {
      console.error("error: " + error.message)
      throw new Error (error.message)
    }
  }
}