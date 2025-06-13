import { getTransactionsByBlock } from "@/lib/monadApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetTransactionsByBlock(blockNumber: number) {
  return useQuery({
    queryKey: ["tx-by-block", { blockNumber }],
    queryFn: () => getTransactionsByBlock(blockNumber),
    enabled: !!blockNumber,
  });
}
