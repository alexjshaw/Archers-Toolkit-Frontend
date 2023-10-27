import { useEffect, useState } from "react";
import { Group, Paper, SimpleGrid, Text, Container, Title, Button } from "@mantine/core";
import classes from "./DashboardStats.module.css";
import { ArrowStats } from "./ArrowStats";
import { RoundStats } from "./RoundStats";
import { HandicapStats } from "./HandicapStats";
import { RecentScores } from "./RecentScores";

export function DashboardStats({ userScores }) {
  return (
    <Container className={classes.root}>
      <Title className={classes.title}>Recent Stats</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} mb={24}>
        <ArrowStats userScores={userScores} />
        <RoundStats userScores={userScores} />
        <HandicapStats userScores={userScores} />
      </SimpleGrid>
      <Button className={classes.centerButton}>View More Stats</Button>
      <Title className={classes.title}>Recent Scores</Title>
      <RecentScores userScores={userScores} />
    </Container>
  );
}
