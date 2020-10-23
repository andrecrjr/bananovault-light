export const banWallet = {
  seed: "",
  locked: true,
  type: "seed",
  timer: 10,
  amountWallet: 0,
  accounts: [],
};

export const banSettings = {
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
