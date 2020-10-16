import { createNewWallet } from "../../../../service";
import CryptoJS from "crypto-js";
import { banWallet } from "../UserSettings";

export const createUserBan = async (password) => {
  try {
    const data = await createNewWallet();
    let state = { ...banWallet, ...data };
    let walletEncrypted = CryptoJS.AES.encrypt(state.seed, password).toString();
    state = { ...state, ...{ seed: walletEncrypted } };
    return state;
  } catch (e) {
    console.log(e);
  }
};
