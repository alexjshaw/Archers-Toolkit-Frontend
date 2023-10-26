import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Paper,
  Group,
  Button,
  Title,
  Alert,
  Text,
  ThemeIcon,
} from "@mantine/core";
import classes from "./HandicapStats.module.css";
import {
  IconChartLine,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
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
  const mostRecentHandicap =
    currentData.length > 0
      ? currentData[currentData.length - 1].Handicap
      : null;
  const oldestHandicap =
    currentData.length > 0 ? currentData[0].Handicap : null;
  const oldestDate = currentData.length > 0 ? currentData[0].createdAt : null;
  const difference =
    mostRecentHandicap !== null && oldestHandicap !== null
      ? mostRecentHandicap - oldestHandicap
      : null;

  const DiffIcon = difference > 0 ? IconArrowUpRight : IconArrowDownRight;

  const minHandicap = Math.min(...currentData.map((item) => item.Handicap));
  const maxHandicap = Math.max(...currentData.map((item) => item.Handicap));
  const yAxisDomain = [
    Math.floor(minHandicap / 10) * 10,
    Math.ceil(maxHandicap / 10) * 10,
  ];
  const yAxisTicks = [];
  for (let i = yAxisDomain[0]; i <= yAxisDomain[1]; i += 10) {
    yAxisTicks.push(i);
  }

  const handleBowTypeSelection = (bowType) => {
    console.log(chartData);
    if (chartData[bowType] && chartData[bowType].length > 0) {
      setSelectedBowType(bowType);
      setAlertMessage(null); // Clear any previous alerts
    } else {
      setAlertMessage(`No handicap data for selected bow type: ${bowType}`);
    }
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
            label={{ value: 'Handicap Progression', position: 'insideBottom', offset: -10 }}
          />
          <YAxis domain={yAxisDomain} ticks={yAxisTicks} />
          <Line
            dataKey="Handicap"
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
          />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
      <Group align="flex-end" gap="xs" mt={24}>
        <Text className={classes.value}>{mostRecentHandicap}</Text>
        <ThemeIcon
          color="gray"
          variant="light"
          c={difference < 0 ? "teal" : "red"}
          size={32}
          radius="md"
        >
          <DiffIcon size="1.8rem" stroke={1.5} />
        </ThemeIcon>
      </Group>
      <Text fz="sm" c="dimmed" mt={7}>
        {difference !== null && oldestDate && `An improvement of `}
        <Text component="span" c={difference < 0 ? "teal" : "red"} fw={700}>
          {`${Math.abs(difference)} `}
        </Text>
        {`since ${oldestDate}`}
      </Text>
    </Paper>
  );
}
