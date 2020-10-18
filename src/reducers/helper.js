import CryptoJS from "crypto-js";

export const updatePassword = (state, action) => {
  const decryptedBytes = CryptoJS.AES.decrypt(
    state.seed,
    action.payload.actualValue
  );
  const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);
  let walletEncrypted = CryptoJS.AES.encrypt(
    decryptedSeed,
    action.payload.newValue
  ).toString();
  localStorage.setItem(
    "banWallet",
    JSON.stringify({
      ...state,
      ...{ seed: walletEncrypted },
    })
  );
  return walletEncrypted;
};
