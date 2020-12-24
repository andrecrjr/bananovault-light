import { getAmountPartsFromRaw } from "@bananocoin/bananojs/app/scripts/banano-util";
import { getBalance } from "service";
export const addressReduce = (address) => {
  let firstPart = address.substring(0, 11);
  let secondPart = address.substring(55, 64);
  return `${firstPart}...${secondPart}`;
};

export const updateBananoAmounts = async (state) => {
  if (state.accounts.length > 0) {
    let totalBananoBalance = [];
    let onlyActiveAddress = state.accounts.filter(
      (user) => user.show !== false
    );
    let onlyUserAddress = onlyActiveAddress.map(
      (userAcc) => userAcc.banAddress
    );

    let data = await getBalance(onlyUserAddress);
    const userBalance = onlyActiveAddress.map(async (account) => {
      if (Object.keys(data).length > 0) {
        let userBalance = data[account.banAddress];
        let bananoBalance =
          typeof userBalance === "undefined"
            ? "0"
            : getAmountPartsFromRaw(userBalance.balance, "ban_").banano;
        if (typeof userBalance !== "undefined") {
          totalBananoBalance.push(bananoBalance);
        }

        return {
          banAddress: account.banAddress,
          balance: bananoBalance,
          index: account.index,
        };
      }
    });

    const balances = await Promise.all(userBalance);
    const allBananoAmount = totalBananoBalance.reduce((item, acc) => {
      return parseFloat(item) + parseFloat(acc);
    });

    return [balances, allBananoAmount];
  }
  return false;
};
