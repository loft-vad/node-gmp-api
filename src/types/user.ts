import { Model, Optional } from "sequelize";

export interface UserAttr {
  id: string;
  login: string;
  password: string;
  age: number;
  isDeleted: boolean;
}

export interface UserInput extends Optional<UserAttr, "id" | "age"> {}
export interface UserOuput extends Required<UserAttr> {}

export class User extends Model<UserAttr, UserInput> implements UserAttr {
  public id!: string;
  public login!: string;
  public password!: string;
  public age!: number;
  public isDeleted!: boolean;
}
