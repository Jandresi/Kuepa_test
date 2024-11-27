import userModel from '../../models/user.model';
import { CustomError } from "../../common/customError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginService {
  constructor() {}

  public async createUser(email:string, name:string, password:string) {
    try {
      if(!email || !name || !password) throw new CustomError(400, 'Todos los campos son obligatorios.');

      const exists = await userModel.findOne({email});
      if(exists) throw new CustomError(400, 'El usuario ingresado ya existe.');

      let user = new userModel({email, name, password, moderator:false});
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);

      await user.save();

      const token = await this.createToken(user._id);
      return {id: user._id, email, name, token}
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  public async loginUser(email:string, password:string) {
    try {
      if(!email || !password) throw new CustomError(400, 'Todos los campos son obligatorios.');
      
      const user = await userModel.findOne({email});
      if(!user) throw new CustomError(428, 'Usuario o clave inválidos.');

      const claveCorrecta = await bcrypt.compare(password, user.password);
      if(!claveCorrecta) throw new CustomError(428, 'Usuario o clave inválidos.');

      const token = await this.createToken(user._id);
      return {id: user._id, email, name:user.name, token}
    } catch (error:any) {
      throw new Error(error.message);
    }
  }

  private async createToken(id:any) {
    const jwtKey = process.env.JWT_SECRET_KEY as string;
    return jwt.sign({id}, jwtKey, {expiresIn: "4h"});
  }
}
