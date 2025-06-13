export interface BlockData {
  number: number;
  timestamp: number;
  transactionCount: number;
  validator: string;
  gasUsed: number;
  transactions: TransactionData[];
}

export interface ChainStats {
  tps: number;
  blockTime: number;
}

export interface TransactionData {
  hash: string;
  from: string;
  to: string;
  value: number;
  input: string;
  type: string;
}

export type TPSData = {
  timestamp: string;
  tps: number;
};

export type CustomTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value: number;
    name?: string;
    [key: string]: string | number | undefined;
  }>;
  label?: string;
};
