import { Schema, model } from 'mongoose';
import { IUser } from './user.interface';

const userRoles = ["admin", "user"] as const;


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: userRoles, required: true },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const userModal = model<IUser>('User', userSchema);

export default userModal;