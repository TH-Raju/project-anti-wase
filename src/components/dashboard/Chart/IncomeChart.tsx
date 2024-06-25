import React from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";

// import "./App.css";

import revenueData from "../../../db/data/revenueData.json";
import sourceData from "../../../db/data/sourceData.json";
import { Bar } from "react-chartjs-2";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
// defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";

export const Example = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="dataCard customerCard">
        <Bar
          data={{
            labels: sourceData.map((data) => data.label),
            datasets: [
              {
                label: "Count",
                data: sourceData.map((data) => data.value),
                backgroundColor: [
                  "rgba(43, 63, 229, 0.8)",
                  "rgba(250, 192, 19, 0.8)",
                  "rgba(253, 135, 135, 0.8)",
                ],
                borderRadius: 5,
              },
            ],
          }}
          options={{
            plugins: {
              title: {
                text: "Revenue Source",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
