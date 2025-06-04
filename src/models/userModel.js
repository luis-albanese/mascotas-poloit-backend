import prisma from "../config/prisma";

export const userModel = () => {
  // Model para crear usuario
  const createUser = async (data) => {
    return await prisma.user.create({
      data,
    });
  };
  return {
    createUser,
  };
};
