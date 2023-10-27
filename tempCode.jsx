import { useState, useEffect } from "react";
import { Paper, Group, Text, Button, Title, ThemeIcon } from "@mantine/core";
import classes from "./RoundStats.module.css";
import { IconArrowUpRight, IconArrowDownRight, IconTargetArrow } from "@tabler/icons-react";
import { set } from "react-hook-form";

export function RoundStats({ userScores }) {
  const [numWeeks, setNumWeeks] = useState(1);
  const [finished, setFinished] = useState(0)
  const [finishedDiff, setFinishedDiff] = useState(0)
  const [finishedDisplayDiff, setFinishedDisplayDiff] = useState(0)

  useEffect(() => {
    const now = new Date()
    const startOfCurrentPeriod = new Date(
      now - numWeeks * 7 * 24 * 60 * 60 * 1000
    );
    const startOfPreviousPeriod = new Date(
      now - 2 * numWeeks * 7 * 24 * 60 * 60 * 1000
    );

    let currentPeriodFinishedCount = 0;
    let previousPeriodFinishedCount = 0;

    userScores.forEach((score) => {
      const roundDate = new Date(score.createdAt)
      if (roundDate >= startOfCurrentPeriod && score.visible === true) {
        if (score.completed === true) {
          currentPeriodFinishedCount++
        }
      } else if (roundDate >= startOfPreviousPeriod && score.visible === true) {
        if (score.completed === true) {
          previousPeriodFinishedCount++
        }
      }
    })

    const finishedDiff = currentPeriodFinishedCount - previousPeriodFinishedCount
    setFinished(currentPeriodFinishedCount)
    setFinishedDiff(finishedDiff)
    setFinishedDisplayDiff(Math.abs(finishedDiff))
  }, [userScores, numWeeks])

  const FinishedDiffIcon = finishedDiff > 0 ? IconArrowUpRight : IconArrowDownRight;
  const Icon = IconTargetArrow

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
      <Group mt={24}>
        <Text className={classes.subtitle}>{finished}</Text>
        <ThemeIcon
          color="gray"
          variant="light"
          c={finishedDiff > 0 ? "teal" : "red"}
          size={32}
          radius="md"
        >
          <FinishedDiffIcon size="1.8rem" stroke={1.5} />
        </ThemeIcon>
      </Group>
      <Text fz="sm" c="dimmed" mt={7}>
        <Text component="span" c={finishedDiff > 0 ? "teal" : "red"} fw={700}>
          {finishedDisplayDiff}
        </Text>{" "}
        {finishedDiff > 0 ? "more" : "fewer"} than the previous
        {numWeeks === 1 ? " week" : numWeeks === 4.3 ? " month" : " quarter"}
      </Text>
      <Button mt={24} p={12}>View More</Button>
    </Paper>
  );
}
