import {
  Document, Model, Schema, model
} from 'mongoose';
import * as argon2 from 'argon2';
export interface IUser extends Document {
  /** Email */
  email: string;
  /** Password */
  password: string;
  /** Password */
  firstName: string;
  /** Password */
  lastName: string;
  /** Created On */
  createdOn: Date;
  /** Created On */
  updatedOn: Date;
  encryptPassword: (password: string) => string;
  validPassword: (password: string) => boolean;
}

interface IUserModel extends Model<IUser> { }

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdOn: {
    required: true,
    type: Date
  },
  updatedOn: {
    required: true,
    type: Date,
    default: Date.now
  }
});

schema.methods.encryptPassword = async (password: string) => await argon2.hash(password);

// Method to verify the password during authentication
schema.methods.validPassword = async function (password: string): Promise<boolean> {
  try {
    return await argon2.verify(this.password, password);
  } catch (err) {
    throw new Error('Password validation failed');
  }
};

export const User: IUserModel = model<IUser, IUserModel>('User', schema);
