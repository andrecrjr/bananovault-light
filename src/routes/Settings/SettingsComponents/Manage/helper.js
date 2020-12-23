import { createNewWallet, createUsingSeed } from "../../../../service";
import CryptoJS from "crypto-js";
import { banWallet } from "settings";

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

export const importUserBan = async (password, seed) => {
  try {
    const data = await createUsingSeed(seed);
    if (data) {
      let walletEncrypted = CryptoJS.AES.encrypt(seed, password).toString();
      let state = { ...banWallet, ...data, ...{ seed: walletEncrypted } };
      return state;
    }
  } catch (error) {
    console.log(error);
  }
};

export const createOrImportWallet = async (
  data,
  setData,
  dispatchWallet,
  importWallet = ""
) => {
  setData((data) => ({ ...data, ...{ error: false } }));
  dispatchWallet({
    type: "UPDATE_WALLET",
    payload:
      importWallet.length === 0
        ? await createUserBan(data.input1)
        : await importUserBan(data.input1, importWallet),
  });
  return true;
};

export const validatePassword = (password, setData, data, isUpdatePassword) => {
  let walletIsLocked = password.pass.length === 0;
  if (isUpdatePassword && walletIsLocked) {
    setData((oldstate) => ({
      ...oldstate,
      ...{
        error: true,
        info: "You need to unlock your wallet with the password.",
      },
    }));
    return false;
  }
  if (data.input1 !== data.input2) {
    setData((data) => ({
      ...data,
      ...{
        error: true,
        info: "Maybe the passwords are different... Please try again!",
      },
    }));
    return false;
  }
  if (data.input1 === data.input2) {
    setData((data) => ({ ...data, ...{ error: false } }));
    return true;
  }
  return false;
};

export const updatePassword = (password, dispatchWallet, data) => {
  dispatchWallet({
    type: "UPDATE_PASSWORD",
    payload: { actualValue: password.pass, newValue: data.input1 },
  });
  return true;
};
