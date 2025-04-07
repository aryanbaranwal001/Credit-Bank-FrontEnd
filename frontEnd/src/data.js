import { dai, link, usdc, wbtc, weth } from "../img";

const TOKENS = [
  { name: "DAI", symbol: "DAI", address: "0x6B175...4dd1", img: dai },
  { name: "Chainlink", symbol: "LINK", address: "0x514910...EE4E",img: link },
  { name: "USDC", symbol: "USDC", address: "0xA0b8...eB48",img: usdc },
  { name: "Wrapped Bitcoin", symbol: "WBTC", address: "0x2260...C599",img: wbtc },
  { name: "Wrapped Ethereum", symbol: "WETH", address: "0xfFf9...6B14",img: weth },
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
  {
    id: 4,
    collateral: [
      { token: "SuperUltraMegaTokenNameThatBreaksUIs", amount: 999999, usd: 9999999 },
      { token: "🧪WTF", amount: 0.00000001, usd: 0.00001 },
      { token: "AVAX", amount: 1000000, usd: 100000 },
      { token: "ZRX", amount: 333333, usd: 50000 },
      { token: "PEPE", amount: 999999999, usd: 3 },
      { token: "LONGTOKENNAMEAGAINJUSTTOBREAKIT", amount: 9999, usd: 900000 },
      { token: "SMOL", amount: 0.0001, usd: 0.00001 },
    ],
    totalCollateral: 11000000,
    borrow: { token: "WEIRDCOIN123", amount: 77777, usd: 987654 },
    healthFactor: 0.4,
    creditScore: 50,
  },
  {
    id: 5,
    collateral: [
      { token: "USDT", amount: 0, usd: 0 },
      { token: "USDC", amount: 0, usd: 0 },
      { token: "DAI", amount: 0, usd: 0 },
    ],
    totalCollateral: 0,
    borrow: { token: "ETH", amount: 0, usd: 0 },
    healthFactor: 0,
    creditScore: 0,
  },
  {
    id: 6,
    collateral: Array.from({ length: 20 }, (_, i) => ({
      token: `TOKEN${i + 1}`,
      amount: (i + 1) * 1000,
      usd: (i + 1) * 500,
    })),
    totalCollateral: 105000,
    borrow: { token: "LOADTEST", amount: 100000, usd: 50000 },
    healthFactor: 5,
    creditScore: 850,
  },
];


export { TOKENS, RepaymentData };
