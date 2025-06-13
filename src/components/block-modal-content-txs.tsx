import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { TransactionData } from "@/type";

export default function BlockModalContentTxs({
  transactions,
}: {
  transactions: TransactionData[];
}) {
  return (
    <div className="max-h-[600px] overflow-y-auto rounded-lg border border-gray-600 bg-gray-900">
      {transactions.length > 0 ? (
        <Table className="w-full text-left">
          <TableHeader className="sticky top-0 bg-gray-800 text-gray-400">
            <TableRow>
              <TableHead className="py-3 px-5 text-slate-400">Hash</TableHead>
              <TableHead className="py-3 px-5 text-slate-400">Type</TableHead>
              <TableHead className="py-3 px-5 text-slate-400">From</TableHead>
              <TableHead className="py-3 px-5 text-slate-400">To</TableHead>
              <TableHead className="py-3 px-5 text-slate-400">
                Value (MON)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-gray-700">
            {transactions.map(({ hash, type, from, to, value }) => (
              <TableRow
                key={hash}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <TableCell className="py-3 px-5 text-gray-300 ">
                  <Link
                    referrerPolicy="no-referrer"
                    target="_blank"
                    href={`https://testnet.monadexplorer.com/tx/${hash}`}
                    className="underline hover:text-blue-400"
                  >
                    {hash.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-300">
                  {type}
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-300 ">
                  <Link
                    referrerPolicy="no-referrer"
                    target="_blank"
                    href={`https://testnet.monadexplorer.com/address/${from}`}
                    className="underline hover:text-blue-400"
                  >
                    {from.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-300 ">
                  <Link
                    referrerPolicy="no-referrer"
                    target="_blank"
                    href={`https://testnet.monadexplorer.com/address/${to}`}
                    className="underline hover:text-blue-400"
                  >
                    {to.slice(0, 8)}...
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-5 text-gray-300">
                  {value.toFixed(4)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="text-center py-6 text-gray-400 font-medium">
          No transactions in this block.
        </p>
      )}
    </div>
  );
}
