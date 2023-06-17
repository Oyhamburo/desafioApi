import { Sequelize, DataTypes } from "sequelize";
import dotevn from "dotenv";

dotevn.config();

const USER = process.env.USER || "root";
const PASS = process.env.PASS || "";
const DATABASE = process.env.DATABASE || "apiUsuariosDesafio";

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize(DATABASE, USER, PASS, {
  host: "localhost",
  dialect: "mysql",
});

const Schema = sequelize.define("usuarios", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const UserSchema = Schema;
