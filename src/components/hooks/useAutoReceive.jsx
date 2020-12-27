import { useCallback, useState } from "react";
import { openReceive } from "service";
import { bananodeApi } from "@bananocoin/bananojs";

export const useAutoReceive = (state, password) => {
  const [received, setReceived] = useState(false);
  const receivePendings = useCallback(
    (blocks) => {
      if (blocks.length > 0) {
        blocks.map((banAcc) => {
          if (banAcc[1] !== "") {
            state.accounts.map(async (acc) => {
              if (acc.banAddress === banAcc[0] && password.pass !== "") {
                try {
                  const wasReceived = await openReceive(
                    state.seed,
                    password.pass,
                    acc.index,
                    (await bananodeApi.getAccountRepresentative(
                      acc.banAddress
                    )) || process.env.REACT_ENV_REPRESENTATIVE_DEFAULT,
                    acc.banAddress
                  );
                  setReceived(wasReceived);
                } catch (error) {
                  console.log(error);
                  setReceived(false);
                }
              }
            });
          }
          return true;
        });
      }
    },
    [password.pass, state]
  );

  return [received, receivePendings];
};
