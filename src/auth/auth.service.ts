import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { User } from "../users/user.schema";
import { CreatedUserDto } from "./dto/created-user.dto";
import { IUserWithTokens } from "./types/IUserWithTokens";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Auth } from "./auth.shema";
import { AuthUserDto } from "./dto/auth-user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private authModel: Model<Auth>,
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateTokens(user);
  }

  async logout(refreshToken: string) {
    return this.authModel.deleteOne({ refreshToken });
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }

    const userData = this.validateToken(refreshToken);

    if (!userData) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }

    const token = await this.authModel.findOne({
      user: userData._id,
    });

    if (!token) {
      throw new UnauthorizedException({ message: "Unauthorized" });
    }

    const currentUser = await this.usersService.getUserById(userData._id);
    return this.generateTokens(currentUser);
  }

  async signUp(userDto: CreateUserDto): Promise<IUserWithTokens> {
    const candidate = await this.usersService.getUserByEmailOrName(
      userDto.email,
      userDto.name
    );

    if (candidate) {
      throw new HttpException(
        `${userDto.name} (${userDto.email}) already exists`,
        HttpStatus.BAD_REQUEST
      );
    }

    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const createdUser = await this.usersService.create({
      ...userDto,
      password: hashPassword,
    });
    return this.generateTokens(createdUser);
  }

  async generateTokens(user: User): Promise<IUserWithTokens> {
    const payload = new CreatedUserDto(user);

    const accessToken = this.jwtService.sign(
      { ...payload },
      { expiresIn: "24h" }
    );
    const refreshToken = this.jwtService.sign(
      { ...payload },
      { expiresIn: "30d" }
    );
    const userData = {
      accessToken,
      refreshToken,
      user: payload,
    };

    await this.saveToken(userData);

    return userData;
  }

  validateToken = (token: string) => {
    return this.jwtService.verify(token);
  };

  private async validateUser(userDto: AuthUserDto) {
    const user = await this.usersService.getUserByEmailOrName(userDto.email);

    if (!user) {
      throw new UnauthorizedException({
        message: "Incorrect email or password",
      });
    }

    const passwordIsEqual = await bcrypt.compare(
      userDto.password,
      user.password
    );

    if (passwordIsEqual) {
      return user;
    }

    throw new UnauthorizedException({ message: "Incorrect email or password" });
  }

  private saveToken(userData: IUserWithTokens) {
    return this.authModel.findOneAndUpdate(
      {
        user: userData.user._id,
      },
      {
        $set: {
          refreshToken: userData.refreshToken,
        },
      },
      { upsert: true }
    );
  }
}
