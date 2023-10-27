import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Paper, Group, Button, Title, Alert } from "@mantine/core";
import classes from "./HandicapStats.module.css";
import { IconChartLine } from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export function HandicapStats({ userScores }) {
  const { getAccessTokenSilently } = useAuth0();
  const [chartData, setChartData] = useState({
    Compound: [],
    Barebow: [],
    Recurve: [],
    Traditional: [],
  });
  const [selectedBowType, setSelectedBowType] = useState("Compound");
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const getArcherProfiles = async () => {
      const token = await getAccessTokenSilently();
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_EXPRESS_URL}/archerprofile`,
        options
      );
      const responseData = await response.json();

      const transformedData = {
        Compound: [],
        Barebow: [],
        Recurve: [],
        Traditional: [],
      };

      responseData.data.forEach((profile) => {
        const bowType = profile.bowType;
        if (transformedData[bowType]) {
          profile.handicapHistory.forEach((history) => {
            const formattedDate = new Date(
              history.createdAt
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            });
            transformedData[bowType].push({
              Handicap: history.handicap,
              createdAt: formattedDate,
            });
          });
        }
      });

      setChartData(transformedData);
    };
    getArcherProfiles();
  }, [userScores]);

  const Icon = IconChartLine;

  const currentData = chartData[selectedBowType];

  const minHandicap = Math.min(...currentData.map((item) => item.Handicap));
  const maxHandicap = Math.max(...currentData.map((item) => item.Handicap));
  const yAxisDomain = [
    Math.floor(minHandicap / 20) * 20,
    Math.ceil(maxHandicap / 20) * 20,
  ];

  const handleBowTypeSelection = (bowType) => {
    if (chartData[bowType] && chartData[bowType].length > 0) {
      setSelectedBowType(bowType);
      setAlertMessage(null); // Clear any previous alerts
    } else {
      setAlertMessage(`No handicap data for selected bow type: ${bowType}`);
    }
  };

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
            <strong>Date:</strong> {payload[0].payload.createdAt}
          </p>
          <p>
            <strong>Handicap:</strong> {payload[0].payload.Handicap}
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
          Handicap
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
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
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
            dataKey="createdAt"
            tickFormatter={(tick) => {
              if (tick === currentData[0]?.createdAt) {
                return "Oldest";
              } else if (
                tick === currentData[currentData.length - 1]?.createdAt
              ) {
                return "Newest";
              }
              return "";
            }}
            tickLine={false}
            tickMargin={5}
            label={{
              value: "Handicap Progression",
              position: "insideBottom",
              offset: -10,
            }}
          />
          <YAxis domain={yAxisDomain} />
          <Line
            dataKey="Handicap"
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
          />
          <Tooltip content={<CustomTooltip />} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
}
