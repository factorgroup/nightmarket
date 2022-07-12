import { Contract, Event as EthersEvent, Transaction } from "ethers";
import { useEffect, useState } from "preact/hooks";


export function useAskTx (market: Contract, buyer: string, listingId: number) {
    const [ askTx, setAskTx ] = useState<Transaction>();

    useEffect(() => {
        (
            async () => {
                const askEvent: EthersEvent[] = await market.queryFilter(market.filters.Asked(buyer, listingId));
                const askTx = await askEvent[ 0 ].getTransaction();
                setAskTx(askTx);
            }
        )();
    }, []);

    return askTx;
}
