// components/BlocksTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import useGetLatestBlock from "@/hooks/useGetLatestBlock";
import Link from "next/link";

export default function BlocksTable() {
  const { data: blocks, isLoading, isError, error } = useGetLatestBlock(20);

  if (isError) return <div>Error {error.message}</div>;

  if (isLoading || !blocks)
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg my-16">
        <span className="animate-pulse text-white">Loading Block Table...</span>
      </div>
    );

  return (
    <div className=" text-slate-200 rounded-lg">
      <h2 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-6">
        Last 20 Blocks
      </h2>
      <Table className="w-full border border-slate-600 rounded-lg overflow-hidden">
        <TableCaption className="text-slate-400">Monad Block Data</TableCaption>
        <TableHeader>
          <TableRow className="bg-slate-800">
            <TableHead className="py-3 px-4 w-[100px] text-slate-300">
              Block Number
            </TableHead>
            <TableHead className="py-3 px-4 text-slate-300">
              Timestamp
            </TableHead>
            <TableHead className="py-3 px-4 text-slate-300">
              Transactions
            </TableHead>
            <TableHead className="py-3 px-4 text-right text-slate-300">
              Validator
            </TableHead>
            <TableHead className="py-3 px-4 text-right text-slate-300">
              Gas Used
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-gray-900">
          {blocks.map(
            ({ gasUsed, number, timestamp, transactionCount, validator }) => (
              <TableRow
                key={number}
                className="hover:bg-slate-800 transition-colors"
              >
                <TableCell className="py-3 px-4 ">
                  <Link
                    className="underline hover:text-blue-400"
                    referrerPolicy="no-referrer"
                    target="_blank"
                    href={`https://testnet.monadexplorer.com/block/${number}`}
                  >
                    {number}
                  </Link>
                </TableCell>
                <TableCell className="py-3 px-4">
                  {new Date(timestamp * 1000).toLocaleString()}
                </TableCell>
                <TableCell className="py-3 px-4">{transactionCount}</TableCell>
                <TableCell className="py-3 px-4 text-right">
                  {validator.slice(0, 8)}...
                </TableCell>
                <TableCell className="py-3 px-4 text-right">
                  {gasUsed}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
        <TableFooter>
          <TableRow className="bg-slate-800 text-slate-300">
            <TableCell colSpan={4} className="py-3 px-4 text-left font-bold">
              Total Gas Used:
            </TableCell>
            <TableCell className="py-3 px-4 text-right font-mono">
              {blocks.reduce((sum, block) => sum + block.gasUsed, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
