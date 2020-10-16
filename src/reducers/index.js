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
      return { ...state, ...action.payload };
    case "CREATE_PASSWORD":
      console.log(action.payload);
      localStorage.setItem(
        "banWallet",
        JSON.stringify({ ...state, ...action.payload })
      );
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
