import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { Reflector } from "@nestjs/core";
import { ROLES_KEY } from "./role-auth.decorator";
import { VerifyHelper } from "../helpers/verify-helper.service";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private verificationHelper: VerifyHelper,
    private reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()]
      );

      if (!requiredRoles.length) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;

      const user = this.verificationHelper.verifyAuthHeader(authHeader);
      req.user = user;

      return requiredRoles.includes(user.role.value);
    } catch (e) {
      throw new HttpException("Access denied", HttpStatus.FORBIDDEN);
    }
  }
}
