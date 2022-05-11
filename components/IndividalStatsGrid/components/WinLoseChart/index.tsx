import { Box, Tooltip } from "@chakra-ui/react";
import React from "react";
import { PieChart } from "react-minimal-pie-chart";

type Props = {
  wins: number;
  losses: number;
};

export default function WinLoseChart({ wins, losses }: Props) {
  const [tooltip, setTooltip] = React.useState(`${wins} wins`);
  return (
    <Tooltip label={tooltip} placement="top">
      <Box>
        <PieChart
          data={[
            {
              title: "Wins",
              value: wins,
              color: "#00bcd4",
            },
            {
              title: "Losses",
              value: losses,
              color: "#f44336",
            },
          ]}
          radius={50}
          animate
          label={({ dataEntry }) =>
            dataEntry.percentage === 0
              ? ""
              : `${Math.round(dataEntry.percentage)}%`
          }
          labelStyle={{
            fontSize: "0.7rem",
            fontFamily: "sans-serif",
          }}
          onMouseOver={(e, index) => {
            setTooltip(index === 0 ? `${wins} wins` : `${losses} losses`);
          }}
        />
      </Box>
    </Tooltip>
  );
}
