import {
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconTargetArrow, IconTrophy, IconChartHistogram } from '@tabler/icons-react';
import classes from './Features.module.css';

const mockdata = [
  {
    title: 'Score your rounds, your way',
    description:
      'You can choose traditional arrow value scoring, or score with arrow positioning and receive instant feedback on group size and location to help get your sight dialed in perfectly.',
      icon: IconTargetArrow,
    },
  {
    title: 'Track your progress',
    description:
      'Not only can our system show your overall progression, you can also dive in to the finer details to find the factors that effect your scores the most and tackle them head on.',
    icon: IconChartHistogram,
  },
  {
    title: 'Compete against the community',
    description:
      'Shoot simulated competitions against your friends scores, other members of the Archers Toolkit community or make use of our league system to gain valuable competition practice.',
    icon: IconTrophy,
  },
];

export function Features() {
  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} mt="sm" className={classes.cardTitle} >
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="md" className={classes.wrapper}>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        What do we offer?
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        Archers Toolkit offers a host of tools for archers of all abilities. Whether you&apos;re a beginner simply looking to track your progress, or a competitive archer who wants an edge over your competition, we&apos;ve got something for you. <br />
        There&apos;s too much to list everything here, but here are a few of our core features.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}