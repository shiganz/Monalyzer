// components/block-modal-content.tsx
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BlockData } from "@/type";
import Link from "next/link";
import BlockModalContentTxs from "./block-modal-content-txs";

export function BlockModalContent({ number, transactions }: BlockData) {
  const totalValue = transactions.reduce((sum, tx) => sum + tx.value, 0);

  return (
    <DialogContent className="sm:max-w-[600px] lg:max-w-[800px] bg-gray-800 text-gray-200 rounded-xl shadow-xl border border-gray-700">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-100 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">
          Transactions for Block{" "}
          <Link
            referrerPolicy="no-referrer"
            target="_blank"
            href={`https://testnet.monadexplorer.com/block/${number}`}
            className="underline"
          >
            #{number}
          </Link>
        </DialogTitle>
      </DialogHeader>
      <BlockModalContentTxs transactions={transactions} />
      <DialogDescription className="flex justify-end items-center text-gray-300 mt-2">
        <span className="font-mono text-md bg-gray-700 px-4 py-2 rounded-full shadow-md">
          Total Value: {totalValue.toFixed(4)} MON
        </span>
      </DialogDescription>
    </DialogContent>
  );
}
