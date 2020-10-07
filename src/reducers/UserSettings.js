export const BanWallet = {
  bananoWallet: {
    seed: "",
    mainBanAddress: "",
    locked: true,
    type: "seed",
  },
};

export const BanSettings = {
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
