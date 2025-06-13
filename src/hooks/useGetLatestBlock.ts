import { getLatestBlocks } from "@/lib/monadApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetLatestBlock(blockNumber: number) {
  return useQuery({
    queryKey: ["latest-block", { blockNumber }],
    queryFn: () => getLatestBlocks(blockNumber),
    refetchInterval: 3000,
    refetchIntervalInBackground: true, // Optional: Refetch in background
  });
}
