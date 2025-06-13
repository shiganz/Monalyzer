// lib/monadApi.ts
import { createPublicClient, http, Transaction } from "viem";
import { monadTestnet } from "./wagmiConfig";
import { BlockData, ChainStats, TransactionData } from "@/type";

export const client = createPublicClient({
  chain: monadTestnet,
  transport: http(),
});

// export const latestBlock = await getBlock(client, { blockTag: "latest" });

export async function getLatestBlocks(limit: number): Promise<BlockData[]> {
  try {
    const latestBlockNumber = await client.getBlockNumber();
    const blocks: BlockData[] = [];

    for (let i = 0; i < limit; i++) {
      const blockNumber = latestBlockNumber - BigInt(i);
      try {
        const block = await client.getBlock({
          blockNumber,
          includeTransactions: true,
        });
        blocks.push({
          number: Number(block.number),
          timestamp: Number(block.timestamp),
          transactionCount: block.transactions.length,
          validator: block.miner,
          gasUsed: Number(block.gasUsed),
          transactions: (block.transactions as Transaction[]).map(tx => ({
            hash: tx.hash,
            from: tx.from,
            to: tx.to || "Contract Creation",
            value: Number(tx.value) / 1e18,
            input: tx.input,
            type: tx.type,
          })),
        });
      } catch (error) {
        console.error(`Error fetching block ${blockNumber}:`, error);
        continue;
      }
    }
    return blocks;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return [];
  }
}

export async function getTransactionsByBlock(
  blockNumber: number
): Promise<TransactionData[]> {
  try {
    const block = await client.getBlock({
      blockNumber: BigInt(blockNumber),
      includeTransactions: true,
    });
    return (block.transactions as Transaction[]).map(tx => ({
      hash: tx.hash,
      from: tx.from,
      to: tx.to || "Contract Creation",
      value: Number(tx.value) / 1e18,
      input: tx.input,
      type: tx.type,
    }));
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}

export async function getTransactionByHash(
  hash: string
): Promise<TransactionData | null> {
  try {
    const tx = await client.getTransaction({ hash: hash as `0x${string}` });
    return {
      hash: tx.hash,
      from: tx.from,
      to: tx.to || "Contract Creation",
      value: Number(tx.value) / 1e18,
      input: tx.input,
      type: tx.type,
    };
  } catch (error) {
    console.error("Error fetching transaction:", error);
    return null;
  }
}

export async function getChainStats(): Promise<ChainStats> {
  try {
    const block = await client.getBlock({ includeTransactions: true });
    const tps = block.transactions.length / 0.5;
    return { tps, blockTime: Number(block.timestamp) };
  } catch (error) {
    console.error("Error fetching chain stats:", error);
    return { tps: 0, blockTime: 0 };
  }
}
