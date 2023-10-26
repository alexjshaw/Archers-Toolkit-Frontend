import { useState, useEffect } from "react";
import { Paper, Group, Text, Button, Title, ThemeIcon } from "@mantine/core";
import classes from "./ArrowStats.module.css";
import { IconArrowUpRight, IconArrowDownRight, IconArcheryArrow } from "@tabler/icons-react";

export function ArrowStats({ userScores }) {
  const [numWeeks, setNumWeeks] = useState(1);
  const [arrowCount, setArrowCount] = useState(0);
  const [arrowDiff, setArrowDiff] = useState(0);
  const [displayDiff, setDisplayDiff] = useState(0);

  useEffect(() => {
    const now = new Date();
    const startOfCurrentPeriod = new Date(
      now - numWeeks * 7 * 24 * 60 * 60 * 1000
    );
    const startOfPreviousPeriod = new Date(
      now - 2 * numWeeks * 7 * 24 * 60 * 60 * 1000
    );

    let currentPeriodCount = 0;
    let previousPeriodCount = 0;

    userScores.forEach((score) => {
      score.arrowValues.forEach((arrow) => {
        const arrowDate = new Date(arrow.updatedAt);
        if (arrow.arrowScore !== null) {
          if (arrowDate >= startOfCurrentPeriod) {
            currentPeriodCount++;
          } else if (arrowDate >= startOfPreviousPeriod) {
            previousPeriodCount++;
          }
        }
      });
    });

    setArrowCount(currentPeriodCount);
    const diff = currentPeriodCount - previousPeriodCount;
    setArrowDiff(diff);
    setDisplayDiff(Math.abs(diff));
  }, [userScores, numWeeks]);

  const DiffIcon = arrowDiff > 0 ? IconArrowUpRight : IconArrowDownRight;
  const Icon = IconArcheryArrow

  const testFunction = () => {
    console.log('userScores', userScores)
  }

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
      <Button.Group>
        <Button
          onClick={() => setNumWeeks(1)}
          p={6}
          variant={numWeeks === 1 ? "filled" : "outline"}
          color={numWeeks === 1 ? "blue" : "gray"}
        >
          Week
        </Button>
        <Button
          onClick={() => setNumWeeks(4.3)}
          p={6}
          variant={numWeeks === 4.3 ? "filled" : "outline"}
          color={numWeeks === 4.3 ? "blue" : "gray"}
        >
          Month
        </Button>
        <Button
          onClick={() => setNumWeeks(13)}
          p={6}
          variant={numWeeks === 13 ? "filled" : "outline"}
          color={numWeeks === 13 ? "blue" : "gray"}
        >
          Quarter
        </Button>
      </Button.Group>

      <Group align="flex-end" gap="xs" mt={24}>
        <Text className={classes.value}>{arrowCount}</Text>
        <ThemeIcon
          color="gray"
          variant="light"
          c={arrowDiff > 0 ? "teal" : "red"}
          size={32}
          radius="md"
        >
          <DiffIcon size="1.8rem" stroke={1.5} />
        </ThemeIcon>
      </Group>

      <Text fz="sm" c="dimmed" mt={7}>
        <Text component="span" c={arrowDiff > 0 ? "teal" : "red"} fw={700}>
          {displayDiff}
        </Text>{" "}
        {arrowDiff > 0 ? "more" : "fewer"} than the previous
        {numWeeks === 1 ? " week" : numWeeks === 4.3 ? " month" : " quarter"}
      </Text>
      <Button mt={24} p={12} onClick={testFunction}>View More</Button>
    </Paper>
  );
}
