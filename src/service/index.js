import bananojs, { bananodeApi } from "@bananocoin/bananojs";
import crypto from "crypto";
import { isSeedValid } from "@bananocoin/bananojs/app/scripts/banano-util";
import { getSeedFromPassword } from "./helper";
import { getAccountHistory } from "@bananocoin/bananojs/app/scripts/bananode-api";

let bananoApi = "https://kaliumapi.appditto.com/api";
bananojs.setBananodeApiUrl(bananoApi);

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
    const publicKey = await bananojs.getPublicKey(privateKey);
    const banAddress = await bananojs.getBananoAccount(publicKey);
    let representative = await bananodeApi.getAccountRepresentative(banAddress);
    let url = `https://creeper.banano.cc/explorer/account/${banAddress}`;
    return {
      publicKey,
      url,
      seed,
      accounts: [
        {
          banAddress,
          index: 0,
          representative,
          show: true,
        },
      ],
    };
  } catch (error) {
    console.log(error);
  }
};

export const openReceive = async (
  seedEncoded,
  password,
  index,
  rep,
  banAddress
) => {
  try {
    let seed = getSeedFromPassword(seedEncoded, password);
    const receives = await bananojs.receiveBananoDepositsForSeed(
      seed,
      index.toString(),
      rep
    );
    const data = await bananojs.getAccountInfo(banAddress);
    //first block done, set representative default
    // if (data.block_count === "1") {
    //   await setRepresentive(seed);
    // }
    console.log(receives, data);
    return receives;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPendings = async (accounts) => {
  const data = await bananojs.getAccountsPending(accounts, -1, true);
  return data;
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
      const representative = await bananodeApi.getAccountRepresentative(
        banAddress
      );
      return { banAddress, url, index, show: true, representative };
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

export const getBalance = async (banAddress, profile = false) => {
  const data = await fetch(bananoApi, {
    method: "POST",
    body: JSON.stringify({
      action: "accounts_balances",
      accounts: profile ? [banAddress] : banAddress,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 50000,
  });
  let { balances } = await data.json();
  let newBalance = balances;
  if (profile) {
    const representative = await bananodeApi.getAccountRepresentative(
      banAddress
    );
    const history = await getAccountHistory(banAddress, -1);
    newBalance = { ...newBalance, ...history };
    if (representative) {
      newBalance = { ...newBalance, ...history, representative };
    }
    console.log(newBalance);
  }

  return newBalance;
};

export const sendBanano = async (amount, destAcc, seedEncoded, password) => {
  try {
    let seed = getSeedFromPassword(seedEncoded, password);
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
