import sequelize from "../data-access/db";

import { DataTypes } from "sequelize";
// import { User } from "../types/user";

const User = sequelize.define("user", {
  id: { type: DataTypes.STRING, primaryKey: true, unique: true },
  login: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING, unique: false },
  age: { type: DataTypes.INTEGER },
  isDeleted: { type: DataTypes.BOOLEAN },
});

const Group = sequelize.define("group", {
  id: { type: DataTypes.STRING, primaryKey: true, unique: true },
  name: { type: DataTypes.STRING, unique: true },
  permission: { type: DataTypes.STRING, unique: false },
});

const UserGroup = sequelize.define("user_group", {
  id: { type: DataTypes.STRING, primaryKey: true, unique: true },
  name: { type: DataTypes.STRING, unique: true },
  permission: { type: DataTypes.STRING, unique: false },
});

User.belongsToMany(Group, { through: UserGroup });
Group.belongsToMany(User, { through: UserGroup });

export default { User, Group };
