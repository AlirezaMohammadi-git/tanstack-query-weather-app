import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";
import { format } from "date-fns";
import type { ForecastData } from "@/api/types";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

interface HourlyTemperatureProps {
  data: ForecastData;
}

interface ChartData {
  time: string;
  temp: number;
  feels_like: number;
}

export function HourlyTemperature({ data }: HourlyTemperatureProps) {
  // Get today's forecast data and format for chart

  const chartData: ChartData[] = data.list
    .slice(0, 8) // Get next 24 hours (3-hour intervals)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));



  const chartConfig = {
    temp: {
      label: "temp",
      color: "#FFA500",
    },
    feels_like: {
      label: "feels like",
      color: "#0000FF",
    },
  } satisfies ChartConfig

  const secondChart = <Card>
    <CardHeader>
      <CardTitle>Today's Temperature</CardTitle>
    </CardHeader>
    <CardContent>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ChartContainer config={chartConfig}>
            <AreaChart
              data={chartData}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}°`}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0000FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0000FF" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0000FF" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#0000FF" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="temp"
                type="natural"
                fill="url(#fillMobile)"
                fillOpacity={0.4}
                stroke="#0000FF"
                stackId="a"
              />
              <Area
                dataKey="feels_like"
                type="natural"
                fill="url(#fillDesktop)"
                fillOpacity={0.4}
                stroke="#0000FF"
                stackId="b"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </div>

    </CardContent>
  </Card>

  return secondChart;
}
