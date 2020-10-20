export const bananoSettings = {
  banUser: {
    displayDenomination: "BANANO",
    walletStore: "localStorage",
    displayCurrency: "USD",
    defaultRepresentative: null,
    lockOnClose: 1,
    lockInactivityMinutes: 30,
    powSource: "best",
    serverName: "bananovault",
    serverAPI: null,
    serverNode: null,
    serverWS: null,
    minimumReceive: null,
  },
};

export const banWallet = {
  seed: "",
  locked: true,
  type: "seed",
  timer: 10,
  amountBananoWallet: 0,
  accounts: [],
};
