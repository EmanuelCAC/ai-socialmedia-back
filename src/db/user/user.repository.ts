import { Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { User } from "src/auth/schemas/user.shema";

export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private user: Model<User>,
  ) {}

  public async findUserByEmail(email: string): Promise<any> {

  }

  public async createUser(email: string, password: string): Promise<User> {
    const createdUser = new this.user({
      email,
      password,
    });
    return createdUser.save();
  }

}