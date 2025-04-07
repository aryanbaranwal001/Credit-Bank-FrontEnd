const TOKENS = [
  { name: "USDC", symbol: "USDC", address: "0xA0b8...eB48" },
  { name: "Ethereum", symbol: "ETH" },
  { name: "Tether", symbol: "USDT", address: "0xdAC1...1ec7" },
  { name: "Base ETH", symbol: "ETH" },
  { name: "Wrapped Bitcoin", symbol: "WBTC", address: "0x2260...C599" },
  { name: "USD Coin", symbol: "USDC", address: "0xaf88...5831" },
  { name: "USDC", symbol: "USDC", address: "0x8335...2913" },
  { name: "USDT0", symbol: "USDT", address: "0xFd08...Cbb9" },
];

const RepaymentData = [
  {
    id: 1,
    collateral: [
      { token: "USDT", amount: 5000, usd: 5000 },
      { token: "weETH", amount: 3000, usd: 25000 },
      { token: "BOB", amount: 2342, usd: 73400 },
    ],
    totalCollateral: 34398,
    borrow: { token: "weETH", amount: 100, usd: 3000 },
    healthFactor: 4,
    creditScore: 400,
  },
  {
    id: 2,
    collateral: [
      { token: "DAI", amount: 1000, usd: 1000 },
      { token: "ETH", amount: 1, usd: 2000 },
    ],
    totalCollateral: 3000,
    borrow: { token: "ETH", amount: 0.5, usd: 1000 },
    healthFactor: 3.5,
    creditScore: 350,
  },
  {
    id: 3,
    collateral: [
      { token: "MATIC", amount: 500, usd: 500 },
    ],
    totalCollateral: 500,
    borrow: { token: "USDC", amount: 200, usd: 200 },
    healthFactor: 1.8,
    creditScore: 200,
  },
];

export { TOKENS, RepaymentData };
