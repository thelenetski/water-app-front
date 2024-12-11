import { useSelector } from "react-redux";
import { selectUser } from "../../redux/user/selectors";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslation } from "react-i18next";

const MonthInfoChart = ({ data }) => {
  const { t } = useTranslation();
  const userData = useSelector(selectUser);

  if (!userData || !userData.data?.dailyNorm) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 50,
          right: 12,
          left: 0,
          bottom: 10,
        }}
      >
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop
              offset="40%"
              stopColor="var(--main-color)"
              stopOpacity={0.9}
            />
            <stop offset="100%" stopColor="var(--main-color)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tickMargin={20}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, userData.data.dailyNorm]}
          width={80}
          tick={{ textAnchor: "start", dx: -30 }}
          tickMargin={35}
          tickFormatter={(value) => {
            if (value === 0) {
              return 0 + "%";
            } else {
              return (value / 1000).toFixed(1) + t("WaterItem.L");
            }
          }}
        />
        <Tooltip
          formatter={(value) => {
            // const customName = name === "amount" ? "Drunk" : name;
            return [`${value} ml`];
          }}
          labelFormatter={(label) => `${t("MonthInfo.day")}: ${label}`}
        />
        <Area
          type="linear"
          dataKey="amount"
          stroke="var(--hover-green-color)"
          strokeWidth={2}
          fill="url(#gradient1)"
          dot={{
            r: 10,
            stroke: "var(--hover-green-color)",
            strokeWidth: 3,
            fill: "#ffffff",
            fillOpacity: 1,
          }}
          activeDot={false}
          tickMargin={20}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default MonthInfoChart;
