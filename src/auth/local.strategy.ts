import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  private readonly logger = new Logger(AuthService.name);

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    this.logger.log(user);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
