import { Schema, model } from 'mongoose';
import { IUser, IUserMethod } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';


const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  role: { type: String, enum: ['admin', 'user'], required: true, default: 'user' },
  isBlocked: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});


userSchema.statics.isUserExist = async function(email: string) {
  return await this.findOne({ email });
};


userSchema.pre("save",async function() {
  const user = this.toObject() as IUser;
  this.password = await bcrypt.hash(user.password, Number(config.BCRYPT_SALT));
});

userSchema.post("save", async function(userInfo, next) {
  userInfo.password = "";
  next();
});

export const userModal = model<IUser, IUserMethod>('User', userSchema);



