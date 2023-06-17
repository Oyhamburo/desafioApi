import { UserService } from "../service/index.service.js";

const Service = UserService.getInstance();
const controller = {};

controller.signIn = async (req, res) => {
  const { email, password } = req.body;
  const loggedUser = await Service.singIn({
    email: email,
    password: password,
  });

  if (loggedUser) {
    res.status(200).send("Usuario Logeados");
  } else {
    res.status(400).json();
  }

  // en caso de utilizar express session
  // if (loggedUser) {
  //   req.session.login = true;
  //   let test = (req.session.tess = "pepino");
  //   console.log(test);

  //   res.status(200).send("Usuario Logeado");
  // } else {
  //   req.session.login = false;
  //   res.status(400).json();
  // }
};

controller.signUp = async (req, res) => {
  const { body } = req;
  const newUser = await Service.singUp(body);

  if (newUser) {
    res.status(200).json({ success: "User created " });
  } else {
    res.status(400).json({
      error:
        "there was an error, please verify the body content match the schema",
    });
  }
};

controller.changePassword = async (req, res) => {
  const { email } = req.params;
  const { oldPassword, newPassword } = req.body;
  const loggedUser = await Service.changePassword({
    email,
    oldPassword,
    newPassword,
  });

  if (loggedUser) {
    res.status(200).send("Updated password");
  } else {
    res.status(400).json();
  }
};

export { controller as userController };
