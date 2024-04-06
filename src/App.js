import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import LineChart from "./LineChart";
import { useEffect } from "react";

Chart.register(CategoryScale);
export default function App() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Users Gained",
        data: [],
        backgroundColor: [
          "rgba(75, 192, 192, 1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0"
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const xResponse = await fetch('https://retoolapi.dev/gDa8uC/data');
        const yResponse = await fetch('https://retoolapi.dev/o5zMs5/data');
        const xData = (await xResponse.json()).slice(0, 50);
        const yData = (await yResponse.json()).slice(0, 50);
  
        const updatedData = xData.map((item, index) => ({
          xValue: item.RandomNumber,
          yValue: yData[index].RandomNumber
        }));
  
        const chartLabels = updatedData.map((data) => data.xValue);
        const chartDataValues = updatedData.map((data) => data.yValue);
  
        setChartData({
          labels: chartLabels,
          datasets: [
            {
              label: "Users Gained",
              data: chartDataValues,
              backgroundColor: [
                "rgba(75, 192, 192, 1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
              ],
              borderColor: "black",
              borderWidth: 2
            }
          ]
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
 
  return (
    <div className="App">
     {chartData && <LineChart chartData={chartData} />}
    </div>
  )}