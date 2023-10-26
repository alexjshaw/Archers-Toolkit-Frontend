import { useState, useEffect } from "react";
import { Paper, Group, Text, Button, Title, ThemeIcon, Alert } from "@mantine/core";
import classes from "./ArrowStats.module.css";
import { IconArrowUpRight, IconArrowDownRight, IconArcheryArrow } from "@tabler/icons-react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function ArrowStats({ userScores }) {
  const [numWeeks, setNumWeeks] = useState(1);
  const [arrowCount, setArrowCount] = useState(0);
  const [arrowDiff, setArrowDiff] = useState(0);
  const [displayDiff, setDisplayDiff] = useState(0);

  const [chartData, setChartData] = useState({
    Compound: [],
    Barebow: [],
    Recurve: [],
    Traditional: [],
  })
  const [selectedBowType, setSelectedBowType] = useState();
  const [alertMessage, setAlertMessage] = useState(null);

  useEffect(() => {
    const formatDate = (date) => {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear().toString().substr(-2);
      return `${day}/${month}/${year}`;
    };
  
    const getWeeksData = (bowType) => {
      const filteredScores = userScores.filter(score => score.bowType === bowType);
      const weeksData = [];
  
      for (let i = 1; i <= 8; i++) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() - (7 * (i - 1)));
        endDate.setHours(23, 59, 59, 999);
        
        const startDate = new Date(endDate);
        startDate.setDate(startDate.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
  
        const arrowsCount = filteredScores.reduce((count, score) => {
          const validArrows = score.arrowValues.filter(arrow => 
            arrow.arrowScore !== null && 
            new Date(arrow.createdAt) >= startDate && 
            new Date(arrow.createdAt) <= endDate
          );
          return count + validArrows.length;
        }, 0);
  
        weeksData.unshift({
          startDate: formatDate(startDate),
          endDate: formatDate(endDate),
          week: i,
          arrows: arrowsCount
        });
      }
  
      return weeksData;
    };

    const newChartData = {
      Compound: getWeeksData('Compound'),
      Barebow: getWeeksData('Barebow'),
      Recurve: getWeeksData('Recurve'),
      Traditional: getWeeksData('Traditional'),
    };

    const totals = {
      Compound: newChartData.Compound.reduce((sum, week) => sum + week.arrows, 0),
      Barebow: newChartData.Barebow.reduce((sum, week) => sum + week.arrows, 0),
      Recurve: newChartData.Recurve.reduce((sum, week) => sum + week.arrows, 0),
      Traditional: newChartData.Traditional.reduce((sum, week) => sum + week.arrows, 0),
    };

    const maxBowType = Object.keys(totals).reduce((a, b) => (totals[a] > totals[b] ? a : b));

    setChartData(newChartData);
    setSelectedBowType(maxBowType);
  }, [userScores]);

  const DiffIcon = arrowDiff > 0 ? IconArrowUpRight : IconArrowDownRight;
  const Icon = IconArcheryArrow

  const handleBowTypeSelection = (bowType) => {
    if (chartData[bowType].some(weekData => weekData.arrows > 0)) {
      setSelectedBowType(bowType);
      setAlertMessage(null);
    } else {
      setAlertMessage(`No arrows data for selected bow type: ${bowType}`);
    }
  };

  const currentData = chartData[selectedBowType];
  const maxYValue = currentData ? Math.max(...currentData.map(item => item.arrows)) : 0;
  const yAxisMax = Math.ceil(maxYValue / 20) * 20;
  const interval = yAxisMax / 4;
  const yAxisTicks = [0, interval, interval * 2, interval * 3, yAxisMax];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: 'white', padding: '10px', border: '1px solid #ccc' }}>
          <p><strong>From:</strong> {payload[0].payload.startDate}</p>
          <p><strong>To:</strong> {payload[0].payload.endDate}</p>
          <p><strong>Arrows:</strong> {payload[0].payload.arrows}</p>
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
          Arrows
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
      {currentData && ( // Only render the chart if currentData is defined
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
              return "Oldest"
            } else if (tick === currentData[currentData.length - 1]?.week) {
              return "Newest"
            }
            return ""
          }}
          tickMargin={5}
          label={{ value: 'Arrows Per Week', position: 'insideBottom', offset: -10 }}
          />
          <YAxis domain={[0, yAxisMax]} ticks={yAxisTicks} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="arrows" fill="#3182bd" />
        </BarChart>
      </ResponsiveContainer>
)}
      <Button mt={24} p={12}>View More</Button>
    </Paper>
  );
}
