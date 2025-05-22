import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from "jsonwebtoken";
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class TokenMiddleware implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    
    console.log("Authorization Header:", authHeader);

    const token: string = authHeader && authHeader.split('Bearer')[1];

    console.log(process.env.SECRET_KEY)

    const verifyToken = jwt.verify(token, process.env.SECRET_KEY || "")

    console.log("Token:", verifyToken);

    // !!authHeader && authHeader.startsWith('Bearer ')

    return true;
  }
}