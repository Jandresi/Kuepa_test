import { Request, Response } from "express";
import { route, POST } from "awilix-express";
import { LoginService } from "./login.service";

@route("/login")
export class LoginController {
  constructor(private loginService:LoginService) {}

  @route("/createUser")
  @POST()
  public async createUser(req: Request, res: Response) {
    try {
      const {email, name, password} = req.body;
      const result = await this.loginService.createUser(email, name, password);
      res.status(200).json(result);
    } catch (error:any) {
      res.status(error.status || 401).json({message: error.message})
    }
  }

  @route("/loginUser")
  @POST()
  public async login(req: Request, res: Response) {
    try {
      const {email, password} = req.body;
      const result = await this.loginService.loginUser(email, password);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(error.status || 401).json({message: error.message});
    }
  }
}
