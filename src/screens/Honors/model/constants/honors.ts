import { HonorItem } from "../type/honors";
export const DATA_HONORS: HonorItem[] = [
  {
    id: 1,
    title: "The Owner",
    colors: ["#ff9966", "#5f5f5f"] as const,
    image: require("../../../../assets/images/react-logo.png"),
    conditions: "Для получения нужно 30 предметов в наличии",
    hidden: true,
  },
  {
    id: 2,
    title: "Monopoly",
    colors: ["#00c6ff", "#0072ff"] as const,
    image: require("../../../../assets/images/react-logo.png"),
    conditions:
      "Общее активы более 500 триллионов; 10 крупнейши холденговых компаний принадлежащих или 5 нефтегазовых компаний с доходом более 12 миллиардов в час, принадлежащих",
  },
  {
    id: 3,
    title: "Business Empire",
    colors: ["#ff5757", "#ff8c00"],
    image: require("../../../../assets/images/react-logo.png"),
    conditions: "Иметь в владении 10 компаний",
    hidden: true,
  },
  {
    id: 4,
    title: "Investor",
    colors: ["#6a6a6a", "#b3b3b3"] as const,
    image: require("../../../../assets/images/react-logo.png"),
    conditions: "Выкуплены все компании на фондовом рынке",
  },
  {
    id: 5,
    title: "RichMan",
    colors: ["#00c48c", "#00835f"] as const,
    image: require("../../../../assets/images/react-logo.png"),
    conditions: "Сумарное Состояние более 1 млн",
  },
];
