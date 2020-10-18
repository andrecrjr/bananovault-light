import CryptoJS from "crypto-js";
import { getBanAddress } from "./";

export const getSeedFromPassword = (seedEncoded, password) => {
  const decryptedBytes = CryptoJS.AES.decrypt(seedEncoded, password);
  const decryptedSeed = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedSeed;
};

export const updateNewAccount = async (seedEncoded, password, index) => {
  try {
    const data = await getBanAddress(seedEncoded, password, index);
    return data;
  } catch (e) {
    return false;
  }
};
