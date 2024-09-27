"use client";

import { Chart, ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import {
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

const UserSignup = ({ monthData }: { monthData: any }) => {
  const data: ChartData<"line"> = {
    labels: [
      "فروردین",
      "اردیبهشت",
      "خرداد",
      "تیر",
      "مرداد",
      "شهریور",
      "مهر",
      "آبان",
      "آذر",
      "دی",
      "بهمن",
      "اسفند",
    ],
    datasets: [
      {
        label: "User Growth",
        data: monthData,
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
      },
    },
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "تعداد ثبت نام کاربران در ماه",
        color: "Black",
      },
    },
  };

  return <Line className=" bg-white rounded" data={data} options={options} />;
};
export { UserSignup };
