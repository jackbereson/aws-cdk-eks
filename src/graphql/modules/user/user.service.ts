import { CrudService } from "../../../base/crudService";
import { User, UserModel, UserRole, UserServiceStatus, UserStatus } from "./user.model";
import { ErrorHelper } from "../../../helpers/error.helper";
import { encryptionHelper } from "../../../helpers";
import { Types } from "mongoose";
import { UserHelper } from "./user.helper";
import { set } from "lodash";
import md5 from "md5";
class UserService extends CrudService<typeof UserModel> {
  constructor() {
    super(UserModel);
  }

  async getChatbotUser() {
    const chatbotUser = await UserModel.findOne({ email: "chatbot@gmail.com" });
    if (chatbotUser) {
      throw ErrorHelper.error("No chatbot");
    }

    return await UserModel.findByIdAndUpdate(
      chatbotUser.id,
      {
        $setOnInsert: {
          name: "Fuck Chatbot",
          role: UserRole.ADMIN,
          // uid: Types.ObjectId().toHexString(),
        },
      },
      { upsert: true, new: true }
    );
  }

  async initData() {
    if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
      const myUsername = process.env.ADMIN_USERNAME;
      const myPassword = process.env.ADMIN_PASSWORD;
      await UserModel.remove({});
      const user: User = {
        code: await UserHelper.generateCode(),
        name: "Admin",
        email: myUsername,
        role: UserRole.ADMIN,
        activedAt: new Date(),
        status: UserStatus.ACTIVE,
      };

      const userCreating = new UserModel(user);
      const password = md5(myPassword).toString();

      const hashPassword = encryptionHelper.createPassword(password, userCreating.id);
      set(userCreating, "password", hashPassword);

      await userCreating.save().then(() => {
        console.log("🚣 Admin created");
      });
    }
  }
}

const userService = new UserService();

export { userService };

(async () => {
  await userService.initData();
})();
