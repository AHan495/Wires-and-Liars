import { DataTypes } from "sequelize";
import { sequelize } from "../datasource.js";
import { SUBSCRIPTION_STATUSES } from "../utils/constants.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    subscriptionStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "inactive",
      validate: {
        isIn: [SUBSCRIPTION_STATUSES],
      },
    },
    // Stripe Subscriptions have a period end date
    currentPeriodEnd: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
  },
);
