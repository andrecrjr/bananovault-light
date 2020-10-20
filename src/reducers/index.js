import { updatePassword } from "./helper";

export const initialWallet = JSON.parse(localStorage.getItem("banWallet"));

export const initialPass = {
  pass: "",
  timer: 10000,
};

export const PassReducer = (state, action) => {
  switch (action.type) {
    case "REPLACE_PASSWORD":
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
    case "ADD_HEADER_PRICE":
      let updatePrice = {
        ...state,
        ...{
          amountBananoWallet: (state.amountBananoWallet = +action.payload
            .balance),
        },
      };
      return updatePrice;
    case "MINUS_HEADER_PRICE":
      let minosPrice = {
        ...state,
        ...{
          amountBananoWallet: (state.amountBananoWallet = -action.payload
            .balance),
        },
      };
      return minosPrice;
    case "UPDATE_PASSWORD":
      let walletEncrypted = updatePassword(state, action);
      return { ...state, ...{ seed: walletEncrypted } };
    default:
      return state;
  }
};
