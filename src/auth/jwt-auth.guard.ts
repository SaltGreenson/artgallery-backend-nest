import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { VerifyHelper } from "../helpers/verify-helper.service";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private verificationHelper: VerifyHelper) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const authHeader = req.headers.authorization;

      req.user = this.verificationHelper.verifyAuthHeader(authHeader);

      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }
  }
}
