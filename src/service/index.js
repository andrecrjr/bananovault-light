import bananojs from "@bananocoin/bananojs";
import crypto from "crypto";
import {
  isSeedValid,
  getAmountPartsFromRaw,
} from "@bananocoin/bananojs/app/scripts/banano-util";
import { getSeedFromPassword } from "./helper";

bananojs.setBananodeApiUrl("https://kaliumapi.appditto.com/api");

export const createNewWallet = async () => {
  try {
    const seed = crypto.randomBytes(32).toString("hex");
    const seedData = await createUsingSeed(seed);
    return { ...seedData };
  } catch (e) {
    console.log(e);
  }
};

export const createUsingSeed = async (seed) => {
  try {
    const privateKey = bananojs.getPrivateKey(seed, 0);
    const publicKey = bananojs.getPublicKey(privateKey);
    const banAddress = bananojs.getAccount(publicKey, "ban_");
    let url = `https://creeper.banano.cc/explorer/account/${banAddress}`;
    return {
      publicKey,
      url,
      seed,
      accounts: [{ banAddress, index: 0 }],
    };
  } catch (error) {
    console.log(error);
  }
};

export const openReceive = async (seed, banAddress) => {
  try {
    const pendingBlock = await bananojs.receiveBananoDepositsForSeed(
      seed,
      "0",
      "ban_1sebrep1mbkdtdb39nsouw5wkkk6o497wyrxtdp71sm878fxzo1kwbf9k79b"
    );
    const data = await bananojs.getAccountInfo(banAddress);
    console.log("account", data);
    //first block done, set representative default
    if (data.block_count === "1") {
      await setRepresentive(seed);
    }
    return pendingBlock;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const setRepresentive = async (seed, newRep) => {
  try {
    const data = await bananojs.changeBananoRepresentativeForSeed(
      seed,
      "0",
      newRep ||
        "ban_1sebrep1mbkdtdb39nsouw5wkkk6o497wyrxtdp71sm878fxzo1kwbf9k79b"
    );
    return data;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getBanAddress = async (seedEncoded, password, index = "0") => {
  try {
    const seed = getSeedFromPassword(seedEncoded, password);
    if (isSeedValid(seed)) {
      const banAddress = await bananojs.getBananoAccountFromSeed(seed, index);
      let url = `https://creeper.banano.cc/explorer/account/${banAddress}`;
      return { banAddress, url, index };
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getBananoAccount = async (seed, id = "0") => {
  const data = await bananojs.getBananoAccountFromSeed(seed, id);
  console.log(data);
};

export const getBalance = async (banAddress) => {
  try {
    let accountInfo = await bananojs.getAccountInfo(banAddress);
    if (
      accountInfo.error &&
      accountInfo.error.indexOf("Account not found") !== -1
    ) {
      accountInfo = { ...accountInfo, accountFound: false, balance: 0 };
      return accountInfo;
    } else {
      accountInfo = { ...accountInfo, accountFound: true };
    }
    let urlLastBlock = `https://creeper.banano.cc/explorer/block/${accountInfo.frontier}`;
    accountInfo = {
      ...accountInfo,
      ...{
        balance: accountInfo.accountFound
          ? getAmountPartsFromRaw(accountInfo.balance, "ban_").banano
          : 0,
      },
      urlLastBlock,
    };

    return accountInfo;
  } catch (e) {
    console.log(e);
  }
};

export const sendBanano = async (amount, destAcc, seed) => {
  try {
    let amountRaw = await bananojs.getRawStrFromBananoStr(amount.toString());
    await bananojs.sendAmountToBananoAccountWithRepresentativeAndPrevious(
      seed,
      "0",
      destAcc,
      amountRaw,
      "ban_1sebrep1mbkdtdb39nsouw5wkkk6o497wyrxtdp71sm878fxzo1kwbf9k79b"
    );

    return true;
  } catch (error) {
    console.log(error);
  }
};
