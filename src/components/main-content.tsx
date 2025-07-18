//components
import BlockAnimation from "@/components/block-animation";
import BlocksTable from "@/components/block-table";
import TPSChart from "@/components/tps-chart";

export default function MainContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-wide bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent text-center mb-6">
        Monalyzer
      </h1>
      <TPSChart />
      <BlockAnimation />
      <BlocksTable />
    </div>
  );
}
