import { Model, Schema, model } from "mongoose";
import { fakerRU as faker, ne } from "@faker-js/faker";
import bcrypt from "bcrypt";
// @ts-ignore
import toJson from "@meanie/mongoose-to-json";
interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  phone?: string;
  role?: string;
  info?: string;
  icon?: string;
  likes?: string[];
}
type RegistryRequestBody = {
  name: string;
  email: string;
  password: string;
};
type LoginRequestBody = Omit<RegistryRequestBody, "name">;
type Callback = (err: string | null, user: Pick<IUser, "id" | "likes"> | null) => void;
interface UserModel extends Model<IUser> {
  signUp(body: RegistryRequestBody, callback: Callback): void;
  signIn(body: LoginRequestBody, callback: Callback): void;
}
const userSchema = new Schema<IUser, UserModel>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      default: faker.phone.number(),
    },
    role: {
      type: String,
      default: faker.person.jobTitle(),
    },
    info: {
      type: String,
      default: faker.lorem.paragraphs({ min: 2, max: 3 }),
    },
    icon: {
      type: String,
      default: faker.image.avatarLegacy(),
    },
    likes: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);
userSchema.static(
  "signUp",
  async function signUp({ name, email, password }, callback) {
    const existingUser: IUser | null = await this.findOne({ email });
    if (existingUser) {
      return callback("Email already in use", null);
    }
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    const { _id, likes } = await this.create({ name, email, password: hashPassword });
    return callback(null, { id: _id.toString(), likes });
  }
);
userSchema.static(
  "signIn",
  async function signIn({ email, password }, callback) {
    const existingUser: Pick<IUser, "id" | "password" | "likes"> | null =
      await this.findOne({ email }, { likes: 1, password: 1 });
    if (!existingUser) {
      return callback("Incorrect email", null);
    }
    const isEqual = await bcrypt.compare(password, existingUser.password);
    if (!isEqual) {
      return callback("Incorrect password", null);
    }
    const { id, likes } = existingUser;
    return callback(null, { id, likes });
  }
);
userSchema.plugin(toJson);
const User = model<IUser, UserModel>("User", userSchema);
export default User;
