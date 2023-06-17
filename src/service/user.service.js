import { DaoFactory } from "../models/factory.js";
import { hashPassword } from "../helpers/index.helpers.js";

const dao = DaoFactory.getUserDao();

let instaciaUser = null;

class Service {
  static getInstance = () => {
    if (!instaciaUser) instaciaUser = new Service();
    return instaciaUser;
  };

  async singIn(loginUser) {
    try {
      const user = await dao.loginUser(loginUser);
      return user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async singUp(user) {
    try {
      // crear hash de la password
      user.password = await hashPassword(user.password);
      return await dao.createUser(user);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async changePassword({ email, oldPassword, newPassword }) {
    try {
      // confirmar que es la contraseña correcta
      let userValid = await this.singIn({
        password: oldPassword,
        email,
      });

      if (!userValid) {
        return false;
      }

      // hasheo la nueva contra
      newPassword = await hashPassword(newPassword);

      const res = await dao.changePassword({ email, newPassword });

      return res;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export { Service as UserService };
