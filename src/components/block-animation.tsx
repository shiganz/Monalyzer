// components/BlockAnimation.tsx
"use client";

import { BlockData } from "@/type";
import useGetLatestBlock from "@/hooks/useGetLatestBlock";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { BlockModalContent } from "./block-modal-content";
import Image from "next/image";
import Link from "next/link";

export default function BlockAnimation() {
  const {
    data: latestBlocks,
    isLoading,
    isError,
    error,
  } = useGetLatestBlock(10);

  if (isError)
    return <div className="text-red-500">Error: {error.message}</div>;

  if (isLoading || !latestBlocks)
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-900 rounded-lg my-16">
        <span className="animate-pulse text-white">
          Loading Latest Block Animation...
        </span>
      </div>
    );

  const getCarStyle = (block: BlockData) => {
    const hue = (block.number * 137) % 360;
    return {
      background: `linear-gradient(135deg, hsl(${hue}, 70%, 50%), hsl(${hue}, 70%, 40%))`,
      boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    };
  };

  return (
    <div className="p-6 bg-gray-900 rounded-xl shadow-2xl border border-gray-800 my-16">
      <h2 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent mb-12">
        Live Blockchain Traffic (Last 10 Blocks)
      </h2>
      <div className="flex justify-center flex-wrap gap-6 animate-fadeIn">
        {latestBlocks.map(block => (
          <Dialog key={block.number}>
            <DialogTrigger asChild>
              <div
                className="relative bg-opacity-90 text-white rounded-xl p-6 w-48 h-48 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg transform transition-all duration-300"
                style={getCarStyle(block)}
                onMouseEnter={e =>
                  (e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(0, 0, 0, 0.5)")
                }
                onMouseLeave={e =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 15px rgba(0, 0, 0, 0.3)")
                }
              >
                <div className="text-center z-10">
                  <p className="text-6xl">🚗</p>
                  <div className="relative">
                    <Image
                      src="/plate.png"
                      width={150}
                      height={150}
                      alt="plate-card"
                    />
                    <Link
                      referrerPolicy="no-referrer"
                      target="_blank"
                      href={`https://testnet.monadexplorer.com/block/${block.number}`}
                    >
                      <p className="hover:text-purple-300 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 font-bold">
                        #{block.number}
                      </p>
                    </Link>
                  </div>
                </div>
                <p className="text-sm mb-4 text-slate-300 font-semibold">
                  {block.transactionCount} txns
                </p>
                <div className="absolute bottom-4 left-4 w-4 h-4 bg-black rounded-full animate-pulse" />
                <div className="absolute bottom-4 right-4 w-4 h-4 bg-black rounded-full animate-pulse" />
              </div>
            </DialogTrigger>
            <BlockModalContent {...block} />
          </Dialog>
        ))}
      </div>
    </div>
  );
}
