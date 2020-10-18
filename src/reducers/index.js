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
        accounts: state.accounts.filter(
          (item, index) => item.index !== action.payload
        ),
      };
      localStorage.setItem("banWallet", JSON.stringify(removeAddress));
      return removeAddress;
    case "CREATE_NEW_ACCOUNT":
      let newAddress = {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
      localStorage.setItem(
        "banWallet",
        JSON.stringify({ ...state, ...newAddress })
      );
      return newAddress;
    case "UPDATE_PASSWORD":
      let walletEncrypted = updatePassword(state, action);
      return { ...state, ...{ seed: walletEncrypted } };
    default:
      return state;
  }
};
