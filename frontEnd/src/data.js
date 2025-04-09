import { dai, link, usdc, wbtc, weth } from "../img";
const TOKENS = [
  { name: "DAI", symbol: "DAI", address: "0x6B175...4dd1", img: dai, decimals: 18 },
  { name: "Chainlink", symbol: "LINK", address: "0x514910...EE4E",img: link, decimals: 18 },
  { name: "USDC", symbol: "USDC", address: "0xA0b8...eB48",img: usdc, decimals: 6 },
  { name: "Wrapped Bitcoin", symbol: "WBTC", address: "0x2260...C599",img: wbtc, decimals: 8 },
  { name: "Wrapped Ethereum", symbol: "WETH", address: "0xfFf9...6B14",img: weth, decimals: 18 },
];


// Example dummy contract ABI
export const BORROW_CONTRACT_ABI = [
  "function borrow(address[] collateralTokens, uint256[] collateralAmounts, address borrowToken, uint256 borrowAmount, uint256 startTimestamp, uint256 endTimestamp) external returns (bool)"
];

export const BORROW_CONTRACT_ADDRESS = "0x0000000000000000000000000000000000000000"; // Replace with actual contract address

const RepaymentData = [
  {
    id: 1,
    collateral: [
      { token: "WBTC", amount: 0.1, usd: 7000 },
      { token: "LINK", amount: 200, usd: 2800 },
    ],
    totalCollateral: 9800,
    borrow: { token: "USDC", amount: 2500, usd: 2500 },
    healthFactor: 2.8,
    creditScore: 380,
  },
  {
    id: 2,
    collateral: [
      { token: "DAI", amount: 1200, usd: 1200 },
      { token: "USDC", amount: 1500, usd: 1500 },
    ],
    totalCollateral: 2700,
    borrow: { token: "WETH", amount: 0.3, usd: 900 },
    healthFactor: 3.2,
    creditScore: 420,
  },
  {
    id: 3,
    collateral: [
      { token: "DAI", amount: 5000, usd: 5000 },
    ],
    totalCollateral: 5000,
    borrow: { token: "LINK", amount: 100, usd: 1400 },
    healthFactor: 3.6,
    creditScore: 400,
  },
  {
    id: 4,
    collateral: [
      { token: "WETH", amount: 2, usd: 6000 },
      { token: "LINK", amount: 50, usd: 700 },
    ],
    totalCollateral: 6700,
    borrow: { token: "DAI", amount: 3000, usd: 3000 },
    healthFactor: 2.1,
    creditScore: 310,
  },
  {
    id: 5,
    collateral: [
      { token: "USDC", amount: 10000, usd: 10000 },
    ],
    totalCollateral: 10000,
    borrow: { token: "WBTC", amount: 0.2, usd: 14000 },
    healthFactor: 0.7,
    creditScore: 180,
  },
];



export { TOKENS, RepaymentData };
