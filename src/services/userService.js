import { userModel } from "../models/userModel";
import { verified } from "../utils/bcrypt";

export const userService = () => {
  const { createUser } = userModel();
  const create = async (data) => {
    const user = await createUser(data);
    return user;
  };
  return {
    create,
  };
};
