import { Model } from 'sequelize';

export interface IUserAttributes {
    id?: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IUser extends IUserAttributes, Model<IUserAttributes> {
    comparePassword(password: string): Promise<boolean>;
}

export interface IUserCreate extends Omit<IUserAttributes, 'id' | 'createdAt' | 'updatedAt'> { }

export interface IUserResponse {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    username: string;
    createdAt?: Date;
  }

export interface IUserLogin {
    email: string;
    password: string;
}

export interface IJwtUserPayload {
    id: string;
    email: string;
    username: string;
}