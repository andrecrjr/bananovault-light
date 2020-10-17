import CryptoJS from "crypto-js";
export const initialWallet = JSON.parse(localStorage.getItem("banWallet"));

export const initialPass = {
  password: "",
  timer: 10000,
};

export const PassReducer = (state, action) => {
  switch (action.type) {
    case "REPLACE_PASSWORD":
      return { ...state, ...{ password: action.payload } };
    default:
      return state;
  }
};

export const WalletReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_WALLET":
      localStorage.setItem(
        "banWallet",
        JSON.stringify({ ...state, ...action.payload })
      );
      return {...state, ...{ ...action.payload } };
    case "UPDATE_PASSWORD":
      const decryptedBytes = CryptoJS.AES.decrypt(
        state.seed,
        action.payload.actualValue
      );
      const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);
      let walletEncrypted = CryptoJS.AES.encrypt(
        decryptedSeed,
        action.payload.newValue
      ).toString();
      localStorage.setItem("banWallet", JSON.stringify({
        ...state,
        ...{ seed: walletEncrypted }
      }))
      return {...state, ...{seed:walletEncrypted}};
    default:
      return state;
  }
};
