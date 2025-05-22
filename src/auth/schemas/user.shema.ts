import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  __v?: number;
}

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User implements IUser {
  @Prop({ type: Types.ObjectId, auto: true })
  _id: Types.ObjectId;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Number, select: false }) 
  __v?: number;
}

export const UserSchema = SchemaFactory.createForClass(User);