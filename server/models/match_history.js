import { DataTypes } from "sequelize";
import { sequelize } from "../datasource.js";
import { User } from "./user.js";

export const MatchHistory = sequelize.define(
  "MatchHistory",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    roomId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roomName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    matchResult: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    messages: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    tableName: "histories",
    indexes: [
      {
        unique: true,
        fields: ["userId", "roomId"],
      },
    ],
  },
);

MatchHistory.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

User.hasMany(MatchHistory, {
  foreignKey: "userId",
});
