import { useEffect, useState } from "react";
import { Group, Paper, SimpleGrid, Text, Container, Title } from "@mantine/core";
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from "@tabler/icons-react";
import classes from "./DashboardStats.module.css";
import { ArrowStats } from "./ArrowStats";
import { RoundStats } from "./RoundStats";
import { HandicapStats } from "./HandicapStats";
import { RecentScores } from "./RecentScores";

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export function DashboardStats({ userScores }) {
  return (
    <Container className={classes.root}>
      <Title className={classes.title}>Recent Stats</Title>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }} mb={24}>
        <ArrowStats userScores={userScores} />
        <RoundStats userScores={userScores} />
        <HandicapStats userScores={userScores} />
        {/* <ArrowStats userScores={userScores} /> */}
        {/* <ScoreStats userScores={userScores} /> */}
      </SimpleGrid>
      <Title className={classes.title}>Recent Scores</Title>
      <RecentScores userScores={userScores} />
    </Container>
  );
}
