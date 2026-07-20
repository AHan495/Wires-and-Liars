import { DataTypes } from "sequelize";
import { sequelize } from "../datasource.js";

export const User = sequelize.define(
  "User",
  {
    // From Google OAuth (sub from getPayload)
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    // customerId and subscriptionId are from the Stripe Customer and Subscription objects
    customerId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    subscriptionId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    accessUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
  },
);
