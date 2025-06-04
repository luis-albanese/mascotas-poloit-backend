import HTTP_STATUS from "../utils/httpStatus.js";
import { userService } from "../services/userService.js";

export const userController = () => {
  const { create } = userService();
  const newUser = async (req, res, next) => {
    const { body } = req;
    try {
      const user = await create(body);
      res
        .status(HTTP_STATUS.CREATED)
        .json({ message: "User created successfully", user });
    } catch (error) {
      next(error);
    }
  };
  return { newUser };
};
