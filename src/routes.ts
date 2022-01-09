import { Router } from "express";

import { AuthenticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/clients/useCases/createClient/CreateClientController";

export const routes = Router();

const authenticateClientController = new AuthenticateClientController();
const createClientController = new CreateClientController();

routes.post("/authenticate/", authenticateClientController.handle);
routes.post("/clients/", createClientController.handle);
