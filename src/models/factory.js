import dotenv from "dotenv";
import { UserDAOMySQL as UserDAO } from "./dao/index.dao.js";

let user;

dotenv.config();

const opcion = process.env.DB || "MYSQL";

switch (opcion) {
  case "MYSQL":
    user = new UserDAO();
    break;
  case "MONGO":
    break;
  case "firebase":
    break;
}

class DaoFactory {
  static getUserDao() {
    return user;
  }
}

export { DaoFactory };
