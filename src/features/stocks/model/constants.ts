import { Stock } from "./useStocksStore";

export const INITIAL_STOCKS: Stock[] = [
  {
    id: "aapl",
    name: "Apple",
    price: 185,
    dividendPercent: 0.015,
    targetPrice: 120,
    logo: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: "msft",
    name: "Microsoft",
    price: 410,
    dividendPercent: 0.02,
    targetPrice: 60,
    logo: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: "jnj",
    name: "Johnson & Johnson",
    price: 165,
    dividendPercent: 0.035,
    targetPrice: 100,
    logo: require("../../../../assets/images/react-logo.png"),
  },
  {
    id: "ko",
    name: "Coca-Cola",
    price: 60,
    dividendPercent: 0.04,
    targetPrice: 86,
    logo: require("../../../../assets/images/react-logo.png"),
  },
];
