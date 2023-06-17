import { CRUDMySQL } from "../../container/index.container.js";
import { UserSchema } from "../schema/index.schema.js";
import { comparePassword } from "../../helpers/index.helpers.js";

// Clase hija que hereda de la clase CRUD
class UserDAO extends CRUDMySQL {
  constructor() {
    super(UserSchema);
  }

  async loginUser(user) {
    try {
      // traigo usuarios
      const users = await super.getAll();
      // verfico que nada salio mal
      if (!users) {
        console.info(`Error when making request`);
        return null;
      }
      // busco el usuario en cuestion
      let userFind = users.find((u) => u.email === user.email);
      // verifico que lo encontro
      if (!userFind) {
        console.info(`User '${user.email}' does not exist`);
        return null;
      }
      userFind = userFind.dataValues;
      // comparo que la contraseña ingresada luego del ser hasheada coinsida con la de la base de datos
      let compare = await comparePassword(user.password, userFind.password);

      if (compare) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async createUser(user) {
    try {
      const res = await super.create(user);
      return res;
    } catch (error) {
      console.error(error);
      throw new Error("Error registering user");
    }
  }

  async changePassword({ email, newPassword }) {
    try {
      const users = await super.getAll();
      if (!users) {
        console.info(`Error when making request`);
        return null;
      }
      let userFind = users.find((u) => u.email === email);

      if (!userFind) {
        console.info(`User '${email}' does not exist`);
        return null;
      }
      userFind = userFind.dataValues;
      userFind.password = newPassword;

      // cambio la contraseña vieja por la nueva
      let response = await super.update(userFind.id, userFind);

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}

export { UserDAO as UserDAOMySQL };
