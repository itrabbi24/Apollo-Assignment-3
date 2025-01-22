import { Schema, model } from 'mongoose';
import { IUser, IUserMethod } from './user.interface';


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'user'], required: true },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


userSchema.statics.isUserExist = async function(email: string) {
  return await this.findOne({ email });
};


export const userModal = model<IUser, IUserMethod>('User', userSchema);
