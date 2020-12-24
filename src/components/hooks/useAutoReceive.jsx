import { useCallback, useState } from "react";
import { openReceive } from "service";

export const useAutoReceive = (state, password) => {
  const [received, setReceived] = useState({});
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
                    acc.representative,
                    acc.banAddress
                  );
                  console.log("returned receives!", wasReceived);
                  setReceived(wasReceived);
                } catch (error) {
                  console.log(error);
                  return false;
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
