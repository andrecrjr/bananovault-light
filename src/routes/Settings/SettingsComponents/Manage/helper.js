import { createNewWallet, createUsingSeed } from "../../../../service";
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

export const importUserBan = async (password, seed) => {
  try {
    const data = await createUsingSeed(seed);
    if (data) {
      console.log(password);
      let walletEncrypted = CryptoJS.AES.encrypt(seed, password).toString();
      let state = { ...banWallet, ...data, ...{ seed: walletEncrypted } };
      return state;
    }
  } catch (error) {
    console.log(error);
  }
};

export const validationInputs = async (
  data,
  setData,
  password,
  dispatchWallet,
  importWallet = "",
  create,
  update
) => {
  let createOrImportWallet = data.input1 === data.input2 && create;
  let updatePasswordWallet = data.input1 === data.input2 && update;

  if (createOrImportWallet) {
    setData((data) => ({ ...data, ...{ error: false } }));
    dispatchWallet({
      type: "UPDATE_WALLET",
      payload:
        importWallet.length === 0
          ? await createUserBan(data.input1)
          : await importUserBan(data.input1, importWallet),
    });
    return true;
  }

  if (updatePasswordWallet) {
    if (password.password.length === 0) {
      setData((oldstate) => ({
        ...oldstate,
        ...{
          error: true,
          info: "You need to unlock your wallet with the password.",
        },
      }));
      return false;
    }
    setData((data) => ({ ...data, ...{ error: false } }));
    dispatchWallet({
      type: "UPDATE_PASSWORD",
      payload: { actualValue: password.password, newValue: data.input1 },
    });
    return true;
  } else {
    setData((data) => ({
      ...data,
      ...{
        error: true,
        info: "Maybe the passwords are different... Please try again!",
      },
    }));
  }
};