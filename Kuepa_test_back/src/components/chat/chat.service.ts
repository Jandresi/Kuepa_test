import chatModel from '../../models/chat.model';
import { CustomError } from "../../common/customError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { messageDto } from './dto/chat.dto';
import messageModel from '../../models/message.model';
import userModel from '../../models/user.model';

export class ChatService {
  constructor() {}

  /**
   * Si ya existía un chat, retorna ese. Si no, crea uno nuevo.
   */
  public async createChat(userId:string) {
    try {
      const moderador = await userModel.findOne({moderator: true});
      let chatExistente = await chatModel.findOne({
        members: {$in: [String(moderador?._id)]}
      });

      // Si el chat no existía, lo creamos con el moderador y el usuario
      if(!chatExistente) {
        const newChat = new chatModel({
          members: [moderador?._id]
        });

        chatExistente = await newChat.save();
      }
      
      // Tras asegurar la existencia del chat, añadimos al usuario en él
      await chatModel.updateOne(
        { _id: chatExistente._id },
        { $addToSet: { members: userId } }
      )
      return chatExistente;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  /**
   * Obtiene los chats a los que pertenece el usuario
   */
  public async getUserChats(userId:string) {
    try {
      await this.createChat(userId);
      const chats = await chatModel.find({
        members: {$in: [userId]}
      });
      return chats;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  /**
   * Envía un mensaje nuevo
   */
  public async sendMessage(data:messageDto) {
    try {
      const message = new messageModel(data);

      const result = await message.save()
      const newMessage = await messageModel.find({_id: result._id}).populate('userId');
      return newMessage;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  /**
   * Obtiene los mensajes enviados
   */
  public async getMessages(chatId:string) {
    try {
      const messages = await messageModel.find({chatId}).populate('userId');
      return messages;
    } catch (error:any) {
      throw new Error(error.message);
    }
  }
}
