// import bcrypt from 'b'
import crypto from "crypto-js";
import bcrypt from "bcrypt";

const PEPPER = "596a96cc7bf9108cd896f33c44aedc8a";

export class EncryptionHelper {
  constructor() {}

  static genSalt = () => {
    return bcrypt.genSaltSync(15);
  };

  static generatePassword = (data: string, salt: string) => {
    return bcrypt.hashSync(data, salt);
  };

  static encodePepper = (data: string) => {
    const encryptString = crypto.MD5(data).toString();
    return encryptString;
  };

  static setupPassword = (pepperPassword: string, id: string) => {
    const encryptString = crypto.MD5(`${pepperPassword}${id}`).toString();
    return encryptString;
  };

  createPepperPassword = (password: string) => {
    const { encodePepper } = EncryptionHelper;
    return encodePepper(password);
  };

  createPassword = (password: string, id: string) => {
    const { genSalt, generatePassword, setupPassword } = EncryptionHelper;
    const salt = genSalt();
    const customPassword = setupPassword(password, id);
    const hassPassword = generatePassword(customPassword, salt);
    return hassPassword;
  };

  comparePassword = (password: string, id: string, hassPassword: string) => {
    const { setupPassword } = EncryptionHelper;
    const customPassword = setupPassword(password, id);
    const result = bcrypt.compareSync(customPassword, hassPassword);
    return result;
  };
}

const encryptionHelper = new EncryptionHelper();

export { encryptionHelper };

// const webInputpass = encryptionHelper.createPepperPassword("fuckyouuuodauosudoausdoausdoausodausoduss");
// console.log('webInputpass', webInputpass);

// const dbHash = encryptionHelper.createPassword(webInputpass, "what_the_hell");
// console.log('dbHash', dbHash);

// const cond = encryptionHelper.comparePassword(webInputpass, "what_the_hell", dbHash);
// console.log('cond', cond);
