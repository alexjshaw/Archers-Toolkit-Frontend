import { Title, Text, Container } from '@mantine/core';
import { Dots } from './Dots';
import classes from './Hero.module.css';
import { LoginButton } from '../utility/LoginButton';
import { SignupButton } from '../utility/SignupButton';

export function Hero() {
  return (
    <Container className={classes.wrapper} size={1400}>
      <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 120 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 60 }} />
      <Dots className={classes.dots} style={{ left: 60, top: 240 }} />
      <Dots className={classes.dots} style={{ left: 0, top: 300 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 0 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 120 }} />
      <Dots className={classes.dots} style={{ right: 60, top: 60 }} />
      <Dots className={classes.dots} style={{ right: 60, top: 240 }} />
      <Dots className={classes.dots} style={{ right: 0, top: 300 }} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Welcome to the{' '}
          <Text component="span" className={classes.highlight} inherit>
            Archers Toolkit
          </Text>
        </Title>

        <Container p={0} size={600}>
          <Text size="lg" c="dimmed" className={classes.description}>
            The easiest way to score your rounds, track your progress, challenge your friends and make every session count.
          </Text>
        </Container>

        <div className={classes.controls}>
          {/* <Button className={classes.control} size="lg" variant="default" color="gray">
            Sign In
          </Button>
          <Button className={classes.control} size="lg">
            Register
          </Button> */}
          <LoginButton className={classes.control} />
          <SignupButton className={classes.control} />
        </div>
      </div>
    </Container>
  );
}