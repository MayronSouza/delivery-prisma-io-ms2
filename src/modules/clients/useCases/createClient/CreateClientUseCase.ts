import { hash } from "bcrypt";

import { prisma } from "../../../../database/prismaClient";

interface ICreateClent {
  username: string;
  password: string;
}

export class CreateClientUseCase {
  async execute({ username, password }: ICreateClent) {
    const userExists = await prisma.clients.findFirst({
      where: {
        username: {
          mode: "insensitive",
        },
      },
    });

    if (userExists) {
      throw new Error("User already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prisma.clients.create({
      data: {
        username,
        password: hashPassword,
      },
    });

    return client;
  }
}
