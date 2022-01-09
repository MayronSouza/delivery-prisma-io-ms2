import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../database/prismaClient";

interface IClientProps {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IClientProps) {
    const client = await prisma.clients.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    const passwordMatch = await compare(password, client.password);

    if (!passwordMatch) {
      throw new Error("Username or password invalid!");
    }

    const token = sign({ username }, "84f554af5f584a90b2ae8f18a94b118f", {
      subject: client.id,
      expiresIn: "1d",
    });

    return token;
  }
}
