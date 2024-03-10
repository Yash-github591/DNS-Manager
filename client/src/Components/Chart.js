import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Chart({ value }) {
  var counts = {},
    data = [];

  if (value && value.length > 0) {
    for (var i = 0; i < value.length; i++) {
      var type = value[i].type;
      counts[type] = counts[type] ? counts[type] + 1 : 1;
    }
    var c = 0;
    for (var type in counts) {
      data.push({ id: c, value: counts[type], label: type });
      c++;
    }
  }

  return (
    <>
      {data.length > 0 && (
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
            },
          ]}
          height={280}
          margin={{ top: 20 }}
        />
      )}
    </>
  );
}
