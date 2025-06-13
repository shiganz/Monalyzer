import { getChainStats } from "@/lib/monadApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetChainStats() {
  return useQuery({
    queryKey: ["stats"],
    queryFn: () => getChainStats(),
    refetchInterval: 5000,
    refetchIntervalInBackground: true, // Optional: Refetch in background
  });
}
