import { model } from 'mongoose';
import { UserSchema } from '../schemas/user-schema';

const User = model('users', UserSchema);

export class UserModel {
  async findByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async findById(userId) {
    const user = await User.findOne({ _id: userId });
    return user;
  }

  async create(userInfo) {
    const createdNewUser = await User.create(userInfo);
    return createdNewUser;
  }

  async findAll() {
    const users = await User.find({});
    return users;
  }

  async update({ useremail, update }) {
    const filter = { email: useremail };
    const option = { returnOriginal: false };

    const updatedUser = await User.findOneAndUpdate(filter, update, option);
    return updatedUser;
  }

  async findUser(userName) {
    const user = await User.findOne({ fullName: userName });
    return user;
  }

  async delete(useremail) {
    await User.findOneAndDelete({ email: useremail });
    return;
  }
}

const userModel = new UserModel();

export { userModel };
