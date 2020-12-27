import { useCallback, useState } from "react";
import { getPendings } from "service";

export const useBananoPending = () => {
  const [pendingBlocks, setPendings] = useState();

  const pendings = useCallback(async (wallet) => {
    try {
      if (wallet.length > 0) {
        const accounts = wallet.filter((acc) => acc.show === true);
        const listAccounts = accounts.map((item) => item.banAddress);
        let pendingEntries = [];
        if (listAccounts.length > 0) {
          const listAccountPendings = await getPendings(listAccounts);
          if (listAccountPendings) {
            pendingEntries = Object.entries(listAccountPendings.blocks);
          }
        }
        setPendings(pendingEntries);
      }
    } catch (e) {
      console.log(e);
    }
  }, []);

  return [pendingBlocks, pendings];
};
