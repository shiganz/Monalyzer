import { useQuery } from "@tanstack/react-query";
import { getTransactionByHash } from "../lib/monadApi";

export default function useGetTransactionByHash(hash: string) {
  return useQuery({
    queryKey: ["tx-by-hash", { hash }],
    queryFn: () => getTransactionByHash(hash),
    refetchInterval: 10000,
  });
}
