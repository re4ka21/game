import { View, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useStocksStore } from "@/features/stocks/model/useStocksStore";

type StockChartProps = { stockId: string };

export const StockChart = ({ stockId }: StockChartProps) => {
  const priceHistory = useStocksStore((s) => s.priceHistory[stockId] || []);

  const labels = priceHistory.map((p) => {
    const date = new Date(p.time);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  });

  const data = priceHistory.map((p) => p.price);

  const maxLabels = 6;
  const step = Math.max(1, Math.floor(priceHistory.length / maxLabels));
  const displayedLabels = labels.map((label, index) =>
    index % step === 0 ? label : ""
  );

  return (
    <View>
      <LineChart
        data={{
          labels: displayedLabels,
          datasets: [{ data }],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        yAxisLabel="$"
        chartConfig={{
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(47, 128, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForLabels: { fontSize: 10 },
        }}
        bezier
        style={{ borderRadius: 16 }}
      />
    </View>
  );
};
