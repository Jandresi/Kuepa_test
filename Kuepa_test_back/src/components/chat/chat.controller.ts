import { Request, Response } from "express";
import { route, POST, GET } from "awilix-express";
import { ChatService } from "./chat.service";

@route("/chat")
export class ChatController {
  constructor(private chatService:ChatService) {}

  @route("/createChat")
  @POST()
  public async createChat(req: Request, res: Response) {
    try {
      const result = await this.chatService.createChat(req.body.userId);
      res.status(200).json(result);
    } catch (error:any) {
      res.status(error.status || 401).json({message: error.message})
    }
  }

  @route("/getUserChats/:userId")
  @GET()
  public async getUserChats(req: Request, res: Response) {
    try {
      const result = await this.chatService.getUserChats(req.params.userId);
      res.status(200).json(result);
    } catch (error:any) {
      res.status(error.status || 401).json({message: error.message})
    }
  }

  @route("/sendMessage")
  @POST()
  public async sendMessage(req: Request, res: Response) {
    try {
      const result = await this.chatService.sendMessage(req.body);
      res.status(200).json(result);
    } catch (error:any) {
      res.status(error.status || 401).json({message: error.message})
    }
  }

  @route("/getMessages/:chatId")
  @GET()
  public async getMessages(req: Request, res: Response) {
    try {
      const result = await this.chatService.getMessages(req.params.chatId);
      res.status(200).json(result);
    } catch (error:any) {
      res.status(error.status || 401).json({message: error.message})
    }
  }
}
