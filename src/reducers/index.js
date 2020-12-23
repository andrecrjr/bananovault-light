import { updatePassword } from "./helper";

export const initialWallet = {
  ...(JSON.parse(localStorage.getItem("banWallet")) || []),
};

export const initialPass = {
  pass: "",
  timer: 10000,
};

export const PassReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_PASSWORD":
      return { ...state, ...{ pass: action.payload } };
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
      return { ...state, ...{ ...action.payload } };
    case "REMOVE_IN_ACCOUNTS":
      let removeAddress = {
        ...state,
        accounts: state.accounts.map((item) => {
          if (item.index === action.payload) {
            return { ...item, show: false };
          }
          return { ...item };
        }),
      };
      localStorage.setItem("banWallet", JSON.stringify(removeAddress));
      return removeAddress;
    case "CREATE_NEW_ACCOUNT":
      let newAddress = {};
      let alreadyInAcc = state.accounts.filter((item) => item.show === false);
      if (alreadyInAcc.length === 0) {
        newAddress = {
          ...state,
          accounts: [...state.accounts, action.payload],
        };
      } else {
        newAddress = {
          ...state,
          accounts: state.accounts.map((item) => {
            if (alreadyInAcc[0].index === item.index) {
              return { ...item, show: true };
            }
            return { ...item };
          }),
        };
      }
      localStorage.setItem("banWallet", JSON.stringify({ ...newAddress }));
      return newAddress;
    case "UPDATE_ACCOUNT":
      let updateAccount = {
        ...state,
        accounts: state.accounts.map((acc) => {
          if (acc.index === action.payload.index) {
            return { ...acc, ...action.payload };
          } else {
            return { ...acc };
          }
        }),
      };
      localStorage.setItem("banWallet", JSON.stringify(updateAccount));
      return updateAccount;
    case "TOTAL_AMOUNT_USER":
      let banAmount = 0;
      if (state.accounts.length > 0) {
        banAmount = state.accounts
          .map((acc) => acc.banAmount)
          .filter((acc) => acc !== undefined)
          .reduce((acc, now) => {
            return parseFloat(acc) + parseFloat(now);
          });
      }
      let updateTotal = { ...state, ...{ amountBalance: banAmount } };
      localStorage.setItem("banWallet", JSON.stringify(updateTotal));
      return updateTotal;
    case "UPDATE_PASSWORD":
      let walletEncrypted = updatePassword(state, action);
      return { ...state, ...{ seed: walletEncrypted } };
    default:
      return state;
  }
};
