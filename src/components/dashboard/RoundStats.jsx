import { useState, useEffect } from "react";
import { Paper, Group, Button, Title, Alert } from "@mantine/core";
import classes from "./RoundStats.module.css";
import { IconTargetArrow } from "@tabler/icons-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function RoundStats({ userScores }) {
  const [chartData, setChartData] = useState({
    Compound: [],
    Barebow: [],
    Recurve: [],
    Traditional: [],
  });
  const [selectedBowType, setSelectedBowType] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString().substr(-2);
      return `${day}/${month}/${year}`;
    };

    const getWeeksData = (bowType) => {
      const filteredScores = userScores.filter(
        (score) => score.bowType === bowType
      );
      const weeksData = [];

      for (let i = 1; i <= 8; i++) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - 7 * (i - 1));
        endDate.setHours(23, 59, 59, 999);

        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);

        const completedRoundsCount = filteredScores.reduce((count, score) => {
          if (
            score.completed &&
            new Date(score.updatedAt) >= startDate &&
            new Date(score.updatedAt) <= endDate
          ) {
            return count + 1;
          }
          return count;
        }, 0);

        weeksData.unshift({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          week: i,
          completedRounds: completedRoundsCount,
        });
      }

      return weeksData;
    };

    const newChartData = {
      Compound: getWeeksData("Compound"),
      Barebow: getWeeksData("Barebow"),
      Recurve: getWeeksData("Recurve"),
      Traditional: getWeeksData("Traditional"),
    };

    const totals = {
      Compound: newChartData.Compound.reduce(
        (sum, week) => sum + week.completedRounds,
        0
      ),
      Barebow: newChartData.Barebow.reduce(
        (sum, week) => sum + week.completedRounds,
        0
      ),
      Recurve: newChartData.Recurve.reduce(
        (sum, week) => sum + week.completedRounds,
        0
      ),
      Traditional: newChartData.Traditional.reduce(
        (sum, week) => sum + week.completedRounds,
        0
      ),
    };

    const maxBowType = Object.keys(totals).reduce((a, b) =>
      totals[a] > totals[b] ? a : b
    );

    setChartData(newChartData);
    setSelectedBowType(maxBowType);
  }, [userScores]);

  const Icon = IconTargetArrow;

  const handleBowTypeSelection = (bowType) => {
    if (chartData[bowType].some((weekData) => weekData.completedRounds > 0)) {
      setSelectedBowType(bowType);
      setAlertMessage(null);
    } else {
      setAlertMessage(`No round data for selected bow type: ${bowType}`);
    }
  };

  const currentData = chartData[selectedBowType];
  const maxYValue = currentData
    ? Math.max(...currentData.map((item) => item.completedRounds))
    : 0;
  const yAxisMax = Math.ceil(maxYValue / 4) * 4;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: "white",
            padding: "10px",
            border: "1px solid #ccc",
          }}
        >
          <p>
            <strong>From:</strong> {payload[0].payload.startDate}
          </p>
          <p>
            <strong>To:</strong> {payload[0].payload.endDate}
          </p>
          <p>
            <strong>Rounds:</strong> {payload[0].payload.completedRounds}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Paper
      withBorder
      p="lg"
      radius="md"
      shadow="md"
      className={classes.wrapper}
    >
      <Group mb={12} justify="space-between">
        <Title size="h3" c="dimmed" className={classes.title}>
          Rounds
        </Title>
        <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
      </Group>
      <Button.Group mb={24}>
        <Button
          onClick={() => handleBowTypeSelection("Compound")}
          p={6}
          variant={selectedBowType === "Compound" ? "filled" : "outline"}
          color={selectedBowType === "Compound" ? "blue" : "gray"}
        >
          Compound
        </Button>
        <Button
          onClick={() => handleBowTypeSelection("Recurve")}
          p={6}
          variant={selectedBowType === "Barebow" ? "filled" : "outline"}
          color={selectedBowType === "Barebow" ? "blue" : "gray"}
        >
          Recurve
        </Button>
        <Button
          onClick={() => handleBowTypeSelection("Barebow")}
          p={6}
          variant={selectedBowType === "Recurve" ? "filled" : "outline"}
          color={selectedBowType === "Recurve" ? "blue" : "gray"}
        >
          Barebow
        </Button>
        <Button
          onClick={() => handleBowTypeSelection("Traditional")}
          p={6}
          variant={selectedBowType === "Traditional" ? "filled" : "outline"}
          color={selectedBowType === "Traditional" ? "blue" : "gray"}
        >
          Trad
        </Button>
      </Button.Group>
      {alertMessage && (
        <Alert
          title={alertMessage}
          variant="light"
          color="blue"
          withCloseButton
          onClose={() => setAlertMessage(null)}
          style={{ marginTop: "16px" }}
        />
      )}
      {currentData && (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart
            data={currentData}
            margin={{
              top: 5,
              right: 5,
              left: -25,
              bottom: 15,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="week"
              tickFormatter={(tick) => {
                if (tick === currentData[0]?.week) {
                  return "Oldest";
                } else if (tick === currentData[currentData.length - 1]?.week) {
                  return "Newest";
                }
                return "";
              }}
              tickMargin={5}
              label={{
                value: "Rounds Per Week",
                position: "insideBottom",
                offset: -10,
              }}
            />
            <YAxis domain={[0, yAxisMax]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="completedRounds" fill="#3182bd" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}
